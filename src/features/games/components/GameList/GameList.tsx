import { useMemo } from 'react';

import type { GameResponse } from '@/hooks/queries/games';

import * as S from './GameList.styled';

const timeFormatter = new Intl.DateTimeFormat('ko-KR', {
  hour: '2-digit',
  minute: '2-digit',
});

type GameListProps = {
  games: GameResponse[];
};

export function GameList({ games }: GameListProps) {
  return (
    <S.ListContainer data-testid="gamelist">
      {games.map((game) => (
        <GameListItem key={game.gameId} game={game} />
      ))}
    </S.ListContainer>
  );
}

type GameListItemProps = {
  game: GameResponse;
};

function GameListItem({ game }: GameListItemProps) {
  const formattedTime = useMemo(() => {
    const date = new Date(game.startTime);
    if (Number.isNaN(date.getTime())) {
      return '시간 정보 없음';
    }
    return timeFormatter.format(date);
  }, [game.startTime]);

  return (
    <S.ListItem>
      <S.GameName>{game.name}</S.GameName>
      <S.GameMeta>
        인원: {game.playerCount} · 상태:{' '}
        {game.gameStatus === 'ON_MATCHING' ? '매칭 중' : '종료'}
      </S.GameMeta>
      <S.GameMeta>
        시작: {formattedTime} · 진행 시간: {game.duration}분
      </S.GameMeta>
    </S.ListItem>
  );
}
