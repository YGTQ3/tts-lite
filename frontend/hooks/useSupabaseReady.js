// Empty hook for compatibility
export const useSupabaseReady = () => {
  return { isReady: false, getDebugInfo: () => '' };
};