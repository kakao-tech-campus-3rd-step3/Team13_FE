import React, { useCallback } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import type { GameListParams } from '@/hooks/queries/games';
import { useGameList } from '@/hooks/queries/games';

import {
  GameList,
  GameListEmpty,
  GameListError,
  GameListFilter,
  GameListQueryIndicator,
  GameListSkeleton,
} from '../../components/GameList';

import * as S from './GameListPage.styled';

const GameListPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const params: GameListParams = {
    sportId: searchParams.get('sportId')
      ? Number(searchParams.get('sportId'))
      : undefined,
    timePeriod: searchParams.get('timePeriod') ?? undefined,
  };

  const { data, isLoading, isError, refetch } = useGameList(params);
  const games = data?.games ?? [];

  const handleSportChange = useCallback(
    (value: string) => {
      const next = new URLSearchParams(searchParams);
      if (value) {
        next.set('sportId', value);
      } else {
        next.delete('sportId');
      }
      setSearchParams(next, { replace: false });
    },
    [searchParams, setSearchParams],
  );

  const handlePeriodChange = useCallback(
    (value: string) => {
      const next = new URLSearchParams(searchParams);
      if (value) {
        next.set('timePeriod', value.toUpperCase());
      } else {
        next.delete('timePeriod');
      }
      setSearchParams(next, { replace: false });
    },
    [searchParams, setSearchParams],
  );

  const handleRefresh = useCallback(() => {
    void refetch();
  }, [refetch]);

  return (
    <S.PageContainer>
      <S.Header>
        <S.Title>실시간 매치 탐색</S.Title>
        <S.Description>
          관심 종목과 시간대를 선택하면 맞춤형 매치를 확인할 수 있어요.
        </S.Description>
      </S.Header>

      <GameListFilter
        sportId={params.sportId}
        timePeriod={params.timePeriod}
        onSportChange={handleSportChange}
        onPeriodChange={handlePeriodChange}
        onRefresh={handleRefresh}
      />

      <GameListQueryIndicator value={location.search} />

      {isLoading && <GameListSkeleton />}

      {isError && !isLoading && <GameListError onRetry={handleRefresh} />}

      {!isLoading &&
        !isError &&
        (games.length > 0 ? <GameList games={games} /> : <GameListEmpty />)}
    </S.PageContainer>
  );
};

export default GameListPage;
