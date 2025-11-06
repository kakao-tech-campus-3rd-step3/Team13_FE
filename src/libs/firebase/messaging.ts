import {
  getMessaging,
  getToken,
  onMessage,
  type Messaging,
} from 'firebase/messaging';

import { getFirebaseApp, VAPID_KEY } from './config';
import type { FCMPayload, FCMToken } from './types';

/**
 * Firebase Messaging 인스턴스
 */
let messagingInstance: Messaging | null = null;

/**
 * Firebase Messaging 인스턴스 가져오기
 * Service Worker가 지원되지 않는 환경에서는 null 반환
 */
export const getMessagingInstance = (): Messaging | null => {
  if (!messagingInstance && 'serviceWorker' in navigator) {
    try {
      const app = getFirebaseApp();
      messagingInstance = getMessaging(app);
    } catch (error) {
      console.error('Failed to initialize Firebase Messaging:', error);
      return null;
    }
  }
  return messagingInstance;
};

/**
 * 브라우저 알림 권한 요청
 * @returns 권한 상태 ('granted', 'denied', 'default')
 */
export const requestNotificationPermission =
  async (): Promise<NotificationPermission> => {
    if (!('Notification' in window)) {
      console.warn('This browser does not support notifications');
      return 'denied';
    }

    if (Notification.permission === 'granted') {
      return 'granted';
    }

    try {
      const permission = await Notification.requestPermission();
      return permission;
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return 'denied';
    }
  };

/**
 * FCM 토큰 발급
 * Service Worker 등록 후 호출해야 함
 * @returns FCM 토큰 또는 null
 */
export const getFCMToken = async (): Promise<FCMToken | null> => {
  try {
    const messaging = getMessagingInstance();
    if (!messaging) {
      console.warn('Messaging instance not available');
      return null;
    }

    if (!VAPID_KEY) {
      console.error('VAPID key is not configured');
      return null;
    }

    // 알림 권한 확인
    const permission = await requestNotificationPermission();
    if (permission !== 'granted') {
      console.warn('Notification permission not granted');
      return null;
    }

    // Service Worker 등록 확인
    const registration = await navigator.serviceWorker.ready;
    if (!registration) {
      console.warn('Service Worker not registered');
      return null;
    }

    // FCM 토큰 발급
    const token = await getToken(messaging, {
      vapidKey: VAPID_KEY,
      serviceWorkerRegistration: registration,
    });

    if (token) {
      console.log('FCM Token obtained:', token);
      return token;
    } else {
      console.warn('No FCM token available');
      return null;
    }
  } catch (error) {
    console.error('Error getting FCM token:', error);
    return null;
  }
};

/**
 * 포그라운드 메시지 리스너 등록
 * 앱이 활성화된 상태에서 받은 메시지 처리
 * @param callback 메시지 수신 시 호출될 콜백
 * @returns unsubscribe 함수
 */
export const onForegroundMessage = (
  callback: (payload: FCMPayload) => void,
): (() => void) => {
  const messaging = getMessagingInstance();
  if (!messaging) {
    console.warn('Messaging instance not available');
    return () => {};
  }

  return onMessage(messaging, (payload) => {
    console.log('Foreground message received:', payload);
    callback(payload as FCMPayload);
  });
};

/**
 * Service Worker 등록
 * @returns Service Worker 등록 객체
 */
export const registerServiceWorker =
  async (): Promise<ServiceWorkerRegistration | null> => {
    if (!('serviceWorker' in navigator)) {
      console.warn('Service Worker is not supported in this browser');
      return null;
    }

    try {
      const registration = await navigator.serviceWorker.register(
        '/firebase-messaging-sw.js',
        {
          scope: '/',
        },
      );
      console.log('Service Worker registered successfully:', registration);
      return registration;
    } catch (error) {
      console.error('Service Worker registration failed:', error);
      return null;
    }
  };
