import { Navigate, Outlet } from 'react-router-dom';

import { useAuthStore } from '@/stores/authStore';

/**
 * 보호된 라우트 컴포넌트
 * - 인증된 사용자만 접근 가능
 * - 미인증 시 로그인 페이지로 리다이렉트
 */
export function ProtectedRoute() {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    // 로그인 페이지로 리다이렉트
    return <Navigate to="/login" replace />;
  }

  // 인증된 경우 자식 라우트 렌더링
  return <Outlet />;
}

/**
 * 공개 라우트 컴포넌트
 * - 미인증 사용자만 접근 가능 (로그인, 회원가입 페이지)
 * - 이미 로그인된 경우 홈으로 리다이렉트
 */
export function PublicRoute() {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    // 이미 로그인된 경우 홈으로 리다이렉트
    return <Navigate to="/" replace />;
  }

  // 미인증 상태면 자식 라우트 렌더링
  return <Outlet />;
}
