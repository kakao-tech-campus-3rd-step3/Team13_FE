import * as S from './GameList.styled';

export function GameListSkeleton() {
  return (
    <S.StateContainer data-testid="gamelist-skeleton">
      <S.SkeletonLine />
      <S.SkeletonLine />
      <S.SkeletonLine />
    </S.StateContainer>
  );
}
