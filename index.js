import express from 'express'
import morgan from 'morgan'
import session from 'express-session'
import path from 'path'

const app = express()
const logger = morgan('tiny')
const sess = session({
    secret: 'keyboard kitty',
    resave: false,
    saveUninitialized: false,
})

// config from env
app.set('port', process.env.PORT || 3001)
app.set('redirectUri', process.env.REDIRECT_URI || 'http://localhost:3000/')
app.set('clientId', process.env.CLIENT_ID)

console.log(app.get('clientId'))

// init middleware
app.use(logger)
app.use(express.json())
app.use(sess)

// api
app.get('/api/login', function(req, res) {
    res.redirect(
        `https://accounts.spotify.com/authorize?response_type=code&client_id=${app.get(
            'clientId',
        )}&redirect_uri=${encodeURIComponent(app.get('redirectURI'))}`,
    )
})

// serve static files (i.e. react app) only in a production environment
if (app.get('env') === 'production') {
    app.use(express.static(path.join(__dirname, 'client', 'build')))
}

// listen on process.env.PORT - defaults to 3001
app.listen(app.get('port'), () =>
    console.log(`Serving on port ${app.get('port')}`),
)
