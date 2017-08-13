import ConnectedUser from '../domains/ConnectedUser';
class ConnectedUsers {
    private users: Array<ConnectedUser> = [];

    addUser(userSocket: SocketIO.Socket) {
        this.users.push(new ConnectedUser(userSocket));
        this.emitActiveUsers();
    }

    private emitActiveUsers() {
        this.users.forEach(user => user.socket.emit('activeUsers', this.users.length))
    }

    private emitOpponentFound(user: ConnectedUser) {
        user.socket.emit("userFound");
        user.game.opponentSocket.emit("userFound");
        console.log('opponentFound')
    }

    private listenForOpponentMove(user: ConnectedUser, opponent: ConnectedUser) {
        user.socket.on("move", move => {
            user.game.myMove = move;
            if (!!opponent.game.opponentMove) {
                this.evaluateResult(user, opponent);
            } else {
                opponent.game.opponentMove = move;
            }
        });
    }

    private evaluateResult(user: ConnectedUser, opponent: ConnectedUser) {
        if (user.game.myMove === user.game.opponentMove) {
            this.emitResults(user, "tie");
            this.emitResults(opponent, "tie");

        } else if (user.game.myMove === "Rock" && user.game.opponentMove === "Scissor") {
            this.emitResults(user, "win");
            this.emitResults(opponent, "lose");

        } else if (user.game.myMove === "Rock" && user.game.opponentMove === "Paper") {
            this.emitResults(user, "lose");
            this.emitResults(opponent, "win");

        } else if (user.game.myMove === "Paper" && user.game.opponentMove === "Scissor") {
            this.emitResults(user, "lose");
            this.emitResults(opponent, "win");

        } else if (user.game.myMove === "Paper" && user.game.opponentMove === "Rock") {
            this.emitResults(user, "win");
            this.emitResults(opponent, "lose");
        }

        else if (user.game.myMove === "Scissor" && user.game.opponentMove === "Rock") {
            this.emitResults(user, "lose");
            this.emitResults(opponent, "win");
        }

        else if (user.game.myMove === "Scissor" && user.game.opponentMove === "Paper") {
            this.emitResults(user, "win");
            this.emitResults(opponent, "lose");
        }
        else {
            this.emitResults(user, "error");
            this.emitResults(opponent, "error");
        }
    }

    private emitResults(user: ConnectedUser, result: string) {
        user.socket.emit('result', result);
    }

    findOpponent(id: string) {
        console.log('searching')
        let opponent = <ConnectedUser>this.users.find(user => user.id !== id && user.lookingForOpponent),
            currentUser = <ConnectedUser>this.userById(id);
        currentUser.lookingForOpponent = true;
        if (!!opponent) {
            currentUser.setOpponent({
                myMove: null,
                opponentMove: null,
                opponentSocket: opponent.socket
            });
            opponent.setOpponent({
                myMove: null,
                opponentMove: null,
                opponentSocket: currentUser.socket
            });
            this.emitOpponentFound(currentUser);
        }
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