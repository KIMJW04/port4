// 'use client';

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useSocket } from '@/components/socket-provider';

// interface Message {
//     userId: number;
//     content: string;
// }

// const ChatPage = () => {
//     const [messages, setMessages] = useState<Message[]>([]);
//     const [currentMessage, setCurrentMessage] = useState('');
//     const { socket, isConnected } = useSocket();
//     const [userId, setUserId] = useState<number>(+new Date());

//     useEffect(() => {
//         if (!socket) return;

//         socket.on('message', (data: Message) => {
//             setMessages((prevMessages) => [...prevMessages, data]);
//         });

//         return () => {
//             socket.off('message');
//         };
//     }, [socket]);

//     const sendMessage = async (e: React.MouseEvent<HTMLButtonElement>) => {
//         e.preventDefault();
//         if (currentMessage.trim()) {
//             await axios.post('/api/chat', {
//                 userId,
//                 content: currentMessage,
//             });
//             setCurrentMessage('');
//         }
//     };

//     return (
//         <div className="fixed inset-0 flex items-center justify-center p-4 bg-gray-800 text-white">
//             <div className="w-full max-w-lg p-4 bg-gray-900 rounded shadow-md">
//                 <div className="h-64 p-2 mb-4 overflow-y-auto bg-gray-700 rounded">
//                     {messages.map((message, index) => (
//                         <div
//                             key={index}
//                             className={`p-2 mb-2 rounded ${message.userId === userId ? 'bg-blue-400 text-white' : 'bg-gray-600'}`}
//                         >
//                             {message.content}
//                         </div>
//                     ))}
//                 </div>
//                 <div className="flex items-center mt-2">
//                     <input
//                         type="text"
//                         value={currentMessage}
//                         onChange={(e) => setCurrentMessage(e.target.value)}
//                         className="flex-grow p-2 mr-2 bg-gray-600 border border-gray-500 rounded"
//                         placeholder="Type your message..."
//                     />
//                     <button
//                         onClick={sendMessage}
//                         className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
//                     >
//                         Send
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ChatPage;
