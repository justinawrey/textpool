import session from 'express-session'

// expose a singleton session object
export default session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
})
