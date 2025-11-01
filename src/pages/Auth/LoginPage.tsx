import { useCallback, useEffect, useMemo } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import Button from '@/components/button';
import RouteSkeleton from '@/components/RouteSkeleton';
import { resolveFrom } from '@/routes/resolveFrom';
import { useActions, useHasHydrated, useIsLoggedIn } from '@/stores/appStore';
import {
  useHasSession,
  useSessionActions,
  useSessionHydrated,
} from '@/stores/sessionStore';

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
  const { setSession } = useSessionActions();

  const redirectPath = useMemo(() => {
    return resolveFrom(location.state);
  }, [location.state]);

  const expired = searchParams.get('expired') === '1';

  const handleLogin = useCallback(() => {
    setUser(DUMMY_USER);
    clearSessionExpired();
    setSession('dummy-access-token');
    void navigate(redirectPath, { replace: true });
  }, [clearSessionExpired, navigate, redirectPath, setSession, setUser]);
  return { expired, handleLogin, redirectPath };
}

export default function LoginPage() {
  const hydrated = useHasHydrated();
  const sessionHydrated = useSessionHydrated();
  const isLoggedIn = useIsLoggedIn();
  const hasSession = useHasSession();
  const navigate = useNavigate();
  const { expired, handleLogin, redirectPath } = useLoginFlow();

  useEffect(() => {
    if (hydrated && sessionHydrated && (isLoggedIn || hasSession)) {
      void navigate(redirectPath, { replace: true });
    }
  }, [
    hasSession,
    hydrated,
    isLoggedIn,
    navigate,
    redirectPath,
    sessionHydrated,
  ]);
  if (!hydrated || !sessionHydrated) {
    return <RouteSkeleton />;
  }

  if (isLoggedIn || hasSession) {
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
