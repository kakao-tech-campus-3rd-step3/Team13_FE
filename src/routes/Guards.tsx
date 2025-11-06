import { useEffect, useRef } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import RouteSkeleton from '@/components/RouteSkeleton';
import { resolveFrom } from '@/routes/resolveFrom';
import {
  useActions,
  useEmailCertBypassed,
  useEmailVerified,
  useHasHydrated,
  useIsLoggedIn,
  useSessionExpired,
} from '@/stores/appStore';
import {
  useHasSession,
  useSessionActions,
  useSessionHydrated,
} from '@/stores/sessionStore';
/** 로그인 상태면 접근 불가(예: /login) */

export function PublicRoute() {
  const appHydrated = useHasHydrated();
  const sessionHydrated = useSessionHydrated();
  const isLoggedIn = useIsLoggedIn();
  const hasSession = useHasSession();
  const location = useLocation();
  const currentPath = `${location.pathname}${location.search}${location.hash}`;
  const defaultRedirect = resolveFrom(null);
  const resolvedRedirect = resolveFrom(location.state, defaultRedirect);
  const redirectTarget =
    resolvedRedirect === currentPath ? defaultRedirect : resolvedRedirect;

  if (!appHydrated || !sessionHydrated) return <RouteSkeleton />;

  if (isLoggedIn || hasSession) {
    return <Navigate to={redirectTarget} replace />;
  }

  return <Outlet />;
}

/** 인증 필요. 세션 만료 시 /login?expired=1 로 유도 */
export function ProtectedRoute() {
  const appHydrated = useHasHydrated();
  const sessionHydrated = useSessionHydrated();
  const isLoggedIn = useIsLoggedIn();
  const hasSession = useHasSession();
  const sessionExpired = useSessionExpired();
  const location = useLocation();
  const { clearSession } = useSessionActions();
  const { logout } = useActions();
  const expiredRedirectRef = useRef(false);

  useEffect(() => {
    if (!sessionExpired) return;
    if (!appHydrated || !sessionHydrated) return;

    expiredRedirectRef.current = true;

    if (hasSession) {
      clearSession();
    }
    if (isLoggedIn) {
      logout();
    }
  }, [
    appHydrated,
    sessionHydrated,
    sessionExpired,
    hasSession,
    isLoggedIn,
    clearSession,
    logout,
  ]);

  if (!appHydrated || !sessionHydrated) return <RouteSkeleton />;
  if (sessionExpired) {
    return (
      <Navigate to="/login?expired=1" replace state={{ from: location }} />
    );
  }

  if (!isLoggedIn && !hasSession) {
    const target = expiredRedirectRef.current ? '/login?expired=1' : '/login';
    expiredRedirectRef.current = false;
    return <Navigate to={target} replace state={{ from: location }} />;
  }

  return <Outlet />;
}

/**
 * 공개 라우트 컴포넌트
 * - 미인증 사용자만 접근 가능 (로그인, 회원가입 페이지)
 * - 이미 로그인된 경우 홈으로 리다이렉트
 */
/** 이메일 검증 필요. 미검증이면 /email-cert 로 유도 */
export function VerifiedRoute() {
  const appHydrated = useHasHydrated();
  const sessionHydrated = useSessionHydrated();
  const isLoggedIn = useIsLoggedIn();
  const hasSession = useHasSession();
  const verified = useEmailVerified();
  const emailCertBypassed = useEmailCertBypassed();
  const location = useLocation();

  if (!appHydrated || !sessionHydrated) return <RouteSkeleton />;

  if (!isLoggedIn && !hasSession) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (!verified && !emailCertBypassed) {
    return <Navigate to="/email-cert" replace state={{ from: location }} />;
  }
  return <Outlet />;
}
