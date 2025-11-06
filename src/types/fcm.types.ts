/**
 * FCM (Firebase Cloud Messaging) 관련 타입 정의
 *
 * 이 파일은 FCM 기능 전반에서 사용되는 타입들을 중앙 관리합니다.
 * 기본 Firebase 타입은 libs/firebase/types.ts에 정의되어 있습니다.
 */

import type {
  FCMToken,
  FCMPayload,
  NotificationPermissionStatus,
} from '@/libs/firebase/types';

/**
 * FCM Store 상태 타입
 */
export interface FCMState {
  fcmToken: FCMToken | null;
  notificationPermission: NotificationPermissionStatus;
  isServiceWorkerRegistered: boolean;
  isNotificationEnabled: boolean;
  setFCMToken: (token: FCMToken | null) => void;
  setNotificationPermission: (permission: NotificationPermissionStatus) => void;
  setServiceWorkerRegistered: (registered: boolean) => void;
  setNotificationEnabled: (enabled: boolean) => void;
  clearFCM: () => void;
}

/**
 * FCM API 요청/응답 타입
 */
export interface FcmTokenRequest {
  token: string;
}

export interface FcmTokenResponse {
  success: boolean;
  message?: string;
}

/**
 * FCM Hook 반환 타입
 */
export interface UseFCMReturn {
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
 * 포그라운드 메시지 핸들러 타입
 */
export type ForegroundMessageHandler = (payload: FCMPayload) => void;

/**
 * FCM 에러 타입
 */
export class FCMError extends Error {
  code?: string;

  constructor(message: string, code?: string) {
    super(message);
    this.name = 'FCMError';
    this.code = code;
  }
}

/**
 * FCM 초기화 옵션
 */
export interface FCMInitOptions {
  autoRegisterServiceWorker?: boolean;
  onForegroundMessage?: ForegroundMessageHandler;
}

// Re-export Firebase types for convenience
export type { FCMToken, FCMPayload, NotificationPermissionStatus };
