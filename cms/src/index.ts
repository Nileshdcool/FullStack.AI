import { Server as HttpServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { FRONTEND_URL } from '../config/constants';

interface ClientMap {
  [userId: string]: string; // Map userId to socket.id
}

let io: SocketIOServer | null = null;
const clients: ClientMap = {}; // Track connected users

export { io, clients };

export default {
  /**
   * Register function that runs before the application is initialized.
   */
  register() {},

  /**
   * Bootstrap function that runs before the application starts.
   * Initializes the WebSocket server and attaches it to Strapi.
   */
  async bootstrap({ strapi }: { strapi: any }) {

    const httpServer: HttpServer = strapi.server.httpServer;
    io = new SocketIOServer(httpServer, {
      cors: {
        origin: FRONTEND_URL,
        credentials: true,
      },
    });

    strapi.io = io; // Attach io to Strapi for global access
    strapi.clients = clients; // Attach clients to Strapi for global access

    // Handle socket connection
    io.on('connection', (socket) => {

      // Register userId with socket
      socket.on('register', ({ userId }: { userId: string }) => {
        if (!userId) {
          console.error('UserId is missing');
          return;
        }
        clients[userId] = socket.id;
      });

      // Handle progress event
      socket.on('progress', (data) => {
        socket.emit('progress', { message: 'Processing...', status: 'in-progress' });
      });

      // Handle disconnection
      socket.on('disconnect', () => {

        // Remove the user from the client map by directly checking socket.id
        const userIdToRemove = Object.keys(clients).find(userId => clients[userId] === socket.id);
        if (userIdToRemove) {
          delete clients[userIdToRemove];
        }
      });
    });
  },
};
