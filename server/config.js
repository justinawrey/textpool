import dotenv from 'dotenv'

const { parsed, error } = dotenv.config()
if (error) {
    throw 'Error reading configuration from .env'
}

export default parsed
