import { createBrowserRouter } from 'react-router-dom';

import GameListPage from '@/features/games/pages/GameListPage';
import SportsPage from '@/features/sports/pages/SportsPage';
import KakaoCallbackPage from '@/pages/Auth/KakaoCallbackPage';
import LoginPage from '@/pages/Auth/LoginPage';
import ComponentTestPage from '@/pages/ComponentTest/ComponentTestPage';
import EmailCertPage from '@/pages/EmailCert/EmailCertPage';
import ErrorPage from '@/pages/Error/ErrorPage';
import HomePage from '@/pages/Home';
import MyPage from '@/pages/My/MyPage';
import ProfileEditPage from '@/pages/My/ProfileEditPage';
import SportSelectPage from '@/pages/Onboarding/SportSelectPage';
import TimeSelectPage from '@/pages/Onboarding/TimeSelectPage';
import StoreDemoPage from '@/pages/StoreDemo/StoreDemoPage';
import { ProtectedRoute, PublicRoute, VerifiedRoute } from '@/routes/Guards';
import OnboardingGuard from '@/routes/OnboardingGuard';

/**
 * 임시 페이지 컴포넌트들
 * TODO: 실제 페이지 컴포넌트로 교체 필요

const HomePage = () => <App />; // 실제 App 컴포넌트 사용
const LoginPage = () => <div>로그인 페이지</div>;
const DashboardPage = () => <div>대시보드 페이지 (인증 필요)</div>;
const ProfilePage = () => <div>프로필 페이지 (인증 필요)</div>;
const NotFoundPage = () => <div>404 - 페이지를 찾을 수 없습니다</div>;
*/

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />, // 루트 접근 시 홈페이지 표시
  },

  // 공개 라우트 (미인증 사용자용)
  {
    element: <PublicRoute />,
    children: [
      {
        path: '/home',
        element: <HomePage />, // 루트 접근 시 홈페이지 표시
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/auth/kakao/callback',
        element: <KakaoCallbackPage />,
      },
      // TODO: 회원가입, 비밀번호 찾기 등 추가
    ],
  },

  // 보호된 라우트 (인증된 사용자용)
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/email-cert',
        element: <EmailCertPage />,
      },

      {
        element: <VerifiedRoute />,
        children: [
          { path: '/onboarding/sports', element: <SportSelectPage /> },
          { path: '/onboarding/times', element: <TimeSelectPage /> },
          { path: '/home', element: <HomePage /> },
          {
            element: <OnboardingGuard />,
            children: [
              { path: '/my', element: <MyPage /> },
              { path: '/my/profile/edit', element: <ProfileEditPage /> },
            ],
          },
          // TODO: 매치 생성, 매치 상세, 검색 등 추가
        ],
      },
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
    element: <ErrorPage />,
  },
]);
