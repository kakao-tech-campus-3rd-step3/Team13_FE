import { useCallback, useEffect, useState } from 'react';

import {
  getFCMToken,
  onForegroundMessage,
  registerServiceWorker,
  requestNotificationPermission,
} from '@/libs/firebase/messaging';
import type { FCMPayload, FCMToken } from '@/libs/firebase/types';
import { useFCMStore } from '@/stores/fcmStore';

/**
 * FCM Hook 반환 타입
 */
interface UseFCMReturn {
  fcmToken: FCMToken | null;
  notificationPermission: NotificationPermission;
  isServiceWorkerRegistered: boolean;
  isNotificationEnabled: boolean;
  isLoading: boolean;
  error: Error | null;
  requestPermissionAndToken: () => Promise<FCMToken | null>;
  disableNotifications: () => void;
}

/**
 * FCM (Firebase Cloud Messaging) Hook
 * - FCM 토큰 관리
 * - 알림 권한 요청
 * - 포그라운드 메시지 수신
 * - Service Worker 등록
 *
 * @param onMessage 포그라운드 메시지 수신 시 호출될 콜백 (선택)
 */
export const useFCM = (
  onMessage?: (payload: FCMPayload) => void,
): UseFCMReturn => {
  const {
    fcmToken,
    notificationPermission,
    isServiceWorkerRegistered,
    isNotificationEnabled,
    setFCMToken,
    setNotificationPermission,
    setServiceWorkerRegistered,
    setNotificationEnabled,
  } = useFCMStore();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  /**
   * Service Worker 등록
   */
  useEffect(() => {
    const initServiceWorker = async () => {
      try {
        const registration = await registerServiceWorker();
        if (registration) {
          setServiceWorkerRegistered(true);
        }
      } catch (err) {
        console.error('Failed to register service worker:', err);
        setError(
          err instanceof Error
            ? err
            : new Error('Service Worker registration failed'),
        );
      }
    };

    if (!isServiceWorkerRegistered) {
      void initServiceWorker();
    }
  }, [isServiceWorkerRegistered, setServiceWorkerRegistered]);

  /**
   * 포그라운드 메시지 리스너 등록
   */
  useEffect(() => {
    if (!isNotificationEnabled || !onMessage) {
      return;
    }

    const unsubscribe = onForegroundMessage((payload) => {
      onMessage(payload);
    });

    return () => {
      unsubscribe();
    };
  }, [isNotificationEnabled, onMessage]);

  /**
   * 알림 권한 요청 및 FCM 토큰 발급
   */
  const requestPermissionAndToken =
    useCallback(async (): Promise<FCMToken | null> => {
      setIsLoading(true);
      setError(null);

      try {
        // 1. 알림 권한 요청
        const permission = await requestNotificationPermission();
        setNotificationPermission(permission);

        if (permission !== 'granted') {
          throw new Error('알림 권한이 거부되었습니다.');
        }

        // 2. Service Worker 등록 확인
        if (!isServiceWorkerRegistered) {
          const registration = await registerServiceWorker();
          if (!registration) {
            throw new Error('Service Worker 등록에 실패했습니다.');
          }
          setServiceWorkerRegistered(true);
        }

        // 3. FCM 토큰 발급
        const token = await getFCMToken();
        if (!token) {
          throw new Error('FCM 토큰 발급에 실패했습니다.');
        }

        setFCMToken(token);
        setNotificationEnabled(true);

        return token;
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : '알림 설정 중 오류가 발생했습니다.';
        const errorObj = new Error(errorMessage);
        setError(errorObj);
        console.error('FCM setup failed:', err);
        return null;
      } finally {
        setIsLoading(false);
      }
    }, [
      isServiceWorkerRegistered,
      setFCMToken,
      setNotificationPermission,
      setServiceWorkerRegistered,
      setNotificationEnabled,
    ]);

  /**
   * 알림 비활성화
   * 토큰은 유지하되 포그라운드 메시지 수신 중지
   */
  const disableNotifications = useCallback(() => {
    setNotificationEnabled(false);
  }, [setNotificationEnabled]);

  return {
    fcmToken,
    notificationPermission: notificationPermission as NotificationPermission,
    isServiceWorkerRegistered,
    isNotificationEnabled,
    isLoading,
    error,
    requestPermissionAndToken,
    disableNotifications,
  };
};
