// /pages/api/socketio/route.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { Server as NetServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { Socket } from 'net';

export type NextApiResponseServerIo = NextApiResponse & {
    socket: Socket & {
        server: NetServer & {
            io: SocketIOServer;
        };
    };
};

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
    if (!res.socket.server.io) {
        console.log('Initializing Socket.IO');
        const httpServer: NetServer = res.socket.server as any;
        const io = new SocketIOServer(httpServer, {
            path: '/api/socketio',
            addTrailingSlash: false,
        });

        io.on('connection', (socket) => {
            console.log('New client connected');

            // Handle incoming messages
            socket.on('message', (msg) => {
                console.log('Message received:', msg);
                io.emit('message', msg); // Broadcast message to all clients
            });

            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });

        res.socket.server.io = io;
    } else {
        console.log('Socket.IO already initialized');
    }

    res.end();
};

export default ioHandler;
