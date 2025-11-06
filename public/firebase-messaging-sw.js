// Firebase Cloud Messaging Service Worker
// 백그라운드에서 푸시 알림을 수신하고 표시합니다.

// Firebase SDK 로드 (compat 버전 사용)
importScripts(
  'https://www.gstatic.com/firebasejs/9.22.1/firebase-app-compat.js',
);
importScripts(
  'https://www.gstatic.com/firebasejs/9.22.1/firebase-messaging-compat.js',
);

// Firebase 설정
// 주의: Service Worker는 환경 변수에 접근할 수 없으므로 하드코딩 필요
const firebaseConfig = {
  apiKey: 'AIzaSyC4p0hOze1KvqhrY7pfnBGLOPIXDnNNqGM',
  authDomain: 'pting-3331.firebaseapp.com',
  projectId: 'pting-3331',
  storageBucket: 'pting-3331.firebasestorage.app',
  messagingSenderId: '869322934329',
  appId: '1:869322934329:web:b5af705b8230f5903925e8',
};

// Firebase 앱 초기화
firebase.initializeApp(firebaseConfig);

// Messaging 인스턴스 생성
const messaging = firebase.messaging();

/**
 * 백그라운드 메시지 수신 핸들러
 * 앱이 백그라운드 또는 종료 상태일 때 메시지 수신
 */
messaging.onBackgroundMessage((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Background message received:',
    payload,
  );

  // 알림 제목과 옵션 설정
  const notificationTitle = payload.notification?.title || 'P-Ting 알림';
  const notificationOptions = {
    body: payload.notification?.body || '새로운 알림이 도착했습니다.',
    icon: payload.notification?.icon || '/vite.svg',
    badge: payload.notification?.badge || '/vite.svg',
    tag: payload.notification?.tag || 'default',
    data: payload.data || {},
  };

  // 알림 표시
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions,
  );
});

/**
 * 알림 클릭 이벤트 핸들러
 * 사용자가 알림을 클릭했을 때 동작 정의
 */
self.addEventListener('notificationclick', (event) => {
  console.log(
    '[firebase-messaging-sw.js] Notification clicked:',
    event.notification,
  );

  // 알림 닫기
  event.notification.close();

  // 클릭 시 앱 열기
  event.waitUntil(
    clients
      .matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        // 이미 열려있는 창이 있으면 포커스
        for (const client of clientList) {
          if (client.url === '/' && 'focus' in client) {
            return client.focus();
          }
        }
        // 열려있는 창이 없으면 새 창 열기
        if (clients.openWindow) {
          return clients.openWindow('/');
        }
      }),
  );
});
