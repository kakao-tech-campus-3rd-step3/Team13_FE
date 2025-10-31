import { QueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

/**
 * React Query 클라이언트 설정
 * - 캐싱, 리페칭, 에러 처리 등 전역 설정
 */

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 데이터가 'fresh' 상태로 유지되는 시간 (5분)
      staleTime: 5 * 60 * 1000,

      // 캐시에서 데이터가 유지되는 시간 (10분)
      gcTime: 10 * 60 * 1000, // React Query v5: cacheTime → gcTime

      // 실패 시 재시도 횟수
      retry: 1,

      // 윈도우 포커스 시 자동 리페칭 비활성화
      refetchOnWindowFocus: false,

      // 마운트 시 자동 리페칭 (기본값: true)
      refetchOnMount: true,

      // 네트워크 재연결 시 자동 리페칭
      refetchOnReconnect: true,
    },
    mutations: {
      // Mutation 에러 핸들러
      onError: (error) => {
        // 에러 메시지 표시
        const errorMessage =
          error instanceof Error
            ? error.message
            : '요청 처리 중 오류가 발생했습니다.';
        toast.error(errorMessage);
      },
    },
  },
});

/**
 * Query 키 팩토리
 * - 일관된 쿼리 키 관리를 위한 헬퍼
 */
export const queryKeys = {
  // 사용자 관련
  users: {
    all: ['users'] as const,
    lists: () => [...queryKeys.users.all, 'list'] as const,
    list: (filters: string) =>
      [...queryKeys.users.lists(), { filters }] as const,
    details: () => [...queryKeys.users.all, 'detail'] as const,
    detail: (id: number) => [...queryKeys.users.details(), id] as const,
  },

  // TODO: 추후 다른 도메인 추가
  // posts: { ... },
  // comments: { ... },
} as const;

export default queryClient;
