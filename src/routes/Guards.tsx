import { Navigate, Outlet, useLocation } from 'react-router-dom';

import RouteSkeleton from '@/components/RouteSkeleton';
import { resolveFrom } from '@/routes/resolveFrom';
import {
  useActions,
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

  if (!appHydrated || !sessionHydrated) return <RouteSkeleton />;

  if (isLoggedIn || hasSession) {
    const from = resolveFrom(location.state);
    return <Navigate to={from} replace />;
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

  if (!appHydrated || !sessionHydrated) return <RouteSkeleton />;
  if ((!isLoggedIn && !hasSession) || sessionExpired) {
    if (hasSession) {
      clearSession();
    }
    if (isLoggedIn) {
      logout();
    }
    const suffix = sessionExpired ? '?expired=1' : '';
    return (
      <Navigate to={`/login${suffix}`} replace state={{ from: location }} />
    );
  }

  // 인증된 경우 자식 라우트 렌더링
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
  const location = useLocation();

  if (!appHydrated || !sessionHydrated) return <RouteSkeleton />;

  if (!isLoggedIn && !hasSession) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (!verified) {
    return <Navigate to="/email-cert" replace state={{ from: location }} />;
  }
  return <Outlet />;
}
