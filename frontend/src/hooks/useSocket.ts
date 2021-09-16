import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import {tsocketHost } from 'utils/API';

export const useSocket = (roomId: string) => {
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const instance = io(`${tsocketHost}/${roomId}`);
    instance.on('connect', () => {
      setSocket(instance);
      console.log('已连接房间终端同步');
    });
  }, []);
  return socket;
};
