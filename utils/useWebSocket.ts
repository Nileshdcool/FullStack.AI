// src/hooks/useWebsocket.ts
import { useEffect, useState } from 'react';
import { connectWebSocket, disconnectWebSocket, sendMessage } from '@/utils/websocket';

const useWebsocket = (userId: string, onMessage: (data: any) => void) => {
  const [connected, setConnected] = useState<boolean>(false);

  useEffect(() => {
    if (userId) {
      // Connect to WebSocket
      const onReceiveMessage = (data: any) => {
        onMessage(data); // Call the onMessage callback whenever a message is received
      };

      connectWebSocket(userId, onReceiveMessage);
      setConnected(true);

      // Cleanup WebSocket connection on component unmount
      return () => {
        disconnectWebSocket();
        setConnected(false);
      };
    }
  }, [userId, onMessage]);

  // Optional: You can send messages to WebSocket through this hook
  const sendMessageToSocket = (message: any) => {
    sendMessage(message);
  };

  return { connected, sendMessageToSocket };
};

export default useWebsocket;
