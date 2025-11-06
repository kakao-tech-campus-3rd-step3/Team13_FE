import { useCallback, useState } from 'react';

import { registerFCMToken, unregisterFCMToken } from '@/api/fcm';
import { useFCM } from '@/hooks/useFCM';
import { useFCMStore } from '@/stores/fcmStore';

import * as S from './FCMTestPage.styled';

export default function FCMTestPage() {
  const {
    fcmToken,
    notificationPermission,
    isServiceWorkerRegistered,
    isNotificationEnabled,
    isLoading,
    error,
    requestPermissionAndToken,
    disableNotifications,
  } = useFCM();

  const { clearFCM } = useFCMStore();
  const [apiStatus, setApiStatus] = useState<string>('');

  // FCM 토큰 복사
  const handleCopyToken = useCallback(() => {
    if (!fcmToken) return;

    void navigator.clipboard.writeText(fcmToken).then(
      () => {
        alert('FCM 토큰이 클립보드에 복사되었습니다!');
      },
      (err) => {
        console.error('Failed to copy token:', err);
        alert('토큰 복사에 실패했습니다.');
      },
    );
  }, [fcmToken]);

  // 알림 권한 요청 및 토큰 발급
  const handleRequestPermission = useCallback(() => {
    void requestPermissionAndToken().then((token) => {
      if (token) {
        setApiStatus('토큰 발급 성공!');
      } else {
        setApiStatus('토큰 발급 실패. 브라우저 콘솔을 확인하세요.');
      }
    });
  }, [requestPermissionAndToken]);

  // 백엔드에 토큰 등록
  const handleRegisterToken = useCallback(() => {
    if (!fcmToken) {
      setApiStatus('토큰이 없습니다. 먼저 알림 권한을 요청하세요.');
      return;
    }

    setApiStatus('토큰 등록 중...');
    void registerFCMToken(fcmToken).then(
      () => {
        setApiStatus('✅ 백엔드에 토큰 등록 성공!');
      },
      (err) => {
        console.error('Failed to register token:', err);
        setApiStatus('❌ 백엔드 토큰 등록 실패. 백엔드 API를 확인하세요.');
      },
    );
  }, [fcmToken]);

  // 백엔드에서 토큰 해제
  const handleUnregisterToken = useCallback(() => {
    setApiStatus('토큰 해제 중...');
    void unregisterFCMToken().then(
      () => {
        clearFCM();
        setApiStatus('✅ 백엔드에서 토큰 해제 및 로컬 상태 초기화 완료!');
      },
      (err) => {
        console.error('Failed to unregister token:', err);
        setApiStatus('❌ 백엔드 토큰 해제 실패. 백엔드 API를 확인하세요.');
      },
    );
  }, [clearFCM]);

  // 알림 비활성화 (토큰은 유지)
  const handleDisableNotifications = useCallback(() => {
    disableNotifications();
    setApiStatus('포그라운드 알림이 비활성화되었습니다.');
  }, [disableNotifications]);

  // 권한 상태 뱃지
  const getPermissionBadge = () => {
    switch (notificationPermission) {
      case 'granted':
        return <S.StatusBadge status="success">허용됨</S.StatusBadge>;
      case 'denied':
        return <S.StatusBadge status="error">거부됨</S.StatusBadge>;
      default:
        return <S.StatusBadge status="warning">미요청</S.StatusBadge>;
    }
  };

  return (
    <S.Page>
      <S.Container>
        <S.Title>🔔 FCM 푸시 알림 테스트</S.Title>
        <S.Description>
          Firebase Cloud Messaging 기능을 테스트할 수 있습니다.
        </S.Description>

        {/* 현재 상태 */}
        <S.Section>
          <S.SectionTitle>📊 현재 상태</S.SectionTitle>
          <S.StatusList>
            <S.StatusItem>
              <S.StatusLabel>알림 권한</S.StatusLabel>
              {getPermissionBadge()}
            </S.StatusItem>
            <S.StatusItem>
              <S.StatusLabel>Service Worker</S.StatusLabel>
              <S.StatusBadge
                status={isServiceWorkerRegistered ? 'success' : 'error'}
              >
                {isServiceWorkerRegistered ? '등록됨' : '미등록'}
              </S.StatusBadge>
            </S.StatusItem>
            <S.StatusItem>
              <S.StatusLabel>알림 활성화</S.StatusLabel>
              <S.StatusBadge
                status={isNotificationEnabled ? 'success' : 'warning'}
              >
                {isNotificationEnabled ? 'ON' : 'OFF'}
              </S.StatusBadge>
            </S.StatusItem>
            <S.StatusItem>
              <S.StatusLabel>로딩 상태</S.StatusLabel>
              <S.StatusValue>
                {isLoading ? '⏳ 처리 중...' : '✅ 준비됨'}
              </S.StatusValue>
            </S.StatusItem>
          </S.StatusList>
        </S.Section>

        {/* FCM 토큰 */}
        <S.Section>
          <S.SectionTitle>🔑 FCM 토큰</S.SectionTitle>
          {fcmToken ? (
            <S.TokenBox>
              <S.CopyButton onClick={handleCopyToken}>복사</S.CopyButton>
              {fcmToken}
            </S.TokenBox>
          ) : (
            <S.StatusValue>토큰이 발급되지 않았습니다.</S.StatusValue>
          )}
        </S.Section>

        {/* 에러 메시지 */}
        {error && <S.ErrorMessage>⚠️ 에러: {error.message}</S.ErrorMessage>}

        {/* API 상태 */}
        {apiStatus && (
          <S.Section>
            <S.SectionTitle>📡 API 상태</S.SectionTitle>
            <S.StatusValue>{apiStatus}</S.StatusValue>
          </S.Section>
        )}

        {/* 액션 버튼 */}
        <S.ButtonGroup>
          <S.Button
            variant="primary"
            onClick={handleRequestPermission}
            disabled={isLoading || notificationPermission === 'granted'}
          >
            {notificationPermission === 'granted'
              ? '✅ 알림 권한 허용됨'
              : '🔔 알림 권한 요청 및 토큰 발급'}
          </S.Button>

          <S.Button
            variant="secondary"
            onClick={handleRegisterToken}
            disabled={!fcmToken || isLoading}
          >
            📤 백엔드에 토큰 등록
          </S.Button>

          <S.Button
            variant="secondary"
            onClick={handleDisableNotifications}
            disabled={!isNotificationEnabled || isLoading}
          >
            🔕 포그라운드 알림 비활성화
          </S.Button>

          <S.Button
            variant="danger"
            onClick={handleUnregisterToken}
            disabled={!fcmToken || isLoading}
          >
            🗑️ 토큰 해제 및 초기화
          </S.Button>
        </S.ButtonGroup>

        <S.BackLink href="/">← 홈으로 돌아가기</S.BackLink>
      </S.Container>
    </S.Page>
  );
}
