import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  SportsDropDown,
  TimeSlotDropDown,
  SortDropDown,
} from '@/components/dropDown';
import FloatingActionButton from '@/components/FloatingActionButton';
import { RecruitingMatchCard } from '@/components/matchCard';
import HomeTitleBar from '@/components/titleBar/homeTitleBar';
import { useGamesList } from '@/hooks/queries/games';
import { useIsLoggedIn } from '@/stores/appStore';
import { SPORT_ID } from '@/types/game.types';
import {
  formatTimeRange,
  calculateDeadline,
  formatPeopleCount,
  sortGames,
  filterGamesByTimeSlots,
  type SortCriteria,
} from '@/utils/game.utils';

import * as S from './HomePage.styled';

/**
 * 홈페이지 컴포넌트
 * - 로그인 전 사용자가 접근하는 메인 페이지
 * - 스포츠 종목별 매치 리스트 표시
 * - 시간대 및 정렬 기준 필터링 지원
 */
export default function HomePage() {
  const navigate = useNavigate();
  const isAuthenticated = useIsLoggedIn();

  const profileNavigateTo = isAuthenticated ? '/my' : '/login';

  // 상태 관리
  const [selectedSport, setSelectedSport] = useState<string>('basketball'); // 농구가 기본
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([
    '18:00-21:00',
  ]); // 기본 시간대
  const [selectedSort, setSelectedSort] = useState<string>('deadline'); // 마감 시간 순이 기본

  // 스포츠 ID 변환
  const sportId =
    selectedSport === 'basketball' ? SPORT_ID.BASKETBALL : SPORT_ID.FUTSAL;

  // API 데이터 가져오기
  const { data: gamesData, isLoading, isError } = useGamesList(sportId);

  // 필터링 및 정렬된 게임 목록
  const filteredAndSortedGames = useMemo(() => {
    if (!gamesData?.games) return [];

    // 1. 시간대 필터링
    const filtered = filterGamesByTimeSlots(gamesData.games, selectedTimeSlots);

    // 2. 정렬
    const sorted = sortGames(filtered, selectedSort as SortCriteria);

    return sorted;
  }, [gamesData?.games, selectedTimeSlots, selectedSort]);

  // 카드 클릭 핸들러
  const handleCardClick = (gameId?: number) => {
    if (isAuthenticated) {
      // 로그인 후 - 매치 상세 페이지로 이동
      void navigate(`/matchDetail/${gameId}`);
    } else {
      // 로그인 전 - 로그인 페이지로 이동
      void navigate('/login');
    }
  };

  return (
    <S.PageContainer aria-label="home-page">
      {/* 타이틀바 */}
      <HomeTitleBar title="P-Ting" navigateTo={profileNavigateTo} />

      {/* 광고 배너 */}
      <S.BannerContainer>
        <S.BannerImage src="/ad-banner.png" alt="프로모션 배너" />
      </S.BannerContainer>

      {/* 필터 배너 */}
      <S.FilterBanner>
        <S.FilterLeftGroup>
          <S.FilterItem>
            <SportsDropDown
              onChange={(selected) => setSelectedSport(selected)}
              initialSelected="basketball"
            />
          </S.FilterItem>
          <S.FilterItem style={{ minWidth: '180px' }}>
            <TimeSlotDropDown
              onChange={(selected) => setSelectedTimeSlots(selected)}
              initialSelected={['18:00-21:00']}
            />
          </S.FilterItem>
        </S.FilterLeftGroup>
        <S.FilterRightGroup>
          <S.FilterItem>
            <SortDropDown
              onChange={(selected) => setSelectedSort(selected)}
              initialSelected="deadline"
            />
          </S.FilterItem>
        </S.FilterRightGroup>
      </S.FilterBanner>

      {/* 매치 리스트 */}
      <S.MatchListContainer>
        {isLoading && (
          <S.LoadingSkeleton>
            <S.SkeletonCard />
            <S.SkeletonCard />
            <S.SkeletonCard />
          </S.LoadingSkeleton>
        )}

        {isError && (
          <S.EmptyMessage>
            데이터를 불러오는 중 오류가 발생했습니다.
          </S.EmptyMessage>
        )}

        {!isLoading && !isError && filteredAndSortedGames.length === 0 && (
          <S.EmptyMessage>매치가 없습니다</S.EmptyMessage>
        )}

        {!isLoading &&
          !isError &&
          filteredAndSortedGames.map((game) => (
            <S.MatchCardItem key={game.gameId}>
              <RecruitingMatchCard
                title={game.gameLocation}
                time={formatTimeRange(game.startTime, game.duration)}
                image={game.imageUrl ?? undefined}
                peopleCount={formatPeopleCount(
                  game.currentPlayerCount,
                  game.playerCount,
                )}
                deadline={calculateDeadline(game.startTime)}
                gameId={game.gameId}
                onCardClick={handleCardClick}
              />
            </S.MatchCardItem>
          ))}
      </S.MatchListContainer>

      {/* Floating Action Button (로그인 후에만 표시) */}
      {isAuthenticated && <FloatingActionButton />}
    </S.PageContainer>
  );
}
