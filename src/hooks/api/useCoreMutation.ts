import type {
  MutationKey,
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { ApiError, ApiResponse } from '@/types/api.types';

/**
 * useCoreMutation 옵션 타입
 */
export type UseCoreMutationOptions<
  TData = unknown,
  TVariables = unknown,
  TError = ApiError,
> = Omit<
  UseMutationOptions<ApiResponse<TData>, TError, TVariables>,
  'mutationFn'
>;

/**
 * API Mutation 함수 타입
 */
export type ApiMutationFn<TData, TVariables> = (
  variables: TVariables,
) => Promise<ApiResponse<TData>>;

/**
 * useCoreMutation - POST/PUT/DELETE 요청용 공통 훅
 *
 * @description
 * - React Query의 useMutation을 래핑한 공통 훅
 * - Axios 인스턴스 자동 사용
 * - 타입 안전성 보장
 * - 낙관적 업데이트 지원
 * - 자동 캐시 무효화
 *
 * @example
 * ```typescript
 * // 1. 매치 참여하기 (POST)
 * const joinGame = useCoreMutation<void, number>(
 *   (gameId) => apiClient.post(`/api/v1/games/${gameId}`)
 * );
 *
 * joinGame.mutate(3); // 게임 ID 3에 참여
 *
 * // 2. 성공/실패 콜백과 캐시 무효화
 * const joinGameWithCallback = useCoreMutation<void, number>(
 *   (gameId) => apiClient.post(`/api/v1/games/${gameId}`),
 *   {
 *     onSuccess: () => {
 *       toast.success('매치 참여가 완료되었습니다!');
 *       // 매치 상세 정보 다시 불러오기
 *       queryClient.invalidateQueries({ queryKey: ['games'] });
 *     },
 *     onError: (error) => {
 *       if (error.response?.status === 400) {
 *         toast.error('JWT 인증 헤더가 필요합니다.');
 *       } else {
 *         toast.error('참여에 실패했습니다.');
 *       }
 *     }
 *   }
 * );
 *
 * // 3. 매치 생성하기 (POST with body)
 * interface CreateGameRequest {
 *   sportId: number;
 *   name: string;
 *   playerCount: number;
 *   startTime: string;
 *   duration: number;
 *   description: string;
 * }
 *
 * const createGame = useCoreMutation<void, CreateGameRequest>(
 *   (gameData) => apiClient.post('/api/v1/games', gameData),
 *   {
 *     onSuccess: () => {
 *       toast.success('매치가 생성되었습니다!');
 *       navigate('/games');
 *     }
 *   }
 * );
 *
 * // 4. 낙관적 업데이트 (참여자 수 즉시 반영)
 * const joinGameOptimistic = useCoreMutation<void, number>(
 *   (gameId) => apiClient.post(`/api/v1/games/${gameId}`),
 *   {
 *     onMutate: async (gameId) => {
 *       // 이전 데이터 저장
 *       await queryClient.cancelQueries({ queryKey: ['games', gameId] });
 *       const previousGame = queryClient.getQueryData(['games', gameId]);
 *
 *       // UI 먼저 업데이트 (낙관적)
 *       queryClient.setQueryData(['games', gameId], (old: any) => ({
 *         ...old,
 *         playerCount: old.playerCount + 1
 *       }));
 *
 *       return { previousGame };
 *     },
 *     onError: (err, gameId, context) => {
 *       // 실패 시 롤백
 *       if (context?.previousGame) {
 *         queryClient.setQueryData(['games', gameId], context.previousGame);
 *       }
 *       toast.error('참여 실패');
 *     }
 *   }
 * );
 * ```
 */
export function useCoreMutation<TData = unknown, TVariables = unknown>(
  mutationFn: ApiMutationFn<TData, TVariables>,
  options?: UseCoreMutationOptions<TData, TVariables, AxiosError<ApiError>>,
): UseMutationResult<ApiResponse<TData>, AxiosError<ApiError>, TVariables> {
  return useMutation<ApiResponse<TData>, AxiosError<ApiError>, TVariables>({
    mutationFn,
    ...options,
  });
}

/**
 * useCoreMutationData - 데이터만 추출하는 간편 버전
 *
 * @description
 * - ApiResponse 래퍼를 자동으로 제거하고 data만 반환
 * - 더 간결한 코드 작성 가능
 *
 * @example
 * ```typescript
 * // Before: ApiResponse<void> 전체 반환 (매치 참여)
 * const { data: response } = useCoreMutation(joinGame);
 * // response?.data는 void이므로 의미 없음
 *
 * // After: void 직접 반환 (더 간결)
 * const { mutate: joinGame } = useCoreMutationData(
 *   (gameId: number) => apiClient.post(`/api/v1/games/${gameId}`)
 * );
 *
 * // 매치 생성 시 생성된 게임 ID 반환하는 경우
 * const { data: createdGameId } = useCoreMutationData<number, CreateGameRequest>(
 *   (gameData) => apiClient.post('/api/v1/games', gameData)
 * );
 * ```
 */
export function useCoreMutationData<TData = unknown, TVariables = unknown>(
  mutationFn: ApiMutationFn<TData, TVariables>,
  options?: Omit<
    UseCoreMutationOptions<TData, TVariables, AxiosError<ApiError>>,
    'onSuccess' | 'onSettled'
  >,
): UseMutationResult<TData, AxiosError<ApiError>, TVariables> {
  return useMutation<TData, AxiosError<ApiError>, TVariables>({
    mutationFn: async (variables) => {
      const response = await mutationFn(variables);
      return response.data; // ApiResponse<TData>에서 data만 추출
    },
    ...options,
  });
}

/**
 * 캐시 무효화 헬퍼 훅
 *
 * @description
 * - queryClient를 간편하게 사용할 수 있는 헬퍼
 * - mutation 성공 후 캐시 무효화 패턴에 사용
 *
 * @example
 * ```typescript
 * const invalidate = useInvalidateQueries();
 *
 * const joinGame = useCoreMutation(
 *   (gameId: number) => apiClient.post(`/api/v1/games/${gameId}`),
 *   {
 *     onSuccess: () => {
 *       // 매치 목록과 상세 정보 모두 갱신
 *       invalidate(['games']); // 모든 games 관련 쿼리 무효화
 *       toast.success('매치 참여 완료!');
 *     }
 *   }
 * );
 *
 * // 특정 게임만 무효화
 * const updateGame = useCoreMutation(updateGameFn, {
 *   onSuccess: (_, gameId) => {
 *     invalidate(['games', gameId]); // 특정 게임만 무효화
 *   }
 * });
 * ```
 */
export function useInvalidateQueries() {
  const queryClient = useQueryClient();

  return (queryKey: MutationKey) => {
    void queryClient.invalidateQueries({ queryKey });
  };
}
