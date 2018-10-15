// external libs
import '@babel/polyfill'
import uuidv4 from 'uuid/v4'
import twilio from 'twilio'

// local libs
import app, { server } from './initapp'
import io from './socket'
import spotify from './spotify'
import store from './store'
import config from './config'

// next three auth endpoints do not require a valid room before being hit
app.get('/api/login', (req, res) => {
    const scopes = ['user-modify-playback-state', 'user-read-playback-state']
    res.redirect(spotify.createAuthorizeURL(scopes))
})

// callback for spotify web api
app.get('/spotify-callback', async (req, res, next) => {
    let data
    const { code } = req.query
    try {
        data = await spotify.authorizationCodeGrant(code)
    } catch (e) {
        return next(e)
    }

    spotify.setAccessToken(data.body['access_token'])
    spotify.setRefreshToken(data.body['refresh_token'])

    // Set this room code to be the first 4 letters of a uuidv4.
    // TODO: collision could happen: keep generating until unique one is found.
    // We could simply use a full uuid, but that would require the user to enter
    // a huge room code.
    const room = uuidv4().slice(0, 4)
    req.session.room = room
    store[room] = {
        songs: [],
        meta: {},
        active: 0,
        playing: false,
        pollTimer: null,
    }

    const env = app.get('env')
    if (env === 'development') {
        res.redirect(config.ORIGIN)
    } else if (env === 'production') {
        res.redirect('/')
    }
})

// twilio webhook
app.post('/sms', async (req, res, next) => {
    const { Body, From } = req.body
    let [room, ...search] = Body.split(/\s+/)
    search = search.join(' ')

    // If the room requested is not an active session,
    // let the user know by texting them back.
    if (!(room in store)) {
        twiml.message(
            `\nInvalid room code.\nEither the requested room was closed or never existed.\nText <room> <song> <artist> to (778)-860-7371 to try again.`,
        )
        res.end(twiml.toString())
        return
    }

    // set up twilio xml response
    const twiml = new twilio.twiml.MessagingResponse()
    res.writeHead(200, { 'Content-Type': 'text/xml' })

    // Ask spotify API to find the best match
    // for the incoming query
    let tracks
    try {
        tracks = await spotify.searchTracks(search)
    } catch (e) {
        return next(e)
    }

    const bestMatch = tracks.body.tracks.items[0]
    if (!bestMatch) {
        // No song match was found.
        // Send an sms indicating that the requested song
        // was not found.
        twiml.message(
            `\nNo song matching the query "${search}" found.\nPlease try again!`,
        )
        res.end(twiml.toString())
        return
    }

    // A match was found.  Send the response.
    const { name, uri } = bestMatch,
        artist = bestMatch.artists[0].name,
        album = bestMatch.album.name,
        artUrl = bestMatch.album.images[1].url,
        length = bestMatch.duration_ms

    const id = uuidv4()
    const songMeta = {
        id,
        song: name,
        artist,
        album,
        uri,
        length,
        artUrl,
        from: From,
    }

    // emit through websocket
    io.emit(room, songMeta)

    // save to development store
    store[room].songs.push(id)
    store[room].meta[id] = songMeta

    // send a response
    twiml.message(`\nRequest received!\nSong: ${name}\nArtist: ${artist}`)
    res.end(twiml.toString())
})

// all the rest of the api endpoints required a room to be hit
app.use((req, res, next) => {
    const { room } = req.session
    if (!room) {
        res.sendStatus(401)
    } else {
        return next()
    }
})

app.get('/api/room', (req, res) => {
    const { room } = req.session
    res.status(200).json({ room })
})

app.get('/api/songs', (req, res) => {
    const { room } = req.session
    const songs = store[room].songs
    res.status(200).json({ songs })
})

app.get('/api/meta', (req, res) => {
    const { room } = req.session
    const meta = store[room].meta
    res.status(200).json({ meta })
})

app.get('/api/active', (req, res) => {
    const { room } = req.session
    const { active, playing } = store[room]
    res.status(200).json({ active, playing })
})

app.get('/api/remove/:id', async (req, res, next) => {
    const { room } = req.session
    const { id } = req.params
    const { active } = store[room]

    if (id === active) {
        // if we removed the actively playing song,
        // pause it first
        try {
            await spotify.pause()
        } catch (e) {
            return next(e)
        }
        store[room].active = 0
        store[room].playing = false
    }

    // remove id from store, both songs and meta
    const { songs, meta } = store[room]
    store[room].songs = songs.filter(songId => songId !== id)
    delete meta[id]
    res.sendStatus(204)
})

app.get('/api/play/:id/:uri', async (req, res, next) => {
    const { room } = req.session
    const { id, uri } = req.params

    try {
        await spotify.play({
            uris: [uri],
        })
    } catch (e) {
        return next(e)
    }

    store[room].active = id
    store[room].playing = true
    startPolling(room)
    res.sendStatus(204)
})

app.get('/api/play', async (req, res, next) => {
    const { room } = req.session

    try {
        await spotify.play()
    } catch (e) {
        return next(e)
    }

    store[room].playing = true
    startPolling(room)
    res.sendStatus(204)
})

app.get('/api/pause', async (req, res, next) => {
    const { room } = req.session

    try {
        await spotify.pause()
    } catch (e) {
        return next(e)
    }

    store[room].playing = false
    stopPolling(room)
    res.sendStatus(204)
})

// in production, re-route requests to / to serving index.html
if (app.get('env') === 'production') {
    app.get('/', (req, res) => {
        res.sendFile(app.get('indexPath'))
    })
    app.get('*', (req, res) => {
        res.redirect('/')
    })
}

// listen on config.PORT - defaults to 3001
server.listen(app.get('port'), () =>
    console.log(`Serving on port ${app.get('port')}`),
)

// TODO: polling for next song is a temporary bad solution...
// replace this with something else after proof of concept
// we might get rate limited doing it this way.
const startPolling = room => {
    // clear first so we dont leak a bunch of timers
    clearInterval(store[room].pollTimer)

    // set up a 5 second poll loop
    store[room].pollTimer = setInterval(async () => {
        let playing
        try {
            playing = await spotify.getMyCurrentPlayingTrack()
        } catch (e) {
            return e
            //TODO: handle more gracefully
        }

        if (store[room].playing && !playing.body.is_playing) {
            // Get the uri of the next song to play
            const { active, songs, meta } = store[room]
            const idx = songs.indexOf(active)
            const nextSong =
                idx === songs.length - 1 ? songs[0] : songs[idx + 1]
            const { uri } = meta[nextSong]

            // If we stopped playing, play the next track
            try {
                await spotify.play({
                    uris: [uri],
                })
            } catch (e) {
                return e
                // TODO: handle more gracefully
            }
            store[room].active = nextSong

            // push next song notification back to client so
            // it can be updated
            io.emit(`${room}-setactive`, nextSong)
        }
    }, 5000)
}

const stopPolling = room => {
    clearInterval(store[room].pollTimer)
}
