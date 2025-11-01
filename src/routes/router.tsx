import { createBrowserRouter, Navigate } from 'react-router-dom';

import App from '@/App';
import GameListPage from '@/features/games/pages/GameListPage';
import SportsPage from '@/features/sports/pages/SportsPage';
import ComponentTestPage from '@/pages/ComponentTest/ComponentTestPage';
import StoreDemoPage from '@/pages/StoreDemo/StoreDemoPage';
import { ProtectedRoute, PublicRoute } from '@/routes/ProtectedRoute';

/**
 * 임시 페이지 컴포넌트들
 * TODO: 실제 페이지 컴포넌트로 교체 필요
 */
const HomePage = () => <App />; // 실제 App 컴포넌트 사용
const LoginPage = () => <div>로그인 페이지</div>;
const DashboardPage = () => <div>대시보드 페이지 (인증 필요)</div>;
const ProfilePage = () => <div>프로필 페이지 (인증 필요)</div>;
const NotFoundPage = () => <div>404 - 페이지를 찾을 수 없습니다</div>;

/**
 * 애플리케이션 라우터 설정
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/test" replace />, // 루트 접근 시 테스트 페이지로 리다이렉트
  },

  // 공개 라우트 (미인증 사용자용)
  {
    element: <PublicRoute />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
      // TODO: 회원가입, 비밀번호 찾기 등 추가
    ],
  },

  // 보호된 라우트 (인증된 사용자용)
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/home',
        element: <HomePage />,
      },
      {
        path: '/dashboard',
        element: <DashboardPage />,
      },
      {
        path: '/profile',
        element: <ProfilePage />,
      },
      // TODO: 매치 생성, 매치 상세, 검색 등 추가
    ],
  },

  // 개발/테스트용 컴포넌트 페이지 (인증 불필요)
  {
    path: '/test',
    element: <ComponentTestPage />,
  },
  {
    path: '/test/sports',
    element: <SportsPage />,
  },
  {
    path: '/test/games',
    element: <GameListPage />,
  },
  {
    path: '/test/store',
    element: <StoreDemoPage />,
  },

  // 404 페이지
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
