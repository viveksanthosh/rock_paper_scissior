import socket from 'socket.io-client'

const io = socket('http://localhost:4200/')

export default {
    connect: confirmConnect => {
        io.on('connect', () => {
            confirmConnect();
        });
    },
    userCount: setActiveUSers => {
        io.on('activeUsers', userCount => {
            setActiveUSers(userCount);
        });
    },
    disconnect: connectionLost => {
        io.on('disconnect', () => {
            connectionLost();
        });
    }
}