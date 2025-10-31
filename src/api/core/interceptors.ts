import type {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { toast } from 'react-toastify';

import { useAuthStore } from '@/stores/authStore';
import type { ApiError } from '@/types/api.types';

import { apiClient } from './axiosInstance';

/**
 * Request 인터셉터
 * - 모든 요청에 자동으로 Authorization 헤더 추가
 */
export const setupRequestInterceptor = () => {
  apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // Zustand 스토어에서 액세스 토큰 가져오기
      const { accessToken } = useAuthStore.getState();

      // 토큰이 있으면 헤더에 추가
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    },
  );
};

/**
 * Response 인터셉터
 * - 에러 응답 처리 (401, 403, 500 등)
 * - 토큰 만료 시 자동 갱신 (TODO: 추후 구현)
 */
export const setupResponseInterceptor = () => {
  apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
      // 성공 응답은 그대로 반환
      return response;
    },
    async (error: AxiosError<ApiError>) => {
      // TODO: 토큰 리프레시 구현 시 사용
      // const originalRequest = error.config;

      // 에러 응답이 없는 경우 (네트워크 에러 등)
      if (!error.response) {
        toast.error('네트워크 연결을 확인해주세요.');
        return Promise.reject(error);
      }

      const { status } = error.response;

      switch (status) {
        case 401: {
          // 인증 실패 - 토큰 만료 또는 유효하지 않음
          const { clearAuth } = useAuthStore.getState();

          // TODO: 추후 토큰 리프레시 로직 추가
          // const { refreshToken, updateAccessToken } = useAuthStore.getState();
          // if (refreshToken && !originalRequest._retry) {
          //   originalRequest._retry = true;
          //   try {
          //     const { data } = await apiClient.post('/auth/refresh', { refreshToken });
          //     updateAccessToken(data.accessToken);
          //     originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
          //     return apiClient(originalRequest);
          //   } catch (refreshError) {
          //     clearAuth();
          //     window.location.href = '/login';
          //     return Promise.reject(refreshError);
          //   }
          // }

          // 현재는 단순히 로그아웃 처리
          toast.error('로그인이 필요합니다.');
          clearAuth();
          window.location.href = '/login';
          break;
        }

        case 403: {
          // 권한 없음
          toast.error('접근 권한이 없습니다.');
          break;
        }

        case 404: {
          // 리소스를 찾을 수 없음
          toast.error('요청한 리소스를 찾을 수 없습니다.');
          break;
        }

        case 500:
        case 502:
        case 503: {
          // 서버 에러
          toast.error('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
          break;
        }

        default: {
          // 기타 에러 - 서버에서 보낸 에러 메시지 표시
          const errorMessage =
            error.response.data?.message || '오류가 발생했습니다.';
          toast.error(errorMessage);
        }
      }

      return Promise.reject(error);
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
