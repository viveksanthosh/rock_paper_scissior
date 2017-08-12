import * as socketIo from 'socket.io';

export default server => {
    const io = socketIo(server);

    io.on("connection", connection => {
        let myContext = 0;
        console.log('connected to ' + connection.client.id)
        console.log('my context is ' + myContext++);
        connection.emit('hello', 'welsome')
    });


}