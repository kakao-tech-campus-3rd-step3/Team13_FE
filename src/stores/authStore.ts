import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { AuthState, AuthTokens, User } from '@/types/auth.types';

/**
 * 인증 상태 관리 스토어
 * - localStorage에 자동 저장 (persist 미들웨어)
 * - 새로고침 시에도 로그인 상태 유지
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // 초기 상태
      accessToken: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,

      // 토큰 설정 (로그인 성공 시)
      setTokens: (tokens: AuthTokens) => {
        set({
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
          isAuthenticated: true,
        });
      },

      // 사용자 정보 설정
      setUser: (user: User) => {
        set({ user });
      },

      // 인증 정보 초기화 (로그아웃)
      clearAuth: () => {
        set({
          accessToken: null,
          refreshToken: null,
          user: null,
          isAuthenticated: false,
        });
      },

      // Access Token만 갱신 (토큰 리프레시 시)
      updateAccessToken: (accessToken: string) => {
        set({ accessToken });
      },
    }),
    {
      name: 'auth-storage', // localStorage 키 이름
      partialize: (state) => ({
        // localStorage에 저장할 항목만 선택
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
