import { Server as HTTPServer } from 'http';
import { Socket as NetSocket } from 'net';
import { NextApiResponse } from 'next';
import { Server as SocketIOServer } from 'socket.io';

export type NextApiResponseServerIO = NextApiResponse & {
    socket: NetSocket & {
        server: HTTPServer & {
            io: SocketIOServer;
        };
    };
};
