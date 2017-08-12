import ConnectedUser from '../domains/ConnectedUser';
class ConnectedUsers {
    private users: Array<ConnectedUser> = [];

    addUser(userSocket: SocketIO.Socket) {
        let user: ConnectedUser = {
            id: userSocket.client.id,
            socket: userSocket
        };
        this.users.push(user);
        this.emitActiveUsers();
    }

    private emitActiveUsers() {
        this.users.forEach(user => user.socket.emit('activeUsers', this.users.length))
    }

    userById(id: string): ConnectedUser | undefined {
        return this.users.find(user => user.id === id)
    }

    removeUserById(id: string) {
        this.users = this.users.filter(user => user.id !== id);
        this.emitActiveUsers();
    }

    get totalUsers(): number {
        return this.users.length
    }
}

let connectedUsers = new ConnectedUsers();

export default connectedUsers;