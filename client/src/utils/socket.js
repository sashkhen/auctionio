import { io } from 'socket.io-client';

const ENDPOINT = 'http://127.0.0.1:4001';
const socket = io(ENDPOINT, { autoConnect: false });

socket.onAny((event, ...args) => {
  console.log(event, args);
});

export default socket;
