import { io, clients } from "../../..";
// Function to send messages via WebSocket
export const sendMessage = (userId: string, message: object) => {
  const socketId = clients[userId];
  console.log("sendMessage", socketId)
  console.log("userId", userId)

  if (socketId && io) {
    console.log("socketId && io", message)
    io.to(socketId).emit('progress', message);
  }
};
