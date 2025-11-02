import { useCallback, useState } from 'react';

import type { OAuthProvider } from '@/features/auth/api/authApi';

export type OAuthFlowStatus = 'idle' | 'loading' | 'success' | 'error';

export type OAuthFeedback = {
  status: OAuthFlowStatus;
  provider: OAuthProvider | null;
  message: string | null;
  retry: (() => void) | null;
};

const INITIAL_FEEDBACK: OAuthFeedback = {
  status: 'idle',
  provider: null,
  message: null,
  retry: null,
};

export function useOAuthFeedback() {
  const [feedback, setFeedback] = useState<OAuthFeedback>(INITIAL_FEEDBACK);

  const setLoading = useCallback(
    (provider: OAuthProvider, message: string, retry?: () => void) => {
      setFeedback({
        status: 'loading',
        provider,
        message,
        retry: retry ?? null,
      });
    },
    [],
  );

  const setSuccess = useCallback((provider: OAuthProvider, message: string) => {
    setFeedback({
      status: 'success',
      provider,
      message,
      retry: null,
    });
  }, []);

  const setError = useCallback(
    (provider: OAuthProvider, message: string, retry?: () => void) => {
      setFeedback({
        status: 'error',
        provider,
        message,
        retry: retry ?? null,
      });
    },
    [],
  );

  const reset = useCallback(() => {
    setFeedback(INITIAL_FEEDBACK);
  }, []);

  return {
    feedback,
    isProcessing: feedback.status === 'loading',
    setLoading,
    setSuccess,
    setError,
    reset,
  } as const;
}
