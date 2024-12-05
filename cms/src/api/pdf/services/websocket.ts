import { io, clients } from "../../..";
// Function to send messages via WebSocket
export const sendMessage = (sessionKey: string, message: object) => {
  const socketId = clients[sessionKey];

  if (socketId && io) {
    io.to(socketId).emit('progress', message);
  }
};
