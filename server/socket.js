import socket from 'socket.io'
import session from './session'
import { server } from './initapp'

const io = socket(server)

// save session in socket.handshake -> sort of a hack, but works
io.use((socket, next) => {
    session(socket.handshake, {}, next)
})

// alert on user connection/disconnection
io.on('connection', socket => {
    console.log(`user has connected: ${socket.handshake.session.id}`)
    socket.on('disconnect', () =>
        console.log(`user has disconnected: ${socket.handshake.session.id}`),
    )
})

export default io
