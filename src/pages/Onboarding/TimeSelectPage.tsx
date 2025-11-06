import { useNavigate } from 'react-router-dom';

import PageActions from '@/components/layout/PageActions';
import RouteSkeleton from '@/components/RouteSkeleton';
import SelectCard from '@/components/selection/SelectCard';
import OriginTitleBar from '@/components/titleBar/originTitleBar';
import {
  type TimeSlotKey,
  usePrefActions,
  usePrefHydrated,
  useSelectedTimeSlots,
} from '@/stores/preferencesStore';

import * as S from './TimeSelectPage.styled';

const SLOTS: Array<{
  key: TimeSlotKey;
  title: string;
  hint: string;
  icon: string;
}> = [
  { key: 'MORNING_EARLY', title: '아침', hint: '06:00-09:00', icon: '🌅' },
  { key: 'MORNING_LATE', title: '오전', hint: '09:00-12:00', icon: '☀️' },
  { key: 'NOON_EARLY', title: '점심 이후', hint: '12:00-15:00', icon: '🍱' },
  { key: 'NOON_LATE', title: '오후', hint: '15:00-18:00', icon: '🌤️' },
  { key: 'EVENING_EARLY', title: '저녁', hint: '18:00-21:00', icon: '🌆' },
  { key: 'EVENING_LATE', title: '밤', hint: '21:00-00:00', icon: '🌙' },
];

export default function TimeSelectPage() {
  const navigate = useNavigate();
  const hydrated = usePrefHydrated();
  const selected = useSelectedTimeSlots();
  const { toggleTimeSlot, resetTimeSlots } = usePrefActions();

  const handleBack = () => {
    void navigate(-1);
  };
  const handleNext = () => {
    void navigate('/my', { replace: true });
  };

  if (!hydrated) {
    return <RouteSkeleton />;
  }

  return (
    <S.Page aria-label="time-select-page">
      <OriginTitleBar title="운동 가능한 시간대 선택" onBack={handleBack} />
      <S.Content>
        <S.Header>
          <S.SectionTitle>어떤 시간대를 원하나요?</S.SectionTitle>
          <S.SectionHint>
            여러 개 선택 가능 · 최소 1개 이상 선택해 주세요.
          </S.SectionHint>
        </S.Header>

        <S.Grid>
          {SLOTS.map((slot) => (
            <SelectCard
              key={slot.key}
              icon={slot.icon}
              title={slot.title}
              caption={slot.hint}
              selected={selected.includes(slot.key)}
              onToggle={() => toggleTimeSlot(slot.key)}
            />
          ))}
        </S.Grid>

        <S.ProgressIndicator aria-label="온보딩 진행 상황">
          <S.ProgressDot active />
          <S.ProgressDot active />
        </S.ProgressIndicator>
      </S.Content>

      <PageActions
        onReset={resetTimeSlots}
        onNext={handleNext}
        nextDisabled={selected.length === 0}
      />
    </S.Page>
  );
}
