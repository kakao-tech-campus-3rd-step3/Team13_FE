import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { registerFCMToken, unregisterFCMToken } from '@/api/fcm';
import RouteSkeleton from '@/components/RouteSkeleton';
import OriginTitleBar from '@/components/titleBar/originTitleBar';
import { useFCM } from '@/hooks/useFCM';
import {
  useCurrentUser,
  useEmailVerified,
  useHasHydrated,
  useSessionExpired,
  useActions,
} from '@/stores/appStore';
import { useFCMStore } from '@/stores/fcmStore';
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
  const { logout } = useActions();
  const { clearSession } = useSessionActions();
  const navigate = useNavigate();
  const sports = useSelectedSports();
  const timeSlots = useSelectedTimeSlots();
  const { resetAll } = usePrefActions();
  const preferredPeriods = Array.from(
    new Set(timeSlots.map((slot) => mapSlotToPeriod(slot))),
  );

  // FCM 관련 상태 및 로직
  const { fcmToken, isNotificationEnabled, requestPermissionAndToken } =
    useFCM();
  const { clearFCM } = useFCMStore();
  const [fcmLoading, setFcmLoading] = useState(false);
  const [fcmError, setFcmError] = useState<string | null>(null);

  // FCM 토글 핸들러
  const handleFCMToggle = useCallback(() => {
    setFcmError(null);
    setFcmLoading(true);

    const toggleFCM = async () => {
      try {
        if (isNotificationEnabled && fcmToken) {
          // 토글 OFF: 토큰 해제
          await unregisterFCMToken();
          clearFCM();
        } else {
          // 토글 ON: 토큰 발급 및 등록
          const token = await requestPermissionAndToken();
          if (token) {
            await registerFCMToken(token);
          } else {
            throw new Error('토큰 발급에 실패했습니다.');
          }
        }
      } catch (error) {
        console.error('FCM 토글 오류:', error);
        setFcmError(
          error instanceof Error
            ? error.message
            : '알림 설정 중 오류가 발생했습니다.',
        );
      } finally {
        setFcmLoading(false);
      }
    };

    void toggleFCM();
  }, [isNotificationEnabled, fcmToken, requestPermissionAndToken, clearFCM]);

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
            {/* FCM 알림 토글 */}
            <S.NotificationSection>
              <S.NotificationToggleCard>
                <S.NotificationInfo>
                  <S.NotificationTitle>
                    이 브라우저에서 알림받기
                  </S.NotificationTitle>
                  <S.NotificationDescription>
                    새로운 매치 소식을 실시간으로 받아보세요.
                  </S.NotificationDescription>
                </S.NotificationInfo>
                <S.ToggleSwitch
                  type="checkbox"
                  role="switch"
                  checked={isNotificationEnabled}
                  onChange={handleFCMToggle}
                  disabled={fcmLoading}
                  aria-label="browser-notification-toggle"
                />
              </S.NotificationToggleCard>
              {fcmError && <S.FCMErrorMessage>{fcmError}</S.FCMErrorMessage>}
            </S.NotificationSection>

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
