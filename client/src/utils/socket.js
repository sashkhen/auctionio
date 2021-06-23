import React from 'react';
import socketIo from 'socket.io-client';
import { ENDPOINT } from '../variables';

export const socket = socketIo.connect(ENDPOINT);
export const SocketContext = React.createContext();
