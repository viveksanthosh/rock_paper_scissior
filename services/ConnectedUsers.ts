import ConnectedUser from '../domains/ConnectedUser';
class ConnectedUsers {
    private users: ConnectedUser[];
    constructor() {
        this.users = [];
    }

    addUser(userSocket: SocketIO.Socket) {
        let user: ConnectedUser = {
            id: userSocket.client.id,
            socket: userSocket
        };
        this.users.push(user);
    }

    userById(id: string): ConnectedUser {
        return this.users.find(user => user.id === id)
    }

    removeUserByIf(id: string) {
        this.users = this.users.filter(user => user.id !== id);
    }

    get totalUsers(): number {
        return this.users.length
    }
}

let connectedUsers = new ConnectedUsers();

export default connectedUsers;