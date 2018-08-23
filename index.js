import express from 'express'
import morgan from 'morgan'
import session from 'express-session'
import dotenv from 'dotenv'
import path from 'path'
import uuidv4 from 'uuid/v4'
import spotify from 'spotify-web-api-node'
import { createServer } from 'http'
import socket from 'socket.io'

// config from env
dotenv.config()

// app locals
const app = express()
const server = createServer(app)
const io = socket(server)

app.set('port', process.env.PORT || 3001)
app.set('sessSecret', process.env.SESSION_SECRET)

// spotify object
const spotifyClient = new spotify({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI,
})

const userSession = session({
    secret: app.get('sessSecret'),
    resave: false,
    saveUninitialized: true,
})

// init middleware
app.use(morgan('tiny'))
    .use(express.json())
    .use(userSession)

// serve static files (i.e. react app) only in a production environment
if (app.get('env') === 'production') {
    app.use(express.static(path.join(__dirname, 'client', 'build')))
}

// save session in socket.handshake -> sort of a hack, but works
io.use((socket, next) => {
    userSession(socket.handshake, {}, next)
})

io.on('connection', socket => {
    console.log(`user has connected: ${socket.handshake.session.id}`)
    socket.on('disconnect', () =>
        console.log(`user has disconnected: ${socket.handshake.session.id}`),
    )
})

// next two auth endpoints do not require a valid room before being hit
app.get('/api/login', (req, res) => {
    const scopes = ['user-modify-playback-state']
    res.redirect(spotifyClient.createAuthorizeURL(scopes))
})

// callback for spotify web api
app.get('/spotify-callback', async (req, res, next) => {
    let data
    const { code } = req.query
    try {
        data = await spotifyClient.authorizationCodeGrant(code)
    } catch (e) {
        return next(e)
    }

    spotifyClient.setAccessToken(data.body['access_token'])
    spotifyClient.setRefreshToken(data.body['refresh_token'])
    req.session.room = uuidv4()
    res.redirect(`http://localhost:3000/room/${req.session.room}`)
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

app.get('/api/song/:title', async (req, res, next) => {
    let tracks
    const { title } = req.params
    try {
        tracks = await spotifyClient.searchTracks(title)
    } catch (e) {
        return next(e)
    }

    const bestMatch = tracks.body.tracks.items[0],
        { name, uri } = bestMatch,
        artist = bestMatch.artists[0].name,
        album = bestMatch.album.name

    res.status(200).json({ name, artist, album, uri })
})

app.get('/api/play/:uri', async (req, res, next) => {
    const { uri } = req.params
    try {
        await spotifyClient.play({
            context_uri: uri,
        })
    } catch (e) {
        return next(e)
    }

    res.sendStatus(200)
})

app.get('/api/play', async (req, res, next) => {
    try {
        await spotifyClient.play()
    } catch (e) {
        return next(e)
    }

    res.sendStatus(200)
})

app.get('/api/pause', async (req, res, next) => {
    try {
        await spotifyClient.pause()
    } catch (e) {
        return next(e)
    }

    res.sendStatus(200)
})

// listen on process.env.PORT - defaults to 3001
server.listen(app.get('port'), () =>
    console.log(`Serving on port ${app.get('port')}`),
)
