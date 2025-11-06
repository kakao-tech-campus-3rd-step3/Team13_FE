import * as S from './ErrorPage.styled';

export default function ErrorPage() {
  return (
    <S.Page aria-label="error-page">
      <S.Heading>문제가 발생했어요</S.Heading>
      <S.Description>잠시 후 다시 시도해 주세요.</S.Description>
    </S.Page>
  );
}
