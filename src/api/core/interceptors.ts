import {
  AxiosHeaders,
  type AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
} from 'axios';

import { notify } from '@/pages/notifications/notify';
import { useSessionStore } from '@/stores/sessionStore';
import type { ApiError } from '@/types/api.types';

import { apiClient } from './axiosInstance';

let refreshEnabledOverride: boolean | null = null;

export const setRefreshInterceptorMode = (enabled: boolean | null) => {
  refreshEnabledOverride = enabled;
};

const isRefreshEnabled = () => {
  if (refreshEnabledOverride !== null) {
    return refreshEnabledOverride;
  }
  return (
    import.meta.env.MODE !== 'production' &&
    import.meta.env.VITE_USE_MSW === 'true'
  );
};

let refreshPromise: Promise<void> | null = null;

async function refreshTokenOnce() {
  const { refreshToken, actions } = useSessionStore.getState();

  if (!isRefreshEnabled() || !refreshToken) {
    actions.clearSession();
    actions.resetQueue();
    throw new Error('Refresh not supported');
  }

  if (!refreshPromise) {
    actions.beginRefresh();
    refreshPromise = apiClient
      .post<{ accessToken: string; refreshToken?: string | null }>(
        '/api/v1/auth/refresh',
        { refreshToken },
      )
      .then(({ data }) => {
        actions.setSession(data.accessToken, data.refreshToken ?? refreshToken);
        actions.finishRefresh();
        actions.flushQueue();
      })
      .catch((error) => {
        actions.finishRefresh();
        actions.resetQueue();
        actions.clearSession();
        throw error;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
}

const handleNon401Error = (error: AxiosError<ApiError>) => {
  if (!error.response) {
    notify.error('네트워크 연결을 확인해주세요.');
    return Promise.reject(error);
  }

  const { status, data } = error.response;
  const payload = data as unknown;
  const nestedError =
    typeof payload === 'object' && payload !== null && 'error' in payload
      ? (payload as { error?: { message?: unknown; code?: unknown } }).error
      : undefined;
  const resolvedMessage =
    typeof nestedError?.message === 'string'
      ? nestedError.message
      : typeof (payload as { message?: unknown }).message === 'string'
        ? ((payload as { message?: string }).message ??
          '요청을 처리하지 못했어요.')
        : '요청을 처리하지 못했어요.';
  const resolvedCode =
    typeof nestedError?.code === 'string'
      ? nestedError.code
      : typeof (payload as { code?: unknown }).code === 'string'
        ? ((payload as { code?: string }).code ?? undefined)
        : undefined;

  if (status === 409) {
    if (
      resolvedCode === 'EMAIL_ALREADY_VERIFIED' ||
      resolvedCode === 'CERT_ALREADY_VERIFIED'
    ) {
      notify.success('이미 이메일 인증이 완료되었습니다.');
      return Promise.reject(error);
    }
    notify.error(
      resolvedMessage ?? '요청이 충돌했습니다. 잠시 후 다시 시도해 주세요.',
    );
    return Promise.reject(error);
  }

  const fallbackMessage = resolvedMessage;

  switch (status) {
    case 400:
      notify.error(fallbackMessage);
      break;
    case 403:
      notify.error('접근 권한이 없습니다.');
      break;
    case 404:
      notify.error('요청한 리소스를 찾을 수 없습니다.');
      break;
    case 500:
    case 502:
    case 503:
      notify.error('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      break;
    default:
      notify.error(fallbackMessage);
  }

  return Promise.reject(error);
};
export const setupRequestInterceptor = () => {
  apiClient.interceptors.request.use(
    (config) => {
      const token = useSessionStore.getState().accessToken;
      if (token) {
        (config.headers ??= new AxiosHeaders()).set(
          'Authorization',
          `Bearer ${token}`,
        );
      }
      return config;
    },
    (error: AxiosError) => Promise.reject(error),
  );
};

export const setupResponseInterceptor = () => {
  apiClient.interceptors.response.use(
    (response: AxiosResponse) => response,

    async (error: AxiosError<ApiError>) => {
      const status = error.response?.status;
      const originalConfig = error.config as AxiosRequestConfig & {
        _retry?: boolean;
      };

      if (status !== 401) {
        return handleNon401Error(error);
      }

      const { actions } = useSessionStore.getState();

      if (!isRefreshEnabled()) {
        actions.clearSession();
        actions.resetQueue();
        notify.error('로그인이 필요합니다.');
        return Promise.reject(error);
      }

      if (originalConfig._retry) {
        return Promise.reject(error);
      }
      originalConfig._retry = true;

      const { isRefreshing } = useSessionStore.getState();

      try {
        if (isRefreshing) {
          await new Promise<void>((resolve) => actions.enqueue(resolve));
        } else {
          await refreshTokenOnce();
        }
        const latestToken = useSessionStore.getState().accessToken;
        if (latestToken) {
          if (originalConfig.headers instanceof AxiosHeaders) {
            originalConfig.headers.set(
              'Authorization',
              `Bearer ${latestToken}`,
            );
          } else {
            (originalConfig.headers ||= {}).Authorization =
              `Bearer ${latestToken}`;
          }
        }
        return apiClient(originalConfig);
      } catch (refreshError) {
        notify.error('세션이 만료되었습니다. 다시 로그인해주세요.');
        const errorReason =
          refreshError instanceof Error
            ? refreshError
            : new Error(String(refreshError));
        return Promise.reject(errorReason);
      }
    },
  );
};

/**
 * 모든 인터셉터 설정
 * - main.tsx에서 앱 시작 시 한 번만 호출
 */
export const setupInterceptors = () => {
  setupRequestInterceptor();
  setupResponseInterceptor();
};
