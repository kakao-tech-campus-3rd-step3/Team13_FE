import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import PageActions from '@/components/layout/PageActions';
import RouteSkeleton from '@/components/RouteSkeleton';
import SelectCard from '@/components/selection/SelectCard';
import OriginTitleBar from '@/components/titleBar/originTitleBar';
import { type Sport, useSports } from '@/hooks/queries/sports/useSports';
import {
  usePrefActions,
  usePrefHydrated,
  useSelectedSports,
} from '@/stores/preferencesStore';

import * as S from './SportSelectPage.styled';

const FALLBACK_SPORTS: Sport[] = [
  { sportId: 1, name: '풋살', recommededPlayerCount: 10 },
  { sportId: 2, name: '농구', recommededPlayerCount: 10 },
];

const SPORT_ICON_MAP: Record<string, string> = {
  풋살: '⚽',
  축구: '⚽',
  농구: '🏀',
  배드민턴: '🏸',
  테니스: '🎾',
  야구: '⚾',
  배구: '🏐',
};

export default function SportSelectPage() {
  const navigate = useNavigate();
  const hydrated = usePrefHydrated();
  const selected = useSelectedSports();
  const { toggleSport, resetSports } = usePrefActions();
  const { data, isPending, isError } = useSports();
  const handleBack = () => {
    void navigate(-1);
  };
  const handleNext = () => {
    void navigate('/onboarding/times');
  };

  const remoteSports = data?.sports;
  const hasRemoteSports =
    Array.isArray(remoteSports) && remoteSports.length > 0;

  const sports = useMemo(() => {
    if (hasRemoteSports) return remoteSports;
    return FALLBACK_SPORTS;
  }, [hasRemoteSports, remoteSports]);

  const showSkeleton = !hydrated || (isPending && !isError && !hasRemoteSports);

  if (showSkeleton) {
    return <RouteSkeleton />;
  }

  return (
    <S.Page aria-label="sport-select-page">
      <OriginTitleBar title="원하는 종목 선택" onBack={handleBack} />
      <S.Content>
        <div>
          <S.SectionTitle>어떤 종목을 즐기시나요?</S.SectionTitle>
          <S.SectionHint>
            여러 개 선택 가능 · 최소 1개 이상 선택해 주세요.
          </S.SectionHint>
        </div>

        <S.List>
          {sports.map((sport) => (
            <SelectCard
              key={sport.sportId}
              icon={SPORT_ICON_MAP[sport.name] ?? '🏅'}
              title={sport.name}
              caption={
                sport.recommededPlayerCount
                  ? `추천 인원 ${sport.recommededPlayerCount}명`
                  : 'P-Ting 매칭 지원'
              }
              selected={selected.includes(sport.sportId)}
              onToggle={() => toggleSport(sport.sportId)}
            />
          ))}
        </S.List>
      </S.Content>

      <PageActions
        onReset={resetSports}
        onNext={handleNext}
        nextDisabled={selected.length === 0}
      />
    </S.Page>
  );
}
