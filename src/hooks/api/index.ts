/**
 * API 공통 훅 Export
 */

// Query 훅
export { useCoreQuery, useCoreQueryData } from './useCoreQuery';
export type { UseCoreQueryOptions, ApiQueryFn } from './useCoreQuery';

// Mutation 훅
export {
  useCoreMutation,
  useCoreMutationData,
  useInvalidateQueries,
} from './useCoreMutation';
export type { UseCoreMutationOptions, ApiMutationFn } from './useCoreMutation';
