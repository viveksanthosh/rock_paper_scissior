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
        user.socket.emit("userFound", { myColor: "purple", opponentColor: "green" });
        user.game.opponentSocket.emit("userFound", { myColor: "green", opponentColor: "purple" });
        console.log('opponentFound')
    }

    private listenForOpponentMove(user: ConnectedUser, opponent: ConnectedUser) {
        console.log('regestered')
        user.socket.on("move", move => {
            console.log("my move " + move)
            console.log("opponents move " + opponent.game.myMove)
            user.game.myMove = move;
            if (!!opponent.game.myMove) {
                this.evaluateResult(user, opponent);
            } else {
                opponent.game.opponentMove = move;
            }
        });
    }

    private evaluateResult(user: ConnectedUser, opponent: ConnectedUser) {
        console.log("evaluatiing")
        if (user.game.myMove !== "NONE" && user.game.opponentMove === "NONE") {
            this.emitResults(user, { result: "WON", myMove: user.game.myMove, opponentsMove: user.game.opponentMove });
            this.emitResults(opponent, { result: "LOST", myMove: user.game.opponentMove, opponentsMove: user.game.myMove });

        } else if (user.game.myMove === "NONE" && user.game.opponentMove !== "NONE") {
            this.emitResults(user, { result: "LOST", myMove: user.game.myMove, opponentsMove: user.game.opponentMove });
            this.emitResults(opponent, { result: "WON", myMove: user.game.opponentMove, opponentsMove: user.game.myMove });

        }
        else if (user.game.myMove === user.game.opponentMove) {
            this.emitResults(user, { result: "TIED", myMove: user.game.myMove, opponentsMove: user.game.opponentMove });
            this.emitResults(opponent, { result: "TIED", myMove: user.game.opponentMove, opponentsMove: user.game.myMove });

        } else if (user.game.myMove === "Rock" && user.game.opponentMove === "Scissor") {
            this.emitResults(user, { result: "WON", myMove: user.game.myMove, opponentsMove: user.game.opponentMove });
            this.emitResults(opponent, { result: "LOST", myMove: user.game.opponentMove, opponentsMove: user.game.myMove });

        } else if (user.game.myMove === "Rock" && user.game.opponentMove === "Paper") {
            this.emitResults(user, { result: "LOST", myMove: user.game.myMove, opponentsMove: user.game.opponentMove });
            this.emitResults(opponent, { result: "WON", myMove: user.game.opponentMove, opponentsMove: user.game.myMove });

        } else if (user.game.myMove === "Paper" && user.game.opponentMove === "Scissor") {
            this.emitResults(user, { result: "LOST", myMove: user.game.myMove, opponentsMove: user.game.opponentMove });
            this.emitResults(opponent, { result: "WON", myMove: user.game.opponentMove, opponentsMove: user.game.myMove });

        } else if (user.game.myMove === "Paper" && user.game.opponentMove === "Rock") {
            this.emitResults(user, { result: "WON", myMove: user.game.myMove, opponentsMove: user.game.opponentMove });
            this.emitResults(opponent, { result: "LOST", myMove: user.game.opponentMove, opponentsMove: user.game.myMove });
        }

        else if (user.game.myMove === "Scissor" && user.game.opponentMove === "Rock") {
            this.emitResults(user, { result: "LOST", myMove: user.game.myMove, opponentsMove: user.game.opponentMove });
            this.emitResults(opponent, { result: "WON", myMove: user.game.opponentMove, opponentsMove: user.game.myMove });
        }

        else if (user.game.myMove === "Scissor" && user.game.opponentMove === "Paper") {
            this.emitResults(user, { result: "WON", myMove: user.game.myMove, opponentsMove: user.game.opponentMove });
            this.emitResults(opponent, { result: "LOST", myMove: user.game.opponentMove, opponentsMove: user.game.myMove });
        }
        else {
            this.emitResults(user, { result: "error", myMove: user.game.myMove, opponentsMove: user.game.opponentMove });
            this.emitResults(opponent, { result: "error", myMove: user.game.opponentMove, opponentsMove: user.game.myMove });
        }
    }

    private emitResults(user: ConnectedUser, result: { result: string, myMove: any, opponentsMove: any }) {
        user.socket.emit('result', result);
    }

    findOpponent(id: string) {
        console.log('searching for id ' + id)
        let opponent = <ConnectedUser>this.users.find(user => user.id !== id && user.lookingForOpponent),
            currentUser = <ConnectedUser>this.userById(id);
        currentUser.lookingForOpponent = true;
        if (!!opponent) {
            console.log('found ' + opponent.id)
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
            currentUser.lookingForOpponent = false;
            opponent.lookingForOpponent = false;
            this.emitOpponentFound(currentUser);
            this.listenForOpponentMove(currentUser, opponent)
            this.listenForOpponentMove(opponent, currentUser)
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