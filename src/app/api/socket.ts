import { Server as NetServer } from 'http';
import { NextApiRequest } from 'next';
import { Server as SocketIOServer } from 'socket.io';
import { NextApiResponseServerIO } from '@/types/next';

const SocketHandler = (req: NextApiRequest, res: NextApiResponseServerIO) => {
    if (!res.socket.server.io) {
        const httpServer: NetServer = res.socket.server as any;
        const io = new SocketIOServer(httpServer, {
            path: '/api/socket',
        });
        res.socket.server.io = io;

        io.on('connection', (socket) => {
            console.log('A user connected');

            socket.on('disconnect', () => {
                console.log('A user disconnected');
            });

            socket.on('message', (msg) => {
                io.emit('message', msg);
            });
        });

        console.log('Socket.io server initialized');
    } else {
        console.log('Socket.io server already initialized');
    }
    res.end();
};

export const config = {
    api: {
        bodyParser: false,
    },
};

export default SocketHandler;
