import type { Sport } from '@/hooks/queries/sports';

import * as S from './SportsList.styled';

type SportsListProps = {
  sports: Sport[];
  onRefresh: () => void;
};

export function SportsList({ sports, onRefresh }: SportsListProps) {
  return (
    <S.ListContainer data-testid="sports-list">
      {sports.map((sport) => (
        <S.ListItem key={sport.sportId}>
          <S.SportName>{sport.name}</S.SportName>
          <S.SportMeta>권장 인원: {sport.recommededPlayerCount}</S.SportMeta>
        </S.ListItem>
      ))}
      <S.RefreshArea>
        <S.PrimaryButton
          type="button"
          aria-label="refetch-sports"
          onClick={onRefresh}
        >
          새로고침
        </S.PrimaryButton>
      </S.RefreshArea>
    </S.ListContainer>
  );
}
