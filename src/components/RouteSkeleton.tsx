import * as S from './RouteSkeleton.styled';

export default function RouteSkeleton() {
  return (
    <S.Wrapper aria-label="route-skeleton">
      <S.SkeletonLine />
      <S.SkeletonLine />
      <S.SkeletonLine />
    </S.Wrapper>
  );
}
