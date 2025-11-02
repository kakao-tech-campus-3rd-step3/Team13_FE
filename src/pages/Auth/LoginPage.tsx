import { useCallback, useEffect, useMemo } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import Button from '@/components/button';
import RouteSkeleton from '@/components/RouteSkeleton';
import LoginTitleBar from '@/components/titleBar/loginTitleBar';
import { getOAuthUrl, type OAuthProvider } from '@/features/auth/api/authApi';
import { AuthCard } from '@/features/auth/components/AuthCard';
import { AuthProviderButton } from '@/features/auth/components/AuthProviderButton';
import KakaoButton, {
  type KakaoStatusUpdate,
} from '@/features/auth/components/KakaoButton';
import { useOAuthFeedback } from '@/features/auth/hooks/useOAuthFeedBack';
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
const DUMMY_ACCESS_TOKEN =
  'eyJhbGciOiJIUzUxMiJ9.eyJtZW1iZXJJZCI6MX0.xJ4MVDKX19ri1pP4HggrLMNyPwC2SVpH7JuifBH8YpR7c3aW4ytlDivm8RFLxrrAiK00KXBOebVTMWSri8HNUg';

function useLoginFlow() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { setUser, clearSessionExpired } = useActions();
  const { setSession } = useSessionActions();

  const redirectPath = useMemo(() => {
    return resolveFrom(location.state);
  }, [location.state]);

  const redirectParam = searchParams.get('redirect');
  const redirectTarget = redirectParam ?? redirectPath;

  const expired = searchParams.get('expired') === '1';

  const handleLogin = useCallback(() => {
    setUser(DUMMY_USER);
    clearSessionExpired();
    setSession(DUMMY_ACCESS_TOKEN);
    void navigate(redirectTarget, { replace: true });
  }, [clearSessionExpired, navigate, redirectTarget, setSession, setUser]);
  return { expired, handleLogin, redirectTarget };
}

export default function LoginPage() {
  const hydrated = useHasHydrated();
  const sessionHydrated = useSessionHydrated();
  const isLoggedIn = useIsLoggedIn();
  const hasSession = useHasSession();
  const navigate = useNavigate();
  const { expired, handleLogin, redirectTarget } = useLoginFlow();
  const { feedback, isProcessing, setLoading, setSuccess, setError } =
    useOAuthFeedback();

  const startOAuth = useCallback(
    async (provider: OAuthProvider) => {
      const providerLabel = provider === 'google' ? 'Google' : '카카오';
      const retry = () => {
        void startOAuth(provider);
      };

      setLoading(
        provider,
        `${providerLabel} 계정으로 이동을 준비하고 있어요…`,
        retry,
      );
      try {
        const url = await getOAuthUrl(provider, redirectTarget);
        setSuccess(
          provider,
          `${providerLabel} 계정 페이지로 이동 중이에요. 새 창이 열리면 계속 진행해 주세요.`,
        );
        redirectTo(url);
      } catch {
        setError(
          provider,
          `${providerLabel} 로그인에 실패했어요. 네트워크 상태를 확인한 뒤 다시 시도해 주세요.`,
          retry,
        );
        notify.error('로그인을 시작하지 못했어요. 잠시 후 다시 시도해주세요.');
      }
    },
    [redirectTarget, setError, setLoading, setSuccess],
  );

  const handleKakaoStatus = useCallback(
    (update: KakaoStatusUpdate) => {
      if (update.status === 'loading') {
        setLoading(update.provider, update.message, update.retry);
        return;
      }

      if (update.status === 'success') {
        setSuccess(update.provider, update.message);
        return;
      }

      if (update.status === 'error') {
        setError(update.provider, update.message, update.retry);
      }
    },
    [setError, setLoading, setSuccess],
  );

  const retryLogin = feedback.retry;
  const handleRetry = useCallback(() => {
    if (!retryLogin) return;
    retryLogin();
  }, [retryLogin]);

  useEffect(() => {
    if (hydrated && sessionHydrated && (isLoggedIn || hasSession)) {
      void navigate(redirectTarget, { replace: true });
    }
  }, [
    hasSession,
    hydrated,
    isLoggedIn,
    navigate,
    redirectTarget,
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
          <S.TitleBarWrapper>
            <LoginTitleBar />
          </S.TitleBarWrapper>
          <S.HeaderContent>
            <S.Title>로그인</S.Title>
            <S.Description>언제나 운동하고 싶을 떄, P-ting</S.Description>
          </S.HeaderContent>
        </S.Header>
        {expired && (
          <S.ExpiredNotice role="alert" data-testid="toast">
            세션이 만료되었어요. 다시 로그인해 주세요.
          </S.ExpiredNotice>
        )}
        <S.StatusRegion aria-live="polite">
          {feedback.status === 'loading' && (
            <S.StatusMessage role="status" data-testid="oauth-status">
              <S.StatusContent>
                <S.StatusTitle>로그인 준비 중</S.StatusTitle>
                <S.StatusDescription>{feedback.message}</S.StatusDescription>
              </S.StatusContent>
            </S.StatusMessage>
          )}
          {feedback.status === 'success' && (
            <S.StatusMessage role="status" data-testid="oauth-status">
              <S.StatusContent>
                <S.StatusTitle>연결 중이에요</S.StatusTitle>
                <S.StatusDescription>{feedback.message}</S.StatusDescription>
              </S.StatusContent>
            </S.StatusMessage>
          )}
          {feedback.status === 'error' && (
            <S.ErrorMessage role="alert" data-testid="oauth-error">
              <S.StatusContent>
                <S.StatusTitle>로그인에 실패했어요</S.StatusTitle>
                <S.StatusDescription>{feedback.message}</S.StatusDescription>
              </S.StatusContent>
              {feedback.retry && (
                <S.RetryButton type="button" onClick={handleRetry}>
                  다시 시도
                </S.RetryButton>
              )}
            </S.ErrorMessage>
          )}
        </S.StatusRegion>
        <S.ButtonStack>
          <AuthProviderButton
            provider="google"
            loading={
              feedback.status === 'loading' && feedback.provider === 'google'
            }
            onClick={() => {
              void startOAuth('google');
            }}
            disabled={isProcessing && feedback.provider !== 'google'}
          />
          <KakaoButton
            disabled={isProcessing && feedback.provider !== 'kakao'}
            onStatusChange={handleKakaoStatus}
          />
        </S.ButtonStack>
        <S.Divider>또는</S.Divider>
        <S.DummyButtonWrapper>
          <Button onClick={handleLogin} ariaLabel="login-submit">
            더미 계정으로 로그인
          </Button>
          <S.Description>개발자용 테스트 환경</S.Description>
        </S.DummyButtonWrapper>
      </S.Section>
    </AuthCard>
  );
}
