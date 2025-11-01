import * as S from './SportsList.styled';

export function SportsListSkeleton() {
  return (
    <S.StateContainer data-testid="sports-skeleton">
      <S.SkeletonLine />
      <S.SkeletonLine />
      <S.SkeletonLine />
    </S.StateContainer>
  );
}
