import express from 'express'
import { createServer } from 'http'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import session from './session'
import config from './config'

const app = express()
const server = createServer(app)

// app locals
app.set('port', config.PORT || 3001)

// init middleware
app.use(morgan('tiny'))
    .use(express.json())
    .use(bodyParser.urlencoded())
    .use(session)

// listen on config.PORT - defaults to 3001
server.listen(app.get('port'), () =>
    console.log(`Serving on port ${app.get('port')}`),
)

export default app
