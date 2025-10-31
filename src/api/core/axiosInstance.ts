import axios from 'axios';
import type { AxiosInstance } from 'axios';

/**
 * Axios 인스턴스 설정
 * - 기본 URL, 타임아웃, 헤더 등 설정
 * - 인터셉터는 interceptors.ts에서 설정됨 (main.tsx에서 초기화)
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

if (!API_BASE_URL) {
  console.error('VITE_API_BASE_URL이 설정되지 않았습니다.');
}

/**
 * API 클라이언트 인스턴스
 * - 인터셉터는 별도로 등록됨 (중복 방지)
 */
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10초
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false, // 쿠키 전송 여부 (필요시 true로 변경)
});

export default apiClient;
