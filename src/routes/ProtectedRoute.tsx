import { Navigate, Outlet, useLocation } from 'react-router-dom';

import RouteSkeleton from '@/components/RouteSkeleton';
import {
  useEmailVerified,
  useHasHydrated,
  useIsLoggedIn,
  useSessionExpired,
} from '@/stores/appStore';
/** 로그인 상태면 접근 불가(예: /login) */
export function PublicRoute() {
  const hydrated = useHasHydrated();
  const isLoggedIn = useIsLoggedIn();
  const location = useLocation();

  if (!hydrated) return <RouteSkeleton />;

  if (isLoggedIn) {
    const from =
      (location.state as { from?: { pathname?: string } })?.from?.pathname ??
      '/my';
    return <Navigate to={from} replace />;
  }

  return <Outlet />;
}

/** 인증 필요. 세션 만료 시 /login?expired=1 로 유도 */
export function ProtectedRoute() {
  const hydrated = useHasHydrated();
  const isLoggedIn = useIsLoggedIn();
  const sessionExpired = useSessionExpired();
  const location = useLocation();

  if (!hydrated) return <RouteSkeleton />;
  if (!isLoggedIn || sessionExpired) {
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
  const hydrated = useHasHydrated();
  const isLoggedIn = useIsLoggedIn();
  const verified = useEmailVerified();
  const location = useLocation();

  if (!hydrated) return <RouteSkeleton />;

  if (!isLoggedIn) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (!verified) {
    return <Navigate to="/email-cert" replace state={{ from: location }} />;
  }
  return <Outlet />;
}
