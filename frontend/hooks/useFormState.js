import { useState } from 'react';

/**
 * 共享的表单状态 Hook
 * 用于管理表单的通用状态（加载、错误、调试信息）
 */
export const useFormState = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [debugInfo, setDebugInfo] = useState('');

  const resetState = () => {
    setError('');
    setDebugInfo('');
  };

  const setLoadingState = (loading) => {
    setIsLoading(loading);
    if (loading) {
      setError('');
    }
  };

  return {
    isLoading,
    error,
    debugInfo,
    setIsLoading: setLoadingState,
    setError,
    setDebugInfo,
    resetState
  };
};
