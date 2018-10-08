import express from 'express'
import { createServer } from 'http'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import session from './session'
import config from './config'
import path from 'path'

const app = express()
const server = createServer(app)

// app locals
app.set('port', process.env.PORT || 3001)

// init middleware
app.use(morgan('tiny'))
    .use(express.json())
    .use(bodyParser.urlencoded())
    .use(session)

// serve static files (i.e. react app) only in a production environment
if (app.get('env') === 'production') {
    app.use(express.static(path.join(__dirname, 'client', 'build')))
}

export { server }
export default app
