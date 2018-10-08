import dotenv from 'dotenv'

const { parsed, error } = dotenv.config()
if (error) {
    throw error
}

export default parsed
