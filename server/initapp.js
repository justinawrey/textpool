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
app.set('port', config.PORT || 3001)

// init middleware
app.use(morgan('tiny'))
    .use(express.json())
    .use(bodyParser.urlencoded())
    .use(session)

// serve static files (i.e. react app) only in a production environment
if (app.get('env') === 'production') {
    // heroku will build static client files into /app/client/build
    const servePath = path.join(__dirname, '..', 'client', 'build')
    app.use(express.static(servePath))
    console.log(`Serving static files at ${servePath}`)
}

export default app
export { server }
