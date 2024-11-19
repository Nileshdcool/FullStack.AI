import { Server as HttpServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';

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
    console.log('Initializing WebSocket server...');

    const httpServer: HttpServer = strapi.server.httpServer;
    io = new SocketIOServer(httpServer, {
      cors: {
        origin: process.env.FRONTEND_URL || 'http://localhost:3000', // Frontend URL
        credentials: true,
      },
    });

    strapi.io = io; // Attach io to Strapi for global access
    strapi.clients = clients; // Attach clients to Strapi for global access

    // console.log("io initialized:", io);
    console.log("clients map initialized:", clients);

    // Handle socket connection
    io.on('connection', (socket) => {
      console.log('Client connected:', socket.id);

      // Register userId with socket
      socket.on('register', ({ userId }: { userId: string }) => {
        console.log("register called")
        if (!userId) {
          console.error('UserId is missing');
          return;
        }
        console.log(`User registered: ${userId}`);
        clients[userId] = socket.id;
        console.log(`clients map after registration:`, clients);
      });

      // Handle progress event
      socket.on('progress', (data) => {
        console.log('Progress update received:', data);
        socket.emit('progress', { message: 'Processing...', status: 'in-progress' });
      });

      // Handle disconnection
      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);

        // Remove the user from the client map by directly checking socket.id
        const userIdToRemove = Object.keys(clients).find(userId => clients[userId] === socket.id);
        if (userIdToRemove) {
          delete clients[userIdToRemove];
          console.log(`User ${userIdToRemove} removed from clients map.`);
        }
      });
    });

    console.log('WebSocket server is ready.');
  },
};
