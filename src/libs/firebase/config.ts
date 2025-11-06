import { initializeApp, type FirebaseApp } from 'firebase/app';

/**
 * Firebase 설정 객체
 * 환경 변수에서 로드
 */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

/**
 * Firebase 앱 인스턴스
 */
let firebaseApp: FirebaseApp | null = null;

/**
 * Firebase 앱 초기화
 * 이미 초기화된 경우 기존 인스턴스 반환
 */
export const getFirebaseApp = (): FirebaseApp => {
  if (!firebaseApp) {
    firebaseApp = initializeApp(firebaseConfig);
  }
  return firebaseApp;
};

/**
 * VAPID 키 (Web Push 인증용)
 */
export const VAPID_KEY = import.meta.env.VITE_FIREBASE_VAPID_KEY;
