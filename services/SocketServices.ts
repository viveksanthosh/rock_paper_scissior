import * as socketIo from 'socket.io';
import connectedUsers from './ConnectedUsers';
export default server => {
    const io = socketIo(server);

    io.on("connection", connection => {
        let myContext = 0;
        connectedUsers.addUser(connection);
        console.log(connectedUsers.totalUsers);

        connection.on('findOpponent', () => {
            connectedUsers.findOpponent(connection.client.id);
            console.log(connectedUsers.totalUsers);
        });

        connection.on('disconnect', () => {
            connectedUsers.removeUserById(connection.client.id);
            console.log(connectedUsers.totalUsers);
        });
    });


}