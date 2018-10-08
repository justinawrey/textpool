import session from 'express-session'
import config from './config'

// expose a singleton session object
export default session({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
})
