"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socketIo = require("socket.io");
const ConnectedUsers_1 = require("./ConnectedUsers");
exports.default = server => {
    const io = socketIo(server);
    io.on("connection", connection => {
        let myContext = 0;
        ConnectedUsers_1.default.addUser(connection);
        console.log(ConnectedUsers_1.default.totalUsers);
        connection.on('findOpponent', () => {
            ConnectedUsers_1.default.findOpponent(connection.client.id);
        });
        connection.on('disconnect', () => {
            ConnectedUsers_1.default.removeUserById(connection.client.id);
            console.log(ConnectedUsers_1.default.totalUsers);
        });
    });
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvdml2ZWsvaW5tby9zZXJ2aWNlcy9Tb2NrZXRTZXJ2aWNlcy50cyIsInNvdXJjZXMiOlsiL2hvbWUvdml2ZWsvaW5tby9zZXJ2aWNlcy9Tb2NrZXRTZXJ2aWNlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFzQztBQUN0QyxxREFBOEM7QUFDOUMsa0JBQWUsTUFBTTtJQUNqQixNQUFNLEVBQUUsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFNUIsRUFBRSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsVUFBVTtRQUMxQixJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDbEIsd0JBQWMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDbkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRXZDLFVBQVUsQ0FBQyxFQUFFLENBQUMsY0FBYyxFQUFFO1lBQzFCLHdCQUFjLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDdEQsQ0FBQyxDQUFDLENBQUM7UUFFSCxVQUFVLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRTtZQUN4Qix3QkFBYyxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3BELE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMzQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0FBR1AsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgc29ja2V0SW8gZnJvbSAnc29ja2V0LmlvJztcbmltcG9ydCBjb25uZWN0ZWRVc2VycyBmcm9tICcuL0Nvbm5lY3RlZFVzZXJzJztcbmV4cG9ydCBkZWZhdWx0IHNlcnZlciA9PiB7XG4gICAgY29uc3QgaW8gPSBzb2NrZXRJbyhzZXJ2ZXIpO1xuXG4gICAgaW8ub24oXCJjb25uZWN0aW9uXCIsIGNvbm5lY3Rpb24gPT4ge1xuICAgICAgICBsZXQgbXlDb250ZXh0ID0gMDtcbiAgICAgICAgY29ubmVjdGVkVXNlcnMuYWRkVXNlcihjb25uZWN0aW9uKTtcbiAgICAgICAgY29uc29sZS5sb2coY29ubmVjdGVkVXNlcnMudG90YWxVc2Vycyk7XG5cbiAgICAgICAgY29ubmVjdGlvbi5vbignZmluZE9wcG9uZW50JywgKCkgPT4ge1xuICAgICAgICAgICAgY29ubmVjdGVkVXNlcnMuZmluZE9wcG9uZW50KGNvbm5lY3Rpb24uY2xpZW50LmlkKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29ubmVjdGlvbi5vbignZGlzY29ubmVjdCcsICgpID0+IHtcbiAgICAgICAgICAgIGNvbm5lY3RlZFVzZXJzLnJlbW92ZVVzZXJCeUlkKGNvbm5lY3Rpb24uY2xpZW50LmlkKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGNvbm5lY3RlZFVzZXJzLnRvdGFsVXNlcnMpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuXG59Il19