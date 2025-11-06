import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type {
  FCMToken,
  NotificationPermissionStatus,
} from '@/libs/firebase/types';

/**
 * FCM 상태 관리 인터페이스
 */
interface FCMState {
  // 상태
  fcmToken: FCMToken | null;
  notificationPermission: NotificationPermissionStatus;
  isServiceWorkerRegistered: boolean;
  isNotificationEnabled: boolean;

  // 액션
  setFCMToken: (token: FCMToken | null) => void;
  setNotificationPermission: (permission: NotificationPermissionStatus) => void;
  setServiceWorkerRegistered: (registered: boolean) => void;
  setNotificationEnabled: (enabled: boolean) => void;
  clearFCM: () => void;
}

/**
 * FCM 상태 관리 스토어
 * - localStorage에 자동 저장 (persist 미들웨어)
 * - FCM 토큰, 알림 권한, Service Worker 등록 상태 관리
 */
export const useFCMStore = create<FCMState>()(
  persist(
    (set) => ({
      // 초기 상태
      fcmToken: null,
      notificationPermission: 'default',
      isServiceWorkerRegistered: false,
      isNotificationEnabled: false,

      // FCM 토큰 설정
      setFCMToken: (token) => {
        set({ fcmToken: token });
      },

      // 알림 권한 설정
      setNotificationPermission: (permission) => {
        set({ notificationPermission: permission });
      },

      // Service Worker 등록 상태 설정
      setServiceWorkerRegistered: (registered) => {
        set({ isServiceWorkerRegistered: registered });
      },

      // 알림 활성화 상태 설정
      setNotificationEnabled: (enabled) => {
        set({ isNotificationEnabled: enabled });
      },

      // FCM 상태 초기화 (로그아웃 시)
      clearFCM: () => {
        set({
          fcmToken: null,
          notificationPermission: 'default',
          isServiceWorkerRegistered: false,
          isNotificationEnabled: false,
        });
      },
    }),
    {
      name: 'fcm-storage', // localStorage 키 이름
      partialize: (state) => ({
        // localStorage에 저장할 항목만 선택
        fcmToken: state.fcmToken,
        notificationPermission: state.notificationPermission,
        isServiceWorkerRegistered: state.isServiceWorkerRegistered,
        isNotificationEnabled: state.isNotificationEnabled,
      }),
    },
  ),
);
