import { useCallback, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { startGoogleLogin } from '@/features/auth/services/google';
import { resolveFrom } from '@/routes/resolveFrom';

import * as S from './GoogleButton.styled';

export type GoogleStatusUpdate = {
  provider: 'google';
  status: 'idle' | 'loading' | 'success' | 'error';
  message: string;
  retry?: () => void;
};

type GoogleButtonProps = {
  disabled?: boolean;
  onStatusChange?: (update: GoogleStatusUpdate) => void;
  idleLabel?: string;
  loadingLabel?: string;
  redirectTo?: string;
};

export default function GoogleButton({
  disabled = false,
  onStatusChange,
  idleLabel = 'Google로 시작하기',
  loadingLabel = 'Google로 이동 중…',
  redirectTo,
}: GoogleButtonProps = {}) {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const redirectTarget = useMemo(
    () => redirectTo ?? resolveFrom(location.state, '/home'),
    [location.state, redirectTo],
  );

  const attemptLogin = useCallback(async () => {
    if (disabled || loading) return;

    const retry = () => {
      void attemptLogin();
    };

    onStatusChange?.({
      provider: 'google',
      status: 'loading',
      message: 'Google 계정으로 이동을 준비하고 있어요…',
      retry,
    });

    try {
      setLoading(true);
      await startGoogleLogin(redirectTarget);
      onStatusChange?.({
        provider: 'google',
        status: 'success',
        message:
          'Google 계정 페이지로 이동 중이에요. 새 창이 열리면 계속 진행해 주세요.',
      });
    } catch {
      onStatusChange?.({
        provider: 'google',
        status: 'error',
        message:
          'Google 로그인에 실패했어요. 네트워크 상태를 확인한 뒤 다시 시도해 주세요.',
        retry,
      });
    } finally {
      setLoading(false);
    }
  }, [disabled, loading, onStatusChange, redirectTarget]);

  const handleClick = useCallback(() => {
    void attemptLogin();
  }, [attemptLogin]);

  const label = loading ? loadingLabel : idleLabel;

  return (
    <S.GoogleButtonRoot
      type="button"
      onClick={handleClick}
      disabled={disabled || loading}
      aria-label="google-login"
      aria-busy={loading}
      data-state={loading ? 'loading' : 'idle'}
    >
      <S.ButtonContent>
        <S.Icon aria-hidden>
          <GoogleGlyph />
        </S.Icon>
        <span>{label}</span>
      </S.ButtonContent>
    </S.GoogleButtonRoot>
  );
}

function GoogleGlyph() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 48 48"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="#EA4335"
        d="M24 9.5c3.9 0 7.4 1.4 10.1 3.9l6.8-6.8C36.8 2.3 30.8 0 24 0 14.6 0 6.6 5.4 2.6 13.2l7.9 6.1C12.5 13.6 17.8 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.5 24c0-1.6-.2-3.2-.6-4.7H24v9h12.6c-.6 3-2.4 5.6-5 7.3l7.7 6c4.5-4.1 7.2-10.1 7.2-17.6z"
      />
      <path
        fill="#FBBC05"
        d="M10.5 28.3c-.5-1.4-.8-2.9-.8-4.3s.3-2.9.8-4.3l-7.9-6.1C.9 16.5 0 20.1 0 24s.9 7.5 2.6 10.4l7.9-6.1z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.5 0 12-2.1 16-5.6l-7.7-6c-2.1 1.4-4.8 2.2-8.3 2.2-6.3 0-11.6-4.2-13.5-10l-7.9 6.1C6.6 42.6 14.6 48 24 48z"
      />
    </svg>
  );
}
