// 인프라/도메인 레이어에서 사용자 알림을 트리거하기 위한 포트입니다.
// 앱 엔트리(main.tsx 등)에서 실제 UI 알림 라이브러리(toast 등)와 연결.

type Notify = {
  error: (msg: string) => void;
  info: (msg: string) => void;
  success: (msg: string) => void;
  warning: (msg: string) => void;
};

let impl: Notify = {
  error: (message) => console.error(message),
  info: (message) => console.log(message),
  success: (message) => console.log(message),
  warning: (message) => console.warn(message),
};

export const registerNotifier = (notifier: Partial<Notify>) => {
  impl = { ...impl, ...notifier };
};

export const notify = {
  error: (message: string) => impl.error(message),
  info: (message: string) => impl.info(message),
  success: (message: string) => impl.success(message),
  warning: (message: string) => impl.warning(message),
};
