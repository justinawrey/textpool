import express from 'express'
import morgan from 'morgan'

const app = express()
const logger = morgan('tiny')

app.use(logger)

app.listen(3001, () => console.log('Serving on localhost:3001...'))
