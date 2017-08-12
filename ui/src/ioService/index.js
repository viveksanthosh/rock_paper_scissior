import socket from 'socket.io-client'

const io = socket('http://localhost:4200/')

export default {
    connect: confirmConnect => {
        io.on('connect', () => {
            confirmConnect();
        });
    },
    lookForOpponent: () => {
        io.emit("findOpponent");
    },
    opponentFound: opponentFound => {
        io.on("opponentFound", ()=>{
            opponentFound();
        })
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