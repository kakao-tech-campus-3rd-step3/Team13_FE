import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import Button from '@/components/button';
import RouteSkeleton from '@/components/RouteSkeleton';
import { getOAuthUrl, type OAuthProvider } from '@/features/auth/api/authApi';
import { AuthCard } from '@/features/auth/components/AuthCard';
import { AuthProviderButton } from '@/features/auth/components/AuthProviderButton';
import { notify } from '@/pages/notifications/notify';
import { resolveFrom } from '@/routes/resolveFrom';
import { useActions, useHasHydrated, useIsLoggedIn } from '@/stores/appStore';
import {
  useHasSession,
  useSessionActions,
  useSessionHydrated,
} from '@/stores/sessionStore';
import { redirectTo } from '@/utils/navigation';

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
  const [searchParams] = useSearchParams();
  const [loadingProvider, setLoadingProvider] = useState<OAuthProvider | null>(
    null,
  );

  const startOAuth = useCallback(
    async (provider: OAuthProvider) => {
      try {
        setLoadingProvider(provider);
        const redirect = searchParams.get('redirect') ?? undefined;
        const url = await getOAuthUrl(provider, redirect);
        redirectTo(url);
      } catch {
        notify.error('로그인을 시작하지 못했어요. 잠시 후 다시 시도해주세요.');
      } finally {
        setLoadingProvider(null);
      }
    },
    [searchParams],
  );

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
    <AuthCard>
      <S.Section aria-label="login-page">
        <S.Header>
          <S.Title>로그인</S.Title>
          <S.Description>
            보호된 서비스를 이용하려면 소셜 계정을 연결해 주세요. 연결 후에는
            다시 돌아오지 않아도 자동으로 로그인됩니다.
          </S.Description>
        </S.Header>
        {expired && (
          <S.ExpiredNotice role="alert" data-testid="toast">
            세션이 만료되었어요. 다시 로그인해 주세요.
          </S.ExpiredNotice>
        )}
        <S.ButtonStack>
          <AuthProviderButton
            provider="google"
            loading={loadingProvider === 'google'}
            onClick={() => {
              void startOAuth('google');
            }}
          />
          <AuthProviderButton
            provider="kakao"
            loading={loadingProvider === 'kakao'}
            onClick={() => {
              void startOAuth('kakao');
            }}
          />
        </S.ButtonStack>
        <S.Divider>또는</S.Divider>
        <S.DummyButtonWrapper>
          <Button onClick={handleLogin} ariaLabel="login-submit">
            더미 계정으로 로그인
          </Button>
          <S.Description>
            테스트 환경에서는 더미 계정을 사용해 인증 흐름을 검증할 수 있어요.
          </S.Description>
        </S.DummyButtonWrapper>
      </S.Section>
    </AuthCard>
  );
}
