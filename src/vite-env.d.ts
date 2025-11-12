declare global {
  interface ImportMetaEnv {
    /** 기본 Vite 환경 변수들 */
    readonly MODE: string;
    readonly DEV: boolean;
    readonly PROD: boolean;
    readonly SSR: boolean;

    /** 커스텀 환경 변수들 */
    readonly VITE_API_BASE_URL?: string;
    readonly VITE_USE_MSW?: string;
    readonly VITE_AFTER_LOGIN_DEFAULT?: string;
    readonly VITE_LOGIN_PATH?: string;
    readonly VITE_EMAIL_CERT_PATH?: string;

    /** Firebase 환경 변수들 */
    readonly VITE_FIREBASE_API_KEY?: string;
    readonly VITE_FIREBASE_AUTH_DOMAIN?: string;
    readonly VITE_FIREBASE_PROJECT_ID?: string;
    readonly VITE_FIREBASE_STORAGE_BUCKET?: string;
    readonly VITE_FIREBASE_MESSAGING_SENDER_ID?: string;
    readonly VITE_FIREBASE_APP_ID?: string;
    readonly VITE_FIREBASE_VAPID_KEY?: string;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

export {};
