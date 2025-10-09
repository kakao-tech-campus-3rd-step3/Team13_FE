// Layout 시스템
export { MatchCardLayout } from './matchCardLayout';
export type { MatchCardLayoutProps } from './matchCardLayout.types';

// 슬롯 컴포넌트들
export {
  ImageSlot,
  InfoSlot,
  PeopleInfoSlot,
  ActionSlot,
} from './matchCardSlots';
export type {
  ImageSlotProps,
  InfoSlotProps,
  PeopleInfoSlotProps,
  ActionSlotProps,
} from './matchCardLayout.types';

// Preset 컴포넌트들 (권장 사용법)
export {
  BasicMatchCard,
  RecruitingMatchCard,
  SetMatchCard,
  FinishedMatchCard,
} from './matchCardPresets';
export type {
  BasicMatchCardProps,
  RecruitingMatchCardProps,
  SetMatchCardProps,
  FinishedMatchCardProps,
} from './matchCardPresets';

/**
 * 사용 가이드:
 *
 * 1. 새로운 명확한 방식 (권장):
 *    import { RecruitingMatchCard } from '@/components/matchCard';
 *    <RecruitingMatchCard title="..." time="..." peopleCount="8/10" />
 *
 * 2. 최대 커스터마이징:
 *    import { MatchCardLayout, ImageSlot, InfoSlot } from '@/components/matchCard';
 *    <MatchCardLayout
 *      leftSlot={<ImageSlot src="..." />}
 *      centerSlot={<InfoSlot title="..." time="..." />}
 *      rightSlot={<CustomComponent />}
 *    />
 */
