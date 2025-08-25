import { useState } from 'react';

/**
 * 共享的错误处理 Hook
 * 用于统一管理错误状态和错误处理逻辑
 */
export const useErrorHandler = () => {
  const [error, setError] = useState('');

  const handleError = (err, defaultMessage = '操作失败') => {
    console.error(defaultMessage + ':', err);
    setError(err.message || defaultMessage);
  };

  const clearError = () => {
    setError('');
  };

  const handleAsyncOperation = async (operation, errorMessage = '操作失败') => {
    try {
      clearError();
      return await operation();
    } catch (err) {
      handleError(err, errorMessage);
      throw err; // 重新抛出错误，让调用者可以处理
    }
  };

  return {
    error,
    setError,
    handleError,
    clearError,
    handleAsyncOperation
  };
};
