import { useState, useEffect } from 'react';

/**
 * 共享的客户端状态 Hook
 * 用于确保组件只在客户端渲染时执行某些操作
 */
export const useClientState = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
};
