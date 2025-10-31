/**
 * 인증 관련 타입 정의
 */

export interface User {
  id: number;
  email: string;
  nickname?: string;
  profileImage?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthState {
  // 상태
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  isAuthenticated: boolean;

  // 액션
  setTokens: (tokens: AuthTokens) => void;
  setUser: (user: User) => void;
  clearAuth: () => void;
  updateAccessToken: (accessToken: string) => void;
}
