"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ConnectedUser_1 = require("../domains/ConnectedUser");
class ConnectedUsers {
    constructor() {
        this.users = [];
    }
    addUser(userSocket) {
        this.users.push(new ConnectedUser_1.default(userSocket));
        this.emitActiveUsers();
    }
    emitActiveUsers() {
        this.users.forEach(user => user.socket.emit('activeUsers', this.users.length));
    }
    emitOpponentFound(user) {
        user.socket.emit("userFound", { myColor: "purple", opponentColor: "green" });
        user.game.opponentSocket.emit("userFound", { myColor: "green", opponentColor: "purple" });
        console.log('opponentFound');
    }
    listenForOpponentMove(user, opponent) {
        console.log('regestered');
        user.socket.on("move", move => {
            console.log("my move " + move);
            console.log("opponents move " + opponent.game.myMove);
            user.game.myMove = move;
            if (!!opponent.game.myMove) {
                this.evaluateResult(user, opponent);
            }
            else {
                opponent.game.opponentMove = move;
            }
        });
    }
    evaluateResult(user, opponent) {
        console.log("evaluatiing");
        if (user.game.myMove !== "NONE" && user.game.opponentMove === "NONE") {
            this.emitResults(user, { result: "WON", myMove: user.game.myMove, opponentsMove: user.game.opponentMove });
            this.emitResults(opponent, { result: "LOST", myMove: user.game.opponentMove, opponentsMove: user.game.myMove });
        }
        else if (user.game.myMove === "NONE" && user.game.opponentMove !== "NONE") {
            this.emitResults(user, { result: "LOST", myMove: user.game.myMove, opponentsMove: user.game.opponentMove });
            this.emitResults(opponent, { result: "WON", myMove: user.game.opponentMove, opponentsMove: user.game.myMove });
        }
        else if (user.game.myMove === user.game.opponentMove) {
            this.emitResults(user, { result: "tie", myMove: user.game.myMove, opponentsMove: user.game.opponentMove });
            this.emitResults(opponent, { result: "tie", myMove: user.game.opponentMove, opponentsMove: user.game.myMove });
        }
        else if (user.game.myMove === "Rock" && user.game.opponentMove === "Scissor") {
            this.emitResults(user, { result: "WON", myMove: user.game.myMove, opponentsMove: user.game.opponentMove });
            this.emitResults(opponent, { result: "LOST", myMove: user.game.opponentMove, opponentsMove: user.game.myMove });
        }
        else if (user.game.myMove === "Rock" && user.game.opponentMove === "Paper") {
            this.emitResults(user, { result: "LOST", myMove: user.game.myMove, opponentsMove: user.game.opponentMove });
            this.emitResults(opponent, { result: "WON", myMove: user.game.opponentMove, opponentsMove: user.game.myMove });
        }
        else if (user.game.myMove === "Paper" && user.game.opponentMove === "Scissor") {
            this.emitResults(user, { result: "LOST", myMove: user.game.myMove, opponentsMove: user.game.opponentMove });
            this.emitResults(opponent, { result: "WON", myMove: user.game.opponentMove, opponentsMove: user.game.myMove });
        }
        else if (user.game.myMove === "Paper" && user.game.opponentMove === "Rock") {
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
    emitResults(user, result) {
        user.socket.emit('result', result);
    }
    findOpponent(id) {
        console.log('searching for id ' + id);
        let opponent = this.users.find(user => user.id !== id && user.lookingForOpponent), currentUser = this.userById(id);
        currentUser.lookingForOpponent = true;
        if (!!opponent) {
            console.log('found ' + opponent.id);
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
            this.listenForOpponentMove(currentUser, opponent);
            this.listenForOpponentMove(opponent, currentUser);
        }
    }
    userById(id) {
        return this.users.find(user => user.id === id);
    }
    removeUserById(id) {
        this.users = this.users.filter(user => user.id !== id);
        this.emitActiveUsers();
    }
    get totalUsers() {
        return this.users.length;
    }
}
let connectedUsers = new ConnectedUsers();
exports.default = connectedUsers;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvdml2ZWsvaW5tby9zZXJ2aWNlcy9Db25uZWN0ZWRVc2Vycy50cyIsInNvdXJjZXMiOlsiL2hvbWUvdml2ZWsvaW5tby9zZXJ2aWNlcy9Db25uZWN0ZWRVc2Vycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDREQUFxRDtBQUNyRDtJQUFBO1FBQ1ksVUFBSyxHQUF5QixFQUFFLENBQUM7SUF1SDdDLENBQUM7SUFySEcsT0FBTyxDQUFDLFVBQTJCO1FBQy9CLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksdUJBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRU8sZUFBZTtRQUNuQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQTtJQUNsRixDQUFDO0lBRU8saUJBQWlCLENBQUMsSUFBbUI7UUFDekMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUM3RSxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUMxRixPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFBO0lBQ2hDLENBQUM7SUFFTyxxQkFBcUIsQ0FBQyxJQUFtQixFQUFFLFFBQXVCO1FBQ3RFLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUE7UUFDekIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLElBQUk7WUFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLENBQUE7WUFDOUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQ3JELElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUN4QixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUN6QixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztZQUN4QyxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1lBQ3RDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTyxjQUFjLENBQUMsSUFBbUIsRUFBRSxRQUF1QjtRQUMvRCxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFBO1FBQzFCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLE1BQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ25FLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsYUFBYSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztZQUMzRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLGFBQWEsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFFcEgsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FBSyxNQUFNLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQztZQUMxRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLGFBQWEsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7WUFDNUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxhQUFhLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBRW5ILENBQUM7UUFDRCxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ25ELElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsYUFBYSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztZQUMzRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLGFBQWEsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFFbkgsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FBSyxNQUFNLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztZQUM3RSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLGFBQWEsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7WUFDM0csSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxhQUFhLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBRXBILENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEtBQUssTUFBTSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDM0UsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxhQUFhLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO1lBQzVHLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsYUFBYSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUVuSCxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLE9BQU8sSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQzlFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsYUFBYSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztZQUM1RyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLGFBQWEsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFFbkgsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FBSyxPQUFPLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQztZQUMzRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLGFBQWEsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7WUFDM0csSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxhQUFhLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQ3BILENBQUM7UUFFRCxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEtBQUssU0FBUyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDM0UsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxhQUFhLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO1lBQzVHLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsYUFBYSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUNuSCxDQUFDO1FBRUQsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLFNBQVMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQzVFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsYUFBYSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztZQUMzRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLGFBQWEsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDcEgsQ0FBQztRQUNELElBQUksQ0FBQyxDQUFDO1lBQ0YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxhQUFhLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO1lBQzdHLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsYUFBYSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUNySCxDQUFDO0lBQ0wsQ0FBQztJQUVPLFdBQVcsQ0FBQyxJQUFtQixFQUFFLE1BQTJEO1FBQ2hHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsWUFBWSxDQUFDLEVBQVU7UUFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsR0FBRyxFQUFFLENBQUMsQ0FBQTtRQUNyQyxJQUFJLFFBQVEsR0FBa0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxFQUM1RixXQUFXLEdBQWtCLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbkQsV0FBVyxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQztRQUN0QyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNiLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQTtZQUNuQyxXQUFXLENBQUMsV0FBVyxDQUFDO2dCQUNwQixNQUFNLEVBQUUsSUFBSTtnQkFDWixZQUFZLEVBQUUsSUFBSTtnQkFDbEIsY0FBYyxFQUFFLFFBQVEsQ0FBQyxNQUFNO2FBQ2xDLENBQUMsQ0FBQztZQUNILFFBQVEsQ0FBQyxXQUFXLENBQUM7Z0JBQ2pCLE1BQU0sRUFBRSxJQUFJO2dCQUNaLFlBQVksRUFBRSxJQUFJO2dCQUNsQixjQUFjLEVBQUUsV0FBVyxDQUFDLE1BQU07YUFDckMsQ0FBQyxDQUFDO1lBQ0gsV0FBVyxDQUFDLGtCQUFrQixHQUFHLEtBQUssQ0FBQztZQUN2QyxRQUFRLENBQUMsa0JBQWtCLEdBQUcsS0FBSyxDQUFDO1lBQ3BDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNwQyxJQUFJLENBQUMscUJBQXFCLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFBO1lBQ2pELElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxRQUFRLEVBQUUsV0FBVyxDQUFDLENBQUE7UUFDckQsQ0FBQztJQUNMLENBQUM7SUFFRCxRQUFRLENBQUMsRUFBVTtRQUNmLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQTtJQUNsRCxDQUFDO0lBRUQsY0FBYyxDQUFDLEVBQVU7UUFDckIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELElBQUksVUFBVTtRQUNWLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQTtJQUM1QixDQUFDO0NBQ0o7QUFFRCxJQUFJLGNBQWMsR0FBRyxJQUFJLGNBQWMsRUFBRSxDQUFDO0FBRTFDLGtCQUFlLGNBQWMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb25uZWN0ZWRVc2VyIGZyb20gJy4uL2RvbWFpbnMvQ29ubmVjdGVkVXNlcic7XG5jbGFzcyBDb25uZWN0ZWRVc2VycyB7XG4gICAgcHJpdmF0ZSB1c2VyczogQXJyYXk8Q29ubmVjdGVkVXNlcj4gPSBbXTtcblxuICAgIGFkZFVzZXIodXNlclNvY2tldDogU29ja2V0SU8uU29ja2V0KSB7XG4gICAgICAgIHRoaXMudXNlcnMucHVzaChuZXcgQ29ubmVjdGVkVXNlcih1c2VyU29ja2V0KSk7XG4gICAgICAgIHRoaXMuZW1pdEFjdGl2ZVVzZXJzKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBlbWl0QWN0aXZlVXNlcnMoKSB7XG4gICAgICAgIHRoaXMudXNlcnMuZm9yRWFjaCh1c2VyID0+IHVzZXIuc29ja2V0LmVtaXQoJ2FjdGl2ZVVzZXJzJywgdGhpcy51c2Vycy5sZW5ndGgpKVxuICAgIH1cblxuICAgIHByaXZhdGUgZW1pdE9wcG9uZW50Rm91bmQodXNlcjogQ29ubmVjdGVkVXNlcikge1xuICAgICAgICB1c2VyLnNvY2tldC5lbWl0KFwidXNlckZvdW5kXCIsIHsgbXlDb2xvcjogXCJwdXJwbGVcIiwgb3Bwb25lbnRDb2xvcjogXCJncmVlblwiIH0pO1xuICAgICAgICB1c2VyLmdhbWUub3Bwb25lbnRTb2NrZXQuZW1pdChcInVzZXJGb3VuZFwiLCB7IG15Q29sb3I6IFwiZ3JlZW5cIiwgb3Bwb25lbnRDb2xvcjogXCJwdXJwbGVcIiB9KTtcbiAgICAgICAgY29uc29sZS5sb2coJ29wcG9uZW50Rm91bmQnKVxuICAgIH1cblxuICAgIHByaXZhdGUgbGlzdGVuRm9yT3Bwb25lbnRNb3ZlKHVzZXI6IENvbm5lY3RlZFVzZXIsIG9wcG9uZW50OiBDb25uZWN0ZWRVc2VyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdyZWdlc3RlcmVkJylcbiAgICAgICAgdXNlci5zb2NrZXQub24oXCJtb3ZlXCIsIG1vdmUgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJteSBtb3ZlIFwiICsgbW92ZSlcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwib3Bwb25lbnRzIG1vdmUgXCIgKyBvcHBvbmVudC5nYW1lLm15TW92ZSlcbiAgICAgICAgICAgIHVzZXIuZ2FtZS5teU1vdmUgPSBtb3ZlO1xuICAgICAgICAgICAgaWYgKCEhb3Bwb25lbnQuZ2FtZS5teU1vdmUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmV2YWx1YXRlUmVzdWx0KHVzZXIsIG9wcG9uZW50KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgb3Bwb25lbnQuZ2FtZS5vcHBvbmVudE1vdmUgPSBtb3ZlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGV2YWx1YXRlUmVzdWx0KHVzZXI6IENvbm5lY3RlZFVzZXIsIG9wcG9uZW50OiBDb25uZWN0ZWRVc2VyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiZXZhbHVhdGlpbmdcIilcbiAgICAgICAgaWYgKHVzZXIuZ2FtZS5teU1vdmUgIT09IFwiTk9ORVwiICYmIHVzZXIuZ2FtZS5vcHBvbmVudE1vdmUgPT09IFwiTk9ORVwiKSB7XG4gICAgICAgICAgICB0aGlzLmVtaXRSZXN1bHRzKHVzZXIsIHsgcmVzdWx0OiBcIldPTlwiLCBteU1vdmU6IHVzZXIuZ2FtZS5teU1vdmUsIG9wcG9uZW50c01vdmU6IHVzZXIuZ2FtZS5vcHBvbmVudE1vdmUgfSk7XG4gICAgICAgICAgICB0aGlzLmVtaXRSZXN1bHRzKG9wcG9uZW50LCB7IHJlc3VsdDogXCJMT1NUXCIsIG15TW92ZTogdXNlci5nYW1lLm9wcG9uZW50TW92ZSwgb3Bwb25lbnRzTW92ZTogdXNlci5nYW1lLm15TW92ZSB9KTtcblxuICAgICAgICB9IGVsc2UgaWYgKHVzZXIuZ2FtZS5teU1vdmUgPT09IFwiTk9ORVwiICYmIHVzZXIuZ2FtZS5vcHBvbmVudE1vdmUgIT09IFwiTk9ORVwiKSB7XG4gICAgICAgICAgICB0aGlzLmVtaXRSZXN1bHRzKHVzZXIsIHsgcmVzdWx0OiBcIkxPU1RcIiwgbXlNb3ZlOiB1c2VyLmdhbWUubXlNb3ZlLCBvcHBvbmVudHNNb3ZlOiB1c2VyLmdhbWUub3Bwb25lbnRNb3ZlIH0pO1xuICAgICAgICAgICAgdGhpcy5lbWl0UmVzdWx0cyhvcHBvbmVudCwgeyByZXN1bHQ6IFwiV09OXCIsIG15TW92ZTogdXNlci5nYW1lLm9wcG9uZW50TW92ZSwgb3Bwb25lbnRzTW92ZTogdXNlci5nYW1lLm15TW92ZSB9KTtcblxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHVzZXIuZ2FtZS5teU1vdmUgPT09IHVzZXIuZ2FtZS5vcHBvbmVudE1vdmUpIHtcbiAgICAgICAgICAgIHRoaXMuZW1pdFJlc3VsdHModXNlciwgeyByZXN1bHQ6IFwidGllXCIsIG15TW92ZTogdXNlci5nYW1lLm15TW92ZSwgb3Bwb25lbnRzTW92ZTogdXNlci5nYW1lLm9wcG9uZW50TW92ZSB9KTtcbiAgICAgICAgICAgIHRoaXMuZW1pdFJlc3VsdHMob3Bwb25lbnQsIHsgcmVzdWx0OiBcInRpZVwiLCBteU1vdmU6IHVzZXIuZ2FtZS5vcHBvbmVudE1vdmUsIG9wcG9uZW50c01vdmU6IHVzZXIuZ2FtZS5teU1vdmUgfSk7XG5cbiAgICAgICAgfSBlbHNlIGlmICh1c2VyLmdhbWUubXlNb3ZlID09PSBcIlJvY2tcIiAmJiB1c2VyLmdhbWUub3Bwb25lbnRNb3ZlID09PSBcIlNjaXNzb3JcIikge1xuICAgICAgICAgICAgdGhpcy5lbWl0UmVzdWx0cyh1c2VyLCB7IHJlc3VsdDogXCJXT05cIiwgbXlNb3ZlOiB1c2VyLmdhbWUubXlNb3ZlLCBvcHBvbmVudHNNb3ZlOiB1c2VyLmdhbWUub3Bwb25lbnRNb3ZlIH0pO1xuICAgICAgICAgICAgdGhpcy5lbWl0UmVzdWx0cyhvcHBvbmVudCwgeyByZXN1bHQ6IFwiTE9TVFwiLCBteU1vdmU6IHVzZXIuZ2FtZS5vcHBvbmVudE1vdmUsIG9wcG9uZW50c01vdmU6IHVzZXIuZ2FtZS5teU1vdmUgfSk7XG5cbiAgICAgICAgfSBlbHNlIGlmICh1c2VyLmdhbWUubXlNb3ZlID09PSBcIlJvY2tcIiAmJiB1c2VyLmdhbWUub3Bwb25lbnRNb3ZlID09PSBcIlBhcGVyXCIpIHtcbiAgICAgICAgICAgIHRoaXMuZW1pdFJlc3VsdHModXNlciwgeyByZXN1bHQ6IFwiTE9TVFwiLCBteU1vdmU6IHVzZXIuZ2FtZS5teU1vdmUsIG9wcG9uZW50c01vdmU6IHVzZXIuZ2FtZS5vcHBvbmVudE1vdmUgfSk7XG4gICAgICAgICAgICB0aGlzLmVtaXRSZXN1bHRzKG9wcG9uZW50LCB7IHJlc3VsdDogXCJXT05cIiwgbXlNb3ZlOiB1c2VyLmdhbWUub3Bwb25lbnRNb3ZlLCBvcHBvbmVudHNNb3ZlOiB1c2VyLmdhbWUubXlNb3ZlIH0pO1xuXG4gICAgICAgIH0gZWxzZSBpZiAodXNlci5nYW1lLm15TW92ZSA9PT0gXCJQYXBlclwiICYmIHVzZXIuZ2FtZS5vcHBvbmVudE1vdmUgPT09IFwiU2Npc3NvclwiKSB7XG4gICAgICAgICAgICB0aGlzLmVtaXRSZXN1bHRzKHVzZXIsIHsgcmVzdWx0OiBcIkxPU1RcIiwgbXlNb3ZlOiB1c2VyLmdhbWUubXlNb3ZlLCBvcHBvbmVudHNNb3ZlOiB1c2VyLmdhbWUub3Bwb25lbnRNb3ZlIH0pO1xuICAgICAgICAgICAgdGhpcy5lbWl0UmVzdWx0cyhvcHBvbmVudCwgeyByZXN1bHQ6IFwiV09OXCIsIG15TW92ZTogdXNlci5nYW1lLm9wcG9uZW50TW92ZSwgb3Bwb25lbnRzTW92ZTogdXNlci5nYW1lLm15TW92ZSB9KTtcblxuICAgICAgICB9IGVsc2UgaWYgKHVzZXIuZ2FtZS5teU1vdmUgPT09IFwiUGFwZXJcIiAmJiB1c2VyLmdhbWUub3Bwb25lbnRNb3ZlID09PSBcIlJvY2tcIikge1xuICAgICAgICAgICAgdGhpcy5lbWl0UmVzdWx0cyh1c2VyLCB7IHJlc3VsdDogXCJXT05cIiwgbXlNb3ZlOiB1c2VyLmdhbWUubXlNb3ZlLCBvcHBvbmVudHNNb3ZlOiB1c2VyLmdhbWUub3Bwb25lbnRNb3ZlIH0pO1xuICAgICAgICAgICAgdGhpcy5lbWl0UmVzdWx0cyhvcHBvbmVudCwgeyByZXN1bHQ6IFwiTE9TVFwiLCBteU1vdmU6IHVzZXIuZ2FtZS5vcHBvbmVudE1vdmUsIG9wcG9uZW50c01vdmU6IHVzZXIuZ2FtZS5teU1vdmUgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBlbHNlIGlmICh1c2VyLmdhbWUubXlNb3ZlID09PSBcIlNjaXNzb3JcIiAmJiB1c2VyLmdhbWUub3Bwb25lbnRNb3ZlID09PSBcIlJvY2tcIikge1xuICAgICAgICAgICAgdGhpcy5lbWl0UmVzdWx0cyh1c2VyLCB7IHJlc3VsdDogXCJMT1NUXCIsIG15TW92ZTogdXNlci5nYW1lLm15TW92ZSwgb3Bwb25lbnRzTW92ZTogdXNlci5nYW1lLm9wcG9uZW50TW92ZSB9KTtcbiAgICAgICAgICAgIHRoaXMuZW1pdFJlc3VsdHMob3Bwb25lbnQsIHsgcmVzdWx0OiBcIldPTlwiLCBteU1vdmU6IHVzZXIuZ2FtZS5vcHBvbmVudE1vdmUsIG9wcG9uZW50c01vdmU6IHVzZXIuZ2FtZS5teU1vdmUgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBlbHNlIGlmICh1c2VyLmdhbWUubXlNb3ZlID09PSBcIlNjaXNzb3JcIiAmJiB1c2VyLmdhbWUub3Bwb25lbnRNb3ZlID09PSBcIlBhcGVyXCIpIHtcbiAgICAgICAgICAgIHRoaXMuZW1pdFJlc3VsdHModXNlciwgeyByZXN1bHQ6IFwiV09OXCIsIG15TW92ZTogdXNlci5nYW1lLm15TW92ZSwgb3Bwb25lbnRzTW92ZTogdXNlci5nYW1lLm9wcG9uZW50TW92ZSB9KTtcbiAgICAgICAgICAgIHRoaXMuZW1pdFJlc3VsdHMob3Bwb25lbnQsIHsgcmVzdWx0OiBcIkxPU1RcIiwgbXlNb3ZlOiB1c2VyLmdhbWUub3Bwb25lbnRNb3ZlLCBvcHBvbmVudHNNb3ZlOiB1c2VyLmdhbWUubXlNb3ZlIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5lbWl0UmVzdWx0cyh1c2VyLCB7IHJlc3VsdDogXCJlcnJvclwiLCBteU1vdmU6IHVzZXIuZ2FtZS5teU1vdmUsIG9wcG9uZW50c01vdmU6IHVzZXIuZ2FtZS5vcHBvbmVudE1vdmUgfSk7XG4gICAgICAgICAgICB0aGlzLmVtaXRSZXN1bHRzKG9wcG9uZW50LCB7IHJlc3VsdDogXCJlcnJvclwiLCBteU1vdmU6IHVzZXIuZ2FtZS5vcHBvbmVudE1vdmUsIG9wcG9uZW50c01vdmU6IHVzZXIuZ2FtZS5teU1vdmUgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGVtaXRSZXN1bHRzKHVzZXI6IENvbm5lY3RlZFVzZXIsIHJlc3VsdDogeyByZXN1bHQ6IHN0cmluZywgbXlNb3ZlOiBhbnksIG9wcG9uZW50c01vdmU6IGFueSB9KSB7XG4gICAgICAgIHVzZXIuc29ja2V0LmVtaXQoJ3Jlc3VsdCcsIHJlc3VsdCk7XG4gICAgfVxuXG4gICAgZmluZE9wcG9uZW50KGlkOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3NlYXJjaGluZyBmb3IgaWQgJyArIGlkKVxuICAgICAgICBsZXQgb3Bwb25lbnQgPSA8Q29ubmVjdGVkVXNlcj50aGlzLnVzZXJzLmZpbmQodXNlciA9PiB1c2VyLmlkICE9PSBpZCAmJiB1c2VyLmxvb2tpbmdGb3JPcHBvbmVudCksXG4gICAgICAgICAgICBjdXJyZW50VXNlciA9IDxDb25uZWN0ZWRVc2VyPnRoaXMudXNlckJ5SWQoaWQpO1xuICAgICAgICBjdXJyZW50VXNlci5sb29raW5nRm9yT3Bwb25lbnQgPSB0cnVlO1xuICAgICAgICBpZiAoISFvcHBvbmVudCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2ZvdW5kICcgKyBvcHBvbmVudC5pZClcbiAgICAgICAgICAgIGN1cnJlbnRVc2VyLnNldE9wcG9uZW50KHtcbiAgICAgICAgICAgICAgICBteU1vdmU6IG51bGwsXG4gICAgICAgICAgICAgICAgb3Bwb25lbnRNb3ZlOiBudWxsLFxuICAgICAgICAgICAgICAgIG9wcG9uZW50U29ja2V0OiBvcHBvbmVudC5zb2NrZXRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgb3Bwb25lbnQuc2V0T3Bwb25lbnQoe1xuICAgICAgICAgICAgICAgIG15TW92ZTogbnVsbCxcbiAgICAgICAgICAgICAgICBvcHBvbmVudE1vdmU6IG51bGwsXG4gICAgICAgICAgICAgICAgb3Bwb25lbnRTb2NrZXQ6IGN1cnJlbnRVc2VyLnNvY2tldFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjdXJyZW50VXNlci5sb29raW5nRm9yT3Bwb25lbnQgPSBmYWxzZTtcbiAgICAgICAgICAgIG9wcG9uZW50Lmxvb2tpbmdGb3JPcHBvbmVudCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5lbWl0T3Bwb25lbnRGb3VuZChjdXJyZW50VXNlcik7XG4gICAgICAgICAgICB0aGlzLmxpc3RlbkZvck9wcG9uZW50TW92ZShjdXJyZW50VXNlciwgb3Bwb25lbnQpXG4gICAgICAgICAgICB0aGlzLmxpc3RlbkZvck9wcG9uZW50TW92ZShvcHBvbmVudCwgY3VycmVudFVzZXIpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1c2VyQnlJZChpZDogc3RyaW5nKTogQ29ubmVjdGVkVXNlciB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLnVzZXJzLmZpbmQodXNlciA9PiB1c2VyLmlkID09PSBpZClcbiAgICB9XG5cbiAgICByZW1vdmVVc2VyQnlJZChpZDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMudXNlcnMgPSB0aGlzLnVzZXJzLmZpbHRlcih1c2VyID0+IHVzZXIuaWQgIT09IGlkKTtcbiAgICAgICAgdGhpcy5lbWl0QWN0aXZlVXNlcnMoKTtcbiAgICB9XG5cbiAgICBnZXQgdG90YWxVc2VycygpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy51c2Vycy5sZW5ndGhcbiAgICB9XG59XG5cbmxldCBjb25uZWN0ZWRVc2VycyA9IG5ldyBDb25uZWN0ZWRVc2VycygpO1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0ZWRVc2VyczsiXX0=