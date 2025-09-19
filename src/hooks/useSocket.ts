import { useState } from 'react';

export const useSocket = () => {
  const [socket] = useState<any>(null);
  const [isConnected] = useState(false);

  return { socket, isConnected } as const;
};
