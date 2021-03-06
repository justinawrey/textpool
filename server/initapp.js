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
app.set('indexPath')

// init middleware
app.use(morgan('tiny'))
    .use(express.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(session)

// serve static files (i.e. react app) only in a production environment
if (app.get('env') === 'production') {
    // heroku will build static client files into /app/client/build
    // serve static files in production
    const servePath = path.join(__dirname, '..', 'client', 'build')
    const indexPath = path.join(servePath, 'index.html')
    app.set('indexPath', indexPath)

    app.use(express.static(servePath))
    console.log(`Serving static files at ${servePath}`)
}

export default app
export { server }
