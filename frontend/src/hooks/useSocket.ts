import { useState, useEffect } from 'react';
import io from 'socket.io-client';

export const useSocket = (roomId: string) => {
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const instance = io(`ws://127.0.0.1:3002/${roomId}`);
    instance.on('connect', () => {
      setSocket(instance);
      console.log('已连接房间终端同步');
    });
  }, []);
  return socket;
};
