import axios, { AxiosError } from 'axios';
import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

/**
 * Axios 인스턴스 설정
 * - 기본 URL, 타임아웃, 헤더 등 설정
 * - 추후 인터셉터 추가 예정
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

if (!API_BASE_URL) {
  console.error('VITE_API_BASE_URL이 설정되지 않았습니다.');
}

/**
 * API 클라이언트 인스턴스
 */
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10초
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false, // 쿠키 전송 여부 (필요시 true로 변경)
});

/**
 * Request 인터셉터
 * - 요청 전 공통 처리 (인증 토큰 추가 등)
 */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // TODO: 인증 토큰 추가 (interceptors.ts에서 구현 예정)
    // const token = useAuthStore.getState().accessToken;
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

/**
 * Response 인터셉터
 * - 응답 후 공통 처리 (에러 핸들링 등)
 */
apiClient.interceptors.response.use(
  (response) => {
    // 성공 응답은 그대로 반환
    return response;
  },
  (error: AxiosError) => {
    // TODO: 에러 처리 로직 (interceptors.ts에서 구현 예정)
    // 401: 인증 실패 -> 토큰 갱신 or 로그아웃
    // 403: 권한 없음 -> 에러 메시지 표시
    // 500: 서버 에러 -> 에러 메시지 표시

    return Promise.reject(error);
  },
);

export default apiClient;
