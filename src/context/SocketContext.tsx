import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface SocketContextProps {
    socket: Socket | null;
    messages: string[];
    sendMessage: (message: string) => void;
}

const SocketContext = createContext<SocketContextProps | undefined>(undefined);

export const useSocketContext = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error('useSocketContext must be used within a SocketProvider');
    }
    return context;
};

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [messages, setMessages] = useState<string[]>([]);
    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
        socketRef.current = io();

        socketRef.current.on('receiveMessage', (message: string) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socketRef.current?.disconnect();
        };
    }, []);

    const sendMessage = (message: string) => {
        socketRef.current?.emit('sendMessage', message);
    };

    return (
        <SocketContext.Provider value={{ socket: socketRef.current, messages, sendMessage }}>
            {children}
        </SocketContext.Provider>
    );
};
