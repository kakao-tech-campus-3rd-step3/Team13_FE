import { useMemo, type ReactNode } from 'react';
import { useInRouterContext, useLocation, useNavigate } from 'react-router-dom';

import {
  useActions,
  useCurrentUser,
  useEmailVerified,
  useHasHydrated,
  useIsLoggedIn,
} from '@/stores/appStore';
import {
  useOnboardingComplete,
  usePrefHydrated,
} from '@/stores/preferencesStore';

import {
  ActionArea,
  Avatar,
  Controls,
  HeaderContainer,
  NavButton,
  NavItem,
  NavList,
  Navigation,
  PlaceholderAvatar,
  PlaceholderText,
  PrimaryButton,
  SkeletonAvatar,
  SkeletonMeta,
  SkeletonSub,
  SkeletonTitle,
  UserEmail,
  UserMeta,
  UserName,
} from './UserHeader.styled';

const DUMMY_USER = {
  id: 101,
  name: '김대영',
  email: 'kimdy@pusan.ac.kr',
  avatarUrl:
    'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=120&auto=format&fit=facearea&facepad=2&h=120',
};

function HydrationSkeleton() {
  return (
    <HeaderContainer aria-label="user-header">
      <SkeletonAvatar />
      <SkeletonMeta>
        <SkeletonTitle />
        <SkeletonSub />
      </SkeletonMeta>
    </HeaderContainer>
  );
}

function LoggedInHeader({
  name,
  email,
  avatarUrl,
  onLogout,
  navigation,
}: {
  name: string;
  email: string;
  avatarUrl: string;
  onLogout: () => void;
  navigation: ReactNode;
}) {
  return (
    <HeaderContainer aria-label="user-header">
      <Avatar src={avatarUrl} alt={name} />
      <UserMeta>
        <UserName>{name}</UserName>
        <UserEmail>{email}</UserEmail>
      </UserMeta>
      <Controls>
        {navigation}
        <ActionArea>
          <PrimaryButton type="button" onClick={onLogout} aria-label="logout">
            로그아웃
          </PrimaryButton>
        </ActionArea>
      </Controls>
    </HeaderContainer>
  );
}

function LoggedOutHeader({
  onLogin,
  navigation,
}: {
  onLogin: () => void;
  navigation: ReactNode;
}) {
  return (
    <HeaderContainer aria-label="user-header">
      <PlaceholderAvatar aria-hidden>G</PlaceholderAvatar>
      <UserMeta>
        <UserName>로그인이 필요합니다</UserName>
        <PlaceholderText>
          개인화된 추천을 확인하려면 로그인해 주세요.
        </PlaceholderText>
      </UserMeta>
      <Controls>
        {navigation}
        <ActionArea>
          <PrimaryButton type="button" onClick={onLogin} aria-label="login">
            (더미) 로그인
          </PrimaryButton>
        </ActionArea>
      </Controls>
    </HeaderContainer>
  );
}

type HeaderNavItem = {
  label: string;
  path: string;
  disabled?: boolean;
};

type HeaderNavigationProps = {
  isLoggedIn: boolean;
  emailVerified: boolean;
  onboardingComplete: boolean;
  canCheckOnboarding: boolean;
};

function HeaderNavigationContent({
  isLoggedIn,
  emailVerified,
  onboardingComplete,
  canCheckOnboarding,
}: HeaderNavigationProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const items = useMemo<HeaderNavItem[]>(() => {
    if (!isLoggedIn) {
      return [{ label: '로그인', path: '/login' }];
    }

    const navItems: HeaderNavItem[] = [
      { label: '이메일 인증', path: '/email-cert', disabled: emailVerified },
      { label: '선호 종목', path: '/onboarding/sports' },
      { label: '선호 시간', path: '/onboarding/times' },
      {
        label: '마이 페이지',
        path: '/my',
        disabled: canCheckOnboarding ? !onboardingComplete : false,
      },
    ];

    return navItems;
  }, [canCheckOnboarding, emailVerified, isLoggedIn, onboardingComplete]);

  if (items.length === 0) {
    return null;
  }

  return (
    <Navigation aria-label="주요 페이지 이동">
      <NavList>
        {items.map((item) => {
          const isActive =
            location.pathname === item.path ||
            location.pathname.startsWith(`${item.path}/`);

          const handleNavigate = () => {
            if (item.disabled || isActive) {
              return;
            }
            void navigate(item.path);
          };

          return (
            <NavItem key={item.path}>
              <NavButton
                type="button"
                onClick={handleNavigate}
                data-active={isActive ? 'true' : undefined}
                aria-current={isActive ? 'page' : undefined}
                aria-disabled={item.disabled || undefined}
                disabled={item.disabled}
              >
                {item.label}
              </NavButton>
            </NavItem>
          );
        })}
      </NavList>
    </Navigation>
  );
}

function HeaderNavigation({
  isLoggedIn,
  emailVerified,
  onboardingComplete,
  canCheckOnboarding,
}: HeaderNavigationProps) {
  const inRouter = useInRouterContext();
  if (!inRouter) {
    return null;
  }

  return (
    <HeaderNavigationContent
      isLoggedIn={isLoggedIn}
      emailVerified={emailVerified}
      onboardingComplete={onboardingComplete}
      canCheckOnboarding={canCheckOnboarding}
    />
  );
}

export default function UserHeader() {
  const hasHydrated = useHasHydrated();
  const user = useCurrentUser();
  const isLoggedIn = useIsLoggedIn();
  const emailVerified = useEmailVerified();
  const { setUser, logout } = useActions();
  const onboardingComplete = useOnboardingComplete();
  const prefHydrated = usePrefHydrated();

  const navigation = (
    <HeaderNavigation
      isLoggedIn={isLoggedIn}
      emailVerified={emailVerified}
      onboardingComplete={onboardingComplete}
      canCheckOnboarding={prefHydrated}
    />
  );

  if (!hasHydrated) {
    return <HydrationSkeleton />;
  }

  if (isLoggedIn && user) {
    return (
      <LoggedInHeader
        name={user.name}
        email={user.email}
        avatarUrl={user.avatarUrl}
        onLogout={logout}
        navigation={navigation}
      />
    );
  }

  return (
    <LoggedOutHeader
      onLogin={() => setUser(DUMMY_USER)}
      navigation={navigation}
    />
  );
}
