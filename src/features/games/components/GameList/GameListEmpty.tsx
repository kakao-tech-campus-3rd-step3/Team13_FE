import * as S from './GameList.styled';

export function GameListEmpty() {
  return (
    <S.StateContainer data-testid="gamelist-empty">
      <S.StateMessage>모집 중인 매치가 없어요.</S.StateMessage>
      <S.SupportiveText>
        새로운 경기를 만들어 친구들을 초대해 보세요.
      </S.SupportiveText>
      <S.PrimaryButton type="button" aria-label="cta-create-game">
        퀵 매치 만들기
      </S.PrimaryButton>
    </S.StateContainer>
  );
}
