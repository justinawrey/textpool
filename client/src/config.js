const config = {}
if (process.env.NODE_ENV === 'development') {
    config.serverOrigin = 'http://localhost:3001'
    config.clientOrigin = 'http://localhost:3000'
} else if (process.env.NODE_ENV === 'production') {
    config.serverOrigin = 'http://www.spotipool.com'
    config.clientOrigin = 'http://www.spotipool.com'
}

export default config
