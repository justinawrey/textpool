let config
if (process.env.NODE_ENV === 'production') {
    config = process.env
} else {
    import dotenv from 'dotenv'
    const { parsed, error } = dotenv.config()
    if (error) {
        throw 'Could not parse .env file'
    }
    config = parsed
}

export default config
