import * as S from './GameList.styled';

type GameListQueryIndicatorProps = {
  value: string;
};

export function GameListQueryIndicator({ value }: GameListQueryIndicatorProps) {
  return (
    <S.CurrentSearch data-testid="current-search">{value}</S.CurrentSearch>
  );
}
