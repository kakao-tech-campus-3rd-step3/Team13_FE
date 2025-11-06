import * as S from './SportsList.styled';

type SportsListErrorProps = {
  onRetry: () => void;
};

export function SportsListError({ onRetry }: SportsListErrorProps) {
  return (
    <S.StateContainer data-testid="sports-error">
      <S.StateMessage>스포츠 목록을 불러오지 못했어요.</S.StateMessage>
      <S.SupportiveText>
        네트워크 상태를 확인한 뒤 다시 시도해주세요.
      </S.SupportiveText>
      <S.SecondaryButton type="button" aria-label="retry" onClick={onRetry}>
        재시도
      </S.SecondaryButton>
    </S.StateContainer>
  );
}
