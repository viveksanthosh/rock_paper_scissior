import socket from 'socket.io-client'

const io = socket('http://localhost:4200/')
io.on("result", result => console.log(result))
export default {
    connect: confirmConnect => {
        io.on('connect', () => {
            confirmConnect();
        });
    },
     onResult: onResult => {
        io.on("result", result =>  {
            onResult(result);
        });
    },
    lookForOpponent: () => {
        io.emit("findOpponent");
    },
    opponentFound: opponentFound => {
        io.on("userFound", color => {
            opponentFound(color);
        })
    },
    userCount: setActiveUSers => {
        io.on('activeUsers', userCount => {
            setActiveUSers(userCount);
        });
    },
    makeMove: move => {
        io.emit('move', move);
    },
    disconnect: connectionLost => {
        io.on('disconnect', () => {
            connectionLost();
        });
    }
}