import { useCallback, useEffect, useMemo } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import Button from '@/components/button';
import RouteSkeleton from '@/components/RouteSkeleton';
import { useActions, useHasHydrated, useIsLoggedIn } from '@/stores/appStore';

import * as S from './LoginPage.styled';

const DUMMY_USER = {
  id: 101,
  name: '김대영',
  email: 'kimdy@pusan.ac.kr',
  avatarUrl: 'https://via.placeholder.com/120',
};

function useLoginFlow() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { setUser, clearSessionExpired } = useActions();

  const redirectPath = useMemo(() => {
    const state = location.state as { from?: { pathname?: string } } | null;
    return state?.from?.pathname ?? '/my';
  }, [location.state]);

  const expired = searchParams.get('expired') === '1';

  const handleLogin = useCallback(() => {
    setUser(DUMMY_USER);
    clearSessionExpired();
    void navigate(redirectPath, { replace: true });
  }, [clearSessionExpired, navigate, redirectPath, setUser]);

  return { expired, handleLogin, redirectPath };
}

export default function LoginPage() {
  const hydrated = useHasHydrated();
  const isLoggedIn = useIsLoggedIn();
  const navigate = useNavigate();
  const { expired, handleLogin, redirectPath } = useLoginFlow();

  useEffect(() => {
    if (hydrated && isLoggedIn) {
      void navigate(redirectPath, { replace: true });
    }
  }, [hydrated, isLoggedIn, navigate, redirectPath]);

  if (!hydrated) {
    return <RouteSkeleton />;
  }

  if (isLoggedIn) {
    return <RouteSkeleton />;
  }

  return (
    <S.Page aria-label="login-page">
      <S.Card>
        <S.Heading>로그인</S.Heading>
        <S.Description>
          보호된 서비스를 이용하려면 로그인해 주세요. 더미 계정으로 진행하면
          인증 플로우를 확인할 수 있습니다.
        </S.Description>
        {expired && (
          <S.Toast role="alert" data-testid="toast">
            세션이 만료되었어요. 다시 로그인해 주세요.
          </S.Toast>
        )}
        <S.ButtonGroup>
          <Button onClick={handleLogin} ariaLabel="login-submit">
            더미 계정으로 로그인
          </Button>
        </S.ButtonGroup>
      </S.Card>
    </S.Page>
  );
}
