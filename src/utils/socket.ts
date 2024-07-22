import { io } from 'socket.io-client';

const socket = io('http://localhost:3000'); // 서버 주소를 입력하세요

export default socket;
