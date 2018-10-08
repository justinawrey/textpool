// external libs
import uuidv4 from 'uuid/v4'
import twilio from 'twilio'

// local libs
import app, { server } from './initapp'
import io from './socket'
import spotify from './spotify'
import store from './store'

// next three auth endpoints do not require a valid room before being hit
app.get('/api/login', (req, res) => {
    const scopes = ['user-modify-playback-state']
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
    req.session.room = 'testroom'
    store['testroom'] = { songs: [], meta: {} }

    // TODO: rm hardcode
    res.redirect(`http://localhost:3000/room/${req.session.room}`)
})

// twilio webhook
app.post('/sms', async (req, res, next) => {
    const { Body, From } = req.body
    let [room, ...search] = Body.split(/\s+/)
    search = search.join(' ')

    let tracks
    try {
        tracks = await spotify.searchTracks(search)
    } catch (e) {
        return next(e)
    }

    const bestMatch = tracks.body.tracks.items[0],
        { name, uri } = bestMatch,
        artist = bestMatch.artists[0].name,
        album = bestMatch.album.name,
        artUrl = bestMatch.album.images[1].url

    const id = uuidv4()
    const songMeta = { id, song: name, artist, album, uri, artUrl, from: From }

    // emit through websocket
    io.emit(room, songMeta)

    // save to development store
    store[room].songs.push(id)
    store[room].meta[id] = songMeta

    // send a response
    const twiml = new twilio.twiml.MessagingResponse()
    twiml.message(`\nRequest received!\nSong: ${name}\nArtist: ${artist}`)
    res.writeHead(200, { 'Content-Type': 'text/xml' })
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

app.get('/api/play/:uri', async (req, res, next) => {
    const { uri } = req.params
    try {
        await spotify.play({
            context_uri: uri,
        })
    } catch (e) {
        return next(e)
    }

    res.sendStatus(200)
})

app.get('/api/play', async (req, res, next) => {
    try {
        await spotify.play()
    } catch (e) {
        return next(e)
    }

    res.sendStatus(200)
})

app.get('/api/pause', async (req, res, next) => {
    try {
        await spotify.pause()
    } catch (e) {
        return next(e)
    }

    res.sendStatus(200)
})

// listen on config.PORT - defaults to 3001
server.listen(app.get('port'), () =>
    console.log(`Serving on port ${app.get('port')}`),
)
