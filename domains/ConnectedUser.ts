interface Game {
    opponentSocket: SocketIO.Socket,
    myMove: "Rock" | "Paper" | "Scissor" | null,
    opponentMove: "Rock" | "Paper" | "Scissor" | null
}

export default class {
    id: string;
    socket: SocketIO.Socket;
    lookingForOpponent: boolean = false;
    game: Game

    constructor(socket: SocketIO.Socket) {
        this.id = socket.client.id;
        this.socket = socket;
    }

    setOpponent(game: Game) {
        this.game = game
    }
}
