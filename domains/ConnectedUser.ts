
export default class {
    id: string;
    socket: SocketIO.Socket;

    constructor(socket: SocketIO.Socket){
        this.id = socket.client.id;
        this.socket = socket;
    }
}
