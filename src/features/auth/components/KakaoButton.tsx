import { useCallback, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { startKakaoLogin } from '@/features/auth/services/kakao';
import { resolveFrom } from '@/routes/resolveFrom';

import * as S from './KakaoButton.styled';

export type KakaoStatusUpdate = {
  provider: 'kakao';
  status: 'idle' | 'loading' | 'success' | 'error';
  message: string;
  retry?: () => void;
};

type KakaoButtonProps = {
  disabled?: boolean;
  onStatusChange?: (update: KakaoStatusUpdate) => void;
  idleLabel?: string;
  loadingLabel?: string;
  redirectTo?: string;
};

export default function KakaoButton({
  disabled = false,
  onStatusChange,
  idleLabel = '카카오로 시작하기',
  loadingLabel = '카카오로 이동 중…',
  redirectTo,
}: KakaoButtonProps = {}) {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const redirectTarget = useMemo(
    () => redirectTo ?? resolveFrom(location.state, '/my'),
    [location.state, redirectTo],
  );

  const attemptLogin = useCallback(async () => {
    if (disabled || loading) return;

    const retry = () => {
      void attemptLogin();
    };

    onStatusChange?.({
      provider: 'kakao',
      status: 'loading',
      message: '카카오 계정으로 이동을 준비하고 있어요…',
      retry,
    });
    try {
      setLoading(true);
      await startKakaoLogin(redirectTarget);
      onStatusChange?.({
        provider: 'kakao',
        status: 'success',
        message:
          '카카오 계정 페이지로 이동 중이에요. 새 창이 열리면 계속 진행해 주세요.',
      });
    } catch {
      onStatusChange?.({
        provider: 'kakao',
        status: 'error',
        message:
          '카카오 로그인에 실패했어요. 네트워크 상태를 확인한 뒤 다시 시도해 주세요.',
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
    <S.KakaoButtonRoot
      type="button"
      onClick={handleClick}
      disabled={disabled || loading}
      aria-label="kakao-login"
      aria-busy={loading}
      data-state={loading ? 'loading' : 'idle'}
    >
      <S.ButtonContent>
        <S.Icon aria-hidden>
          <KakaoGlyph />
        </S.Icon>
        <span>{label}</span>
      </S.ButtonContent>
    </S.KakaoButtonRoot>
  );
}

function KakaoGlyph() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 48 48"
      role="img"
      focusable="false"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M24 8C13.5 8 5 14.1 5 21.8c0 4.8 3.3 9 8.4 11.3l-2 7.5c-.2.7.6 1.2 1.2.8l8-5c1.1.1 2.2.2 3.4.2 10.5 0 19-6.1 19-13.8S34.5 8 24 8z"
      />
    </svg>
  );
}
