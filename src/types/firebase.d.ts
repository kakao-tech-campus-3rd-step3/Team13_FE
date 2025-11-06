declare module 'firebase/app' {
  export interface FirebaseApp {
    readonly config?: Record<string, unknown>;
  }

  export function initializeApp(config: Record<string, unknown>): FirebaseApp;
}

declare module 'firebase/messaging' {
  import type { FirebaseApp } from 'firebase/app';

  export interface Messaging {
    readonly app?: FirebaseApp | null;
  }

  export interface MessagePayload {
    notification?: {
      title?: string;
      body?: string;
      image?: string;
    };
    data?: Record<string, string>;
  }

  export function getMessaging(app?: FirebaseApp): Messaging;

  export function getToken(
    messaging: Messaging,
    options?: {
      vapidKey?: string;
      serviceWorkerRegistration?: ServiceWorkerRegistration;
    },
  ): Promise<string | null>;

  export function onMessage(
    messaging: Messaging,
    nextOrObserver: (payload: MessagePayload) => void,
  ): () => void;

  export function isSupported(): Promise<boolean>;
}
