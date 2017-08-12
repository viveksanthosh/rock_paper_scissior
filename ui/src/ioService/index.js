import socket from 'socket.io-client'

const io = socket('http://localhost:4200/')

export default {
    connect: confirmConnect => {
        io.on('connect', () => {
            confirmConnect();
        });
    },
    disconnect: connectionLost => {
        io.on('disconnect', () => {
            connectionLost();
        });
    }
}