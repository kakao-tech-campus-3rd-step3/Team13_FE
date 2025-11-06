import type {
  QueryKey,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { ApiError, ApiResponse } from '@/types/api.types';

/**
 * useCoreQuery 옵션 타입
 * - React Query의 UseQueryOptions에서 queryKey, queryFn 제외
 * - 추가 커스텀 옵션 확장 가능
 */
export type UseCoreQueryOptions<TData = unknown, TError = ApiError> = Omit<
  UseQueryOptions<TData, TError, TData, QueryKey>,
  'queryKey' | 'queryFn'
>;

/**
 * API 요청 함수 타입
 */
export type ApiQueryFn<TData> = () => Promise<ApiResponse<TData>>;

/**
 * useCoreQuery - GET 요청용 공통 훅
 *
 * @description
 * - React Query의 useQuery를 래핑한 공통 훅
 * - Axios 인스턴스 자동 사용
 * - 타입 안전성 보장
 * - 공통 에러 처리 (인터셉터에서 처리)
 *
 * @example
 * ```typescript
 * // 1. 매치 상세 정보 가져오기
 * interface GameDetailResponse {
 *   gameId: number;
 *   sportId: number;
 *   name: string;
 *   playerCount: number;
 *   gameStatus: 'ON_RECRUITING' | 'RECRUITING_DONE' | 'GAME_FINISHED';
 *   startTime: string;
 *   duration: number;
 *   description: string;
 * }
 *
 * const { data: gameDetail, isLoading } = useCoreQuery(
 *   ['games', gameId],
 *   () => apiClient.get<GameDetailResponse>(`/api/v1/games/${gameId}`)
 * );
 *
 * // 2. 매치 목록 가져오기
 * const { data: games } = useCoreQuery(
 *   ['games'],
 *   () => apiClient.get<GameDetailResponse[]>('/api/v1/games')
 * );
 *
 * // 3. 조건부 쿼리 (gameId가 있을 때만 실행)
 * const { data, error } = useCoreQuery(
 *   ['games', gameId],
 *   () => apiClient.get<GameDetailResponse>(`/api/v1/games/${gameId}`),
 *   {
 *     enabled: !!gameId,
 *     staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
 *     retry: 2
 *   }
 * );
 * ```
 */
export function useCoreQuery<TData = unknown>(
  queryKey: QueryKey,
  queryFn: ApiQueryFn<TData>,
  options?: UseCoreQueryOptions<ApiResponse<TData>, AxiosError<ApiError>>,
): UseQueryResult<ApiResponse<TData>, AxiosError<ApiError>> {
  return useQuery<ApiResponse<TData>, AxiosError<ApiError>>({
    queryKey,
    queryFn,
    ...options,
  });
}

/**
 * useCoreQueryData - 데이터만 추출하는 간편 버전
 *
 * @description
 * - ApiResponse 래퍼를 자동으로 제거하고 data만 반환
 * - 더 간결한 코드 작성 가능
 *
 * @example
 * ```typescript
 * // Before: ApiResponse<GameDetailResponse> 전체 반환
 * const { data: response } = useCoreQuery(['games', 3], fetchGameDetail);
 * const gameDetail = response?.data; // 한 번 더 접근 필요
 *
 * // After: GameDetailResponse 직접 반환
 * const { data: gameDetail } = useCoreQueryData(['games', 3], fetchGameDetail);
 * console.log(gameDetail?.name); // 바로 접근 가능
 * ```
 */
export function useCoreQueryData<TData = unknown>(
  queryKey: QueryKey,
  queryFn: ApiQueryFn<TData>,
  options?: UseCoreQueryOptions<TData, AxiosError<ApiError>>,
): UseQueryResult<TData, AxiosError<ApiError>> {
  return useQuery<TData, AxiosError<ApiError>>({
    queryKey,
    queryFn: async () => {
      const response = await queryFn();
      return response.data; // ApiResponse<TData>에서 data만 추출
    },
    ...options,
  });
}
