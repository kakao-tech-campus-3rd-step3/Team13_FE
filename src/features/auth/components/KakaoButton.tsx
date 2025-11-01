import { useCallback, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { startKakaoLogin } from '@/features/auth/services/kakao';
import { resolveFrom } from '@/routes/resolveFrom';

import * as S from './KakaoButton.styled';

export default function KakaoButton() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const redirectTarget = useMemo(
    () => resolveFrom(location.state, '/my'),
    [location.state],
  );

  const handleClick = useCallback(async () => {
    try {
      setLoading(true);
      await startKakaoLogin(redirectTarget);
    } finally {
      setLoading(false);
    }
  }, [redirectTarget]);

  return (
    <S.KakaoButtonRoot
      type="button"
      onClick={() => {
        void handleClick();
      }}
      aria-label="kakao-login"
      disabled={loading}
    >
      <S.Icon aria-hidden>🟡</S.Icon>
      {loading ? '카카오로 이동 중…' : '카카오로 시작하기'}
    </S.KakaoButtonRoot>
  );
}
