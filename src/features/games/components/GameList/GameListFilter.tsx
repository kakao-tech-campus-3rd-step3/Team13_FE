import type { ChangeEvent } from 'react';

import type { TimePeriod } from '@/hooks/queries/games';

import * as S from './GameList.styled';

const PERIODS: TimePeriod[] = ['MORNING', 'NOON', 'EVENING'];

type GameListFilterProps = {
  sportId?: number;
  timePeriod?: string;
  onSportChange: (value: string) => void;
  onPeriodChange: (value: string) => void;
  onRefresh: () => void;
};

export function GameListFilter({
  sportId,
  timePeriod,
  onSportChange,
  onPeriodChange,
  onRefresh,
}: GameListFilterProps) {
  const handleSportChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onSportChange(event.target.value);
  };

  const handlePeriodChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onPeriodChange(event.target.value);
  };

  return (
    <S.FilterBar>
      <S.FilterGroup>
        스포츠
        <S.Select
          aria-label="select-sport"
          value={sportId ?? ''}
          onChange={handleSportChange}
        >
          <option value="">전체</option>
          <option value="1">농구</option>
          <option value="2">축구</option>
        </S.Select>
      </S.FilterGroup>

      <S.FilterGroup>
        시간대
        <S.Select
          aria-label="select-period"
          value={(timePeriod ?? '').toUpperCase()}
          onChange={handlePeriodChange}
        >
          <option value="">전체</option>
          {PERIODS.map((period) => (
            <option key={period} value={period}>
              {period}
            </option>
          ))}
        </S.Select>
      </S.FilterGroup>

      <S.RefreshButton
        type="button"
        aria-label="refetch-games"
        onClick={onRefresh}
      >
        새로고침
      </S.RefreshButton>
    </S.FilterBar>
  );
}
