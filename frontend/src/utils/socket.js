// socket.js
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000'); // Create socket instance once

export default socket;
