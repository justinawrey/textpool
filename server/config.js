import dotenv from 'dotenv'

let config
if (process.env.NODE_ENV === 'heroku') {
    config = process.env
} else {
    const { parsed, error } = dotenv.config()
    if (error) {
        throw 'Could not parse .env file'
    }
    config = parsed
}

export default config
