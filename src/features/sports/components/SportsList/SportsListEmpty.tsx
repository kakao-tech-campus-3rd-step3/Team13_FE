import * as S from './SportsList.styled';

export function SportsListEmpty() {
  return (
    <S.StateContainer data-testid="sports-empty">
      <S.StateMessage>등록된 스포츠가 없어요.</S.StateMessage>
      <S.SupportiveText>
        지금 바로 첫 번째 스포츠를 추가해 보세요!
      </S.SupportiveText>
      <S.PrimaryButton type="button" aria-label="cta-add-sport">
        스포츠 추가하기
      </S.PrimaryButton>
    </S.StateContainer>
  );
}
