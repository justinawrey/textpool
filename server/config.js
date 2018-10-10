import dotenv from 'dotenv'

let config
if (process.env.NODE_ENV === 'production') {
    // In production (curr on heroku) read directly from process.env
    // defined through heroku config vars
    console.log('Got config from heroku config vars')
    config = process.env
} else if (process.env.NODE_ENV === 'development') {
    // In development, read from .env file
    const { parsed, error } = dotenv.config()
    if (error) {
        throw 'Could not parse .env file'
    }
    console.log('Parsed config from .env file')
    config = parsed
}

export default config
