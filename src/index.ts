import * as http from 'http';
import Server from './server';
import { endpoint } from './env';

const port = process.env.PORT || endpoint;
Server.set('port', port);

console.log(`Server listening on port ${port}`);

const server = http.createServer(Server);
server.listen(port);