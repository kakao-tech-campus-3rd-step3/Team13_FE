import { apiClient } from '@/api/core/axiosInstance';
import type { FCMToken } from '@/libs/firebase/types';

/**
 * FCM 토큰 등록 요청 DTO
 */
interface FcmTokenRequest {
  token: string;
}

/**
 * FCM 토큰 등록 응답 DTO
 */
interface FcmTokenResponse {
  success: boolean;
  message?: string;
}

/**
 * FCM 토큰을 백엔드에 등록
 * 로그인 후 또는 알림 권한 허용 후 호출
 *
 * @param token FCM 토큰
 * @returns 등록 성공 여부
 */
export const registerFCMToken = async (
  token: FCMToken,
): Promise<FcmTokenResponse> => {
  try {
    const requestBody: FcmTokenRequest = { token };
    const { data } = await apiClient.post<FcmTokenResponse>(
      '/api/v1/fcm/token',
      requestBody,
    );
    return data;
  } catch (error) {
    console.error('Failed to register FCM token:', error);
    throw error;
  }
};

/**
 * FCM 토큰을 백엔드에서 삭제
 * 로그아웃 시 또는 알림 비활성화 시 호출
 *
 * @returns 삭제 성공 여부
 */
export const unregisterFCMToken = async (): Promise<FcmTokenResponse> => {
  try {
    const { data } =
      await apiClient.delete<FcmTokenResponse>('/api/v1/fcm/token');
    return data;
  } catch (error) {
    console.error('Failed to unregister FCM token:', error);
    throw error;
  }
};
