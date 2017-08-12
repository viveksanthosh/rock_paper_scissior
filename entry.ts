import * as express from 'express';
import config from './config';
import SocketService from './services/SocketServices';

const app = express(),
    server = app.listen(config.PORT, () => {
        console.log('listening on port ' + config.PORT);
    });

SocketService(server)