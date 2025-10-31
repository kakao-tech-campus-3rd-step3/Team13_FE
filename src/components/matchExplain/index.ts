// Preset 컴포넌트 (권장 사용법)
export { MatchExplain } from './matchExplainPresets';
export type { MatchExplainProps } from './matchExplain.types';

// Layout 컴포넌트 (커스터마이징 필요시)
export { MatchExplainLayout } from './matchExplain';
export type { MatchExplainLayoutProps } from './matchExplain.types';

// Slot 컴포넌트들 (고급 커스터마이징)
export {
  HeaderSlot,
  StatusSlot,
  InfoSlot,
  DescriptionSlot,
} from './matchExplainSlots';
export type {
  HeaderSlotProps,
  StatusSlotProps,
  InfoSlotProps,
  DescriptionSlotProps,
  SportType,
} from './matchExplain.types';

/**
 * 사용 가이드:
 *
 * 기본 사용법 (권장):
 * ```tsx
 * import { MatchExplain } from '@/components/matchExplain';
 *
 * <MatchExplain
 *   sportType="basketball"
 *   location="부산 금정구 부산대학로63번길 2 낙차원1동 농구코트"
 *   startTime="2025-08-09T20:00:00"
 *   duration={120}
 *   currentPeople={8}
 *   maxPeople={10}
 *   deadline="2025-08-09T23:59:00"
 *   description="카테캠 부산대 4팀과 농구하실 사람을 구합니다..."
 * />
 * ```
 *
 * 커스터마이징 (고급):
 * ```tsx
 * import { MatchExplainLayout, HeaderSlot } from '@/components/matchExplain';
 *
 * <MatchExplainLayout
 *   headerSlot={<HeaderSlot sportType="futsal" location="..." />}
 *   statusSlot={<CustomStatusSlot />}
 *   infoSlot={<CustomInfoSlot />}
 *   descriptionSlot={<CustomDescriptionSlot />}
 * />
 * ```
 */
