import { NextApiRequest, NextApiResponse } from 'next';
import { Server as ServerIO } from 'socket.io';
import { Server as NetServer } from 'http';
import { Socket as NetSocket } from 'net';

interface SocketServer extends NetServer {
    io?: ServerIO;
}

interface SocketWithIO extends NetSocket {
    server: SocketServer;
}

const SocketHandler = (req: NextApiRequest, res: NextApiResponse) => {
    if (!res.socket.server.io) {
        console.log('Initializing Socket.io');
        const io = new ServerIO(res.socket.server as NetServer);
        res.socket.server.io = io;

        io.on('connection', (socket) => {
            console.log('New client connected');

            socket.on('sendMessage', (message: string) => {
                io.emit('receiveMessage', message);
            });

            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });
    } else {
        console.log('Socket.io already running');
    }
    res.end();
};

export default SocketHandler;
