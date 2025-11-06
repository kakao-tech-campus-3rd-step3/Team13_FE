import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { queryClient } from '@/api/core/queryClient';
import { updateMyProfileImageUrl } from '@/api/profile';
import RouteSkeleton from '@/components/RouteSkeleton';
import OriginTitleBar from '@/components/titleBar/originTitleBar';
import { PROFILE_ME_KEY } from '@/features/profile/keys';
import ImageUploader from '@/features/upload/components/ImageUploader';
import {
  useCurrentUser,
  useEmailVerified,
  useHasHydrated,
  useSessionExpired,
  useActions,
} from '@/stores/appStore';
import {
  mapSlotToPeriod,
  usePrefActions,
  useSelectedSports,
  useSelectedTimeSlots,
} from '@/stores/preferencesStore';
import { useSessionActions, useSessionHydrated } from '@/stores/sessionStore';

import * as S from './MyPage.styled';

export default function MyPage() {
  const appHydrated = useHasHydrated();
  const sessionHydrated = useSessionHydrated();
  const user = useCurrentUser();
  const emailVerified = useEmailVerified();
  const sessionExpired = useSessionExpired();
  const { logout, setUser } = useActions();
  const { clearSession } = useSessionActions();
  const navigate = useNavigate();
  const sports = useSelectedSports();
  const timeSlots = useSelectedTimeSlots();
  const { resetAll } = usePrefActions();
  const preferredPeriods = Array.from(
    new Set(timeSlots.map((slot) => mapSlotToPeriod(slot))),
  );

  const handleBack = useCallback(() => {
    if (window.history.length > 1) {
      void navigate(-1);
      return;
    }
    void navigate('/onboarding/times', { replace: true });
  }, [navigate]);

  const handleLogout = useCallback(() => {
    logout();
    clearSession();
    resetAll();
    void navigate('/login', { replace: true });
  }, [clearSession, logout, navigate, resetAll]);

  const handleEditProfile = useCallback(() => {
    void navigate('/my/profile/edit');
  }, [navigate]);

  const handleUploaded = useCallback(
    async (url: string) => {
      try {
        await updateMyProfileImageUrl(url);
        if (user) {
          setUser({ ...user, avatarUrl: url });
        }
        await queryClient.invalidateQueries({ queryKey: PROFILE_ME_KEY });
      } catch (error) {
        console.error('프로필 이미지 업데이트 실패', error);
      }
    },
    [setUser, user],
  );
  if (!appHydrated || !sessionHydrated) {
    return <RouteSkeleton />;
  }

  return (
    <S.Page aria-label="my-page">
      <S.TitleBarWrapper>
        <OriginTitleBar title="내 계정" onBack={handleBack} />
      </S.TitleBarWrapper>
      <S.ProfileSection>
        <S.Heading>내 계정</S.Heading>
        {user ? (
          <>
            <S.AvatarWrapper>
              <S.Avatar src={user.avatarUrl} alt={`${user.name} 아바타`} />
              <S.AvatarBadge aria-hidden="true" />
            </S.AvatarWrapper>
            <S.UserMeta>
              <S.UserName>{user.name}</S.UserName>
              <S.UserEmail>{user.email}</S.UserEmail>
            </S.UserMeta>
            <S.StatusList>
              <S.StatusItem>
                <S.StatusLabel>이메일 인증</S.StatusLabel>
                <S.StatusValue>
                  {emailVerified ? '완료' : '미완료'}
                </S.StatusValue>
              </S.StatusItem>
              <S.StatusItem>
                <S.StatusLabel>세션 상태</S.StatusLabel>
                <S.StatusValue>
                  {sessionExpired ? '만료됨' : '활성'}
                </S.StatusValue>
              </S.StatusItem>
              <S.StatusItem>
                <S.StatusLabel>선호 종목</S.StatusLabel>
                <S.StatusValue>
                  {sports.length > 0 ? `${sports.length}개` : '미선택'}
                </S.StatusValue>
              </S.StatusItem>
              <S.StatusItem>
                <S.StatusLabel>선호 시간대</S.StatusLabel>
                <S.StatusValue>
                  {preferredPeriods.length > 0
                    ? preferredPeriods.join(', ')
                    : '미선택'}
                </S.StatusValue>
              </S.StatusItem>
            </S.StatusList>
            <S.Actions>
              <S.EditButton
                type="button"
                onClick={handleEditProfile}
                aria-label="edit-profile"
              >
                프로필 수정
              </S.EditButton>
              <S.LogoutButton
                type="button"
                onClick={handleLogout}
                aria-label="logout"
              >
                로그아웃
              </S.LogoutButton>
            </S.Actions>
            <ImageUploader
              label="프로필 이미지 업로드"
              description="10MB 이하 · JPG/PNG/WEBP"
              onUploaded={(url) => {
                void handleUploaded(url);
              }}
            />
          </>
        ) : (
          <S.EmptyState>
            사용자 정보를 찾을 수 없어요. 다시 로그인해 주세요.
          </S.EmptyState>
        )}
      </S.ProfileSection>
    </S.Page>
  );
}
