import type { FirebaseApp } from './firebase-app';

export type Messaging = {
  readonly app: FirebaseApp | null;
};

export type MessagePayload = {
  notification?: {
    title?: string;
    body?: string;
    image?: string;
  };
  data?: Record<string, string>;
};

const listeners = new Set<(payload: MessagePayload) => void>();

export function getMessaging(app?: FirebaseApp): Messaging {
  return { app: app ?? null };
}

export function getToken(
  _messaging: Messaging,
  _options?: {
    vapidKey?: string;
    serviceWorkerRegistration?: ServiceWorkerRegistration;
  },
): Promise<string | null> {
  void _messaging;
  void _options;
  return Promise.resolve(null);
}

export function onMessage(
  _messaging: Messaging,
  nextOrObserver: (payload: MessagePayload) => void,
): () => void {
  listeners.add(nextOrObserver);
  return () => {
    listeners.delete(nextOrObserver);
  };
}

export function isSupported(): Promise<boolean> {
  return Promise.resolve(false);
}

// 개발 환경용 유틸: 테스트 중 수동으로 메시지를 트리거할 수 있게 허용
export function __emitMockMessage(payload: MessagePayload) {
  listeners.forEach((listener) => {
    listener(payload);
  });
}
