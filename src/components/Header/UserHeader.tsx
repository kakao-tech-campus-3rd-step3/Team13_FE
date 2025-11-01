import React from 'react';

import {
  useActions,
  useCurrentUser,
  useHasHydrated,
  useIsLoggedIn,
} from '@/stores/appStore';

import {
  ActionArea,
  Avatar,
  HeaderContainer,
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
}: {
  name: string;
  email: string;
  avatarUrl: string;
  onLogout: () => void;
}) {
  return (
    <HeaderContainer aria-label="user-header">
      <Avatar src={avatarUrl} alt={name} />
      <UserMeta>
        <UserName>{name}</UserName>
        <UserEmail>{email}</UserEmail>
      </UserMeta>
      <ActionArea>
        <PrimaryButton type="button" onClick={onLogout} aria-label="logout">
          로그아웃
        </PrimaryButton>
      </ActionArea>
    </HeaderContainer>
  );
}

function LoggedOutHeader({ onLogin }: { onLogin: () => void }) {
  return (
    <HeaderContainer aria-label="user-header">
      <PlaceholderAvatar aria-hidden>G</PlaceholderAvatar>
      <UserMeta>
        <UserName>로그인이 필요합니다</UserName>
        <PlaceholderText>
          개인화된 추천을 확인하려면 로그인해 주세요.
        </PlaceholderText>
      </UserMeta>
      <ActionArea>
        <PrimaryButton type="button" onClick={onLogin} aria-label="login">
          (더미) 로그인
        </PrimaryButton>
      </ActionArea>
    </HeaderContainer>
  );
}

export default function UserHeader() {
  const hasHydrated = useHasHydrated();
  const user = useCurrentUser();
  const isLoggedIn = useIsLoggedIn();
  const { setUser, logout } = useActions();

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
      />
    );
  }

  return <LoggedOutHeader onLogin={() => setUser(DUMMY_USER)} />;
}
