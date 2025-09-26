import React from 'react';

import { LegacyMatchCard } from './matchCardPresets';
import type { MatchCardProps } from './types';

/**
 * 매치카드 메인 컴포넌트
 *
 * 리팩토링 전략:
 * 1. 기존 코드 수정 없이 동작 보장
 * 2. 내부 구현은 새로운 Layout + Preset 패턴 사용
 * 3. 점진적으로 새 컴포넌트들로 마이그레이션 권장
 *
 * 사용법 (기존과 동일):
 * ```tsx
 * // 기본 매치카드
 * <MatchCard title="부산대 넉넉한 터 농구장" time="8/16 18:00 ~ 22:00" />
 *
 * // 모집중 매치카드
 * <MatchCard
 *   title="부산대 넉넉한 터 농구장"
 *   time="8/16 18:00 ~ 22:00"
 *   showPeopleCount={true}
 *   peopleCount="8/10"
 *   deadline="08/10 23:59"
 * />
 *
 * // 매칭된 매치카드: 취소 가능
 * <MatchCard
 *   title="부산대 넉넉한 터 농구장"
 *   time="8/13 18:00 ~ 22:00"
 *   buttons={[{
 *     text: "취소 하기",
 *     variant: "secondary",
 *     onClick: handleCancel
 *   }]}
 * />
 *
 * // 종료된 매치카드: 결과 확인 가능
 * <MatchCard
 *   title="부산대 넉넉한 터 농구장"
 *   time="8/3 18:00 ~ 22:00"
 *   resultButton={true}
 *   onResultClick={handleResultClick}
 * />
 * ```
 *
 * 새로운 사용법 (권장):
 * ```tsx
 * import {
 *   BasicMatchCard,
 *   RecruitingMatchCard,
 *   SetMatchCard,
 *   FinishedMatchCard
 * } from './matchCardPresets';
 *
 * <RecruitingMatchCard
 *   title="부산대 넉넉한 터 농구장"
 *   time="8/16 18:00 ~ 22:00"
 *   peopleCount="8/10"
 *   deadline="08/10 23:59"
 *   onCardClick={handleCardClick}
 * />
 * ```
 */
const MatchCard: React.FC<MatchCardProps> = (props) => {
  return (
    <LegacyMatchCard
      // 현재 title이 너무 크게 보여 디자인대로 UI가 나오지 않는 문제 발생 중
      // TODO : 추후 디자인 수정할때 해당 내용 반영
      title={props.title}
      time={props.time}
      image={props.image}
      showPeopleCount={props.showPeopleCount}
      peopleCount={props.peopleCount}
      deadline={props.deadline}
      buttons={props.buttons}
      resultButton={props.resultButton}
      onResultClick={props.onResultClick}
      onCardClick={props.onCardClick}
    />
  );
};

export default MatchCard;
