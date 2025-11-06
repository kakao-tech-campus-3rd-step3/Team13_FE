/**
 * FCM 관련 타입 정의
 */

/**
 * FCM 토큰
 */
export type FCMToken = string;

/**
 * 알림 권한 상태
 */
export type NotificationPermissionStatus = 'default' | 'granted' | 'denied';

/**
 * FCM 메시지 페이로드
 */
export interface FCMPayload {
  notification?: {
    title?: string;
    body?: string;
    icon?: string;
    image?: string;
    badge?: string;
    tag?: string;
    data?: Record<string, string>;
  };
  data?: Record<string, string>;
}

/**
 * Service Worker 등록 상태
 */
export interface ServiceWorkerRegistrationState {
  isRegistered: boolean;
  registration: ServiceWorkerRegistration | null;
  error: Error | null;
}
