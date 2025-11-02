import React from 'react';

import { useSports } from '@/hooks/queries/sports';

import {
  SportsList,
  SportsListEmpty,
  SportsListError,
  SportsListSkeleton,
} from '../../components/SportsList';

import * as S from './SportsPage.styled';

const SportsPage: React.FC = () => {
  const { data, isLoading, isError, refetch } = useSports();
  const sports = data?.sports ?? [];

  return (
    <S.PageContainer>
      <S.Header>
        <S.Title>스포츠 탐색</S.Title>
        <S.Description>
          관심 있는 종목을 확인하고 팀에 합류하거나 새로운 경기를 만들어보세요.
        </S.Description>
      </S.Header>

      <S.Content>
        {isLoading && <SportsListSkeleton />}
        {isError && !isLoading && (
          <SportsListError
            onRetry={() => {
              void refetch();
            }}
          />
        )}
        {!isLoading &&
          !isError &&
          (sports.length > 0 ? (
            <SportsList
              sports={sports}
              onRefresh={() => {
                void refetch();
              }}
            />
          ) : (
            <SportsListEmpty />
          ))}
      </S.Content>
    </S.PageContainer>
  );
};

export default SportsPage;
