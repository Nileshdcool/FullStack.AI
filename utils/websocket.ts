import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

// Connect to WebSocket (Socket.io client)
export const connectWebSocket = (userId: string, onMessage: (data: any) => void) => {
  if (!socket || socket.connected === false) {
    // Establish a connection to the server
    socket = io('http://localhost:1337', {
      query: { userId }, // Pass the userId as a query parameter
      transports: ['websocket'], // Use WebSocket as the transport
    });

    // On message received from server (Socket.io event)
    socket.on('progress', (data) => {
      try {
        onMessage(data); // Pass data to the provided onMessage callback
      } catch (error) {
        console.error('Error processing message:', error);
      }
    });

    // Handle Socket.io connection
    socket.on('connect', () => {
      console.log('Socket.io connection established');
      
      // Register the user once connected
      if (socket) {
        socket.emit('register', { userId }); // Emit 'register' event with userId
      }
    });

    // Handle Socket.io disconnect
    socket.on('disconnect', () => {
      console.log('Socket.io connection closed');
    });

    // Handle Socket.io error event
    socket.on('connect_error', (error) => {
      console.error('Socket.io connection error:', error);
    });
  }
};

// Disconnect WebSocket (Socket.io client)
export const disconnectWebSocket = () => {
  if (socket) {
    socket.disconnect(); // Disconnect the socket
    socket = null;
  }
};

// Send a message to the WebSocket server (Socket.io client)
export const sendMessage = (message: any) => {
  if (socket && socket.connected) {
    socket.emit('progress', message); // Emit the 'progress' event
  } else {
    console.warn('Socket.io is not connected');
  }
};
