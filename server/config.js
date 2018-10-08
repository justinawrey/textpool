import dotenv from 'dotenv'

const { parsed, error } = dotenv.config()
if (error) {
    throw 'Could not parse .env file'
}

export default parsed
