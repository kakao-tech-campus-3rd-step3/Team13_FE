import * as S from './GameList.styled';

type GameListErrorProps = {
  onRetry: () => void;
};

export function GameListError({ onRetry }: GameListErrorProps) {
  return (
    <S.StateContainer data-testid="gamelist-error">
      <S.StateMessage>매치 목록을 불러오지 못했어요.</S.StateMessage>
      <S.SupportiveText>
        네트워크 상태를 확인하고 다시 시도해주세요.
      </S.SupportiveText>
      <S.SecondaryButton
        type="button"
        aria-label="retry-games"
        onClick={onRetry}
      >
        재시도
      </S.SecondaryButton>
    </S.StateContainer>
  );
}
