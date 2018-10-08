import spotify from 'spotify-web-api-node'
import config from './config'

// spotify object
export default new spotify({
    clientId: config.SPOTIFY_CLIENT_ID,
    clientSecret: config.SPOTIFY_CLIENT_SECRET,
    redirectUri: config.REDIRECT_URI,
})
