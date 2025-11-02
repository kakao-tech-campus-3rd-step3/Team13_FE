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
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

export {};
