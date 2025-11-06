import React from 'react';

import {
  formatTimeRange,
  formatDeadline,
  isRecruitmentOpen,
} from './constants';
import { MatchExplainLayout } from './matchExplain';
import type { MatchExplainProps } from './matchExplain.types';
import {
  HeaderSlot,
  StatusSlot,
  InfoSlot,
  DescriptionSlot,
} from './matchExplainSlots';

/**
 * MatchExplain
 * Props를 받아서 자동으로 슬롯을 구성하는 편의 컴포넌트
 */
export const MatchExplain: React.FC<MatchExplainProps> = ({
  sportType,
  location,
  startTime,
  duration,
  currentPeople,
  maxPeople,
  deadline,
  description,
  className,
}) => {
  // 유틸리티 함수를 사용하여 데이터 가공
  const timeRange = formatTimeRange(startTime, duration);
  const formattedDeadline = formatDeadline(deadline);
  const isOpen = isRecruitmentOpen(deadline, currentPeople, maxPeople);

  return (
    <MatchExplainLayout
      headerSlot={<HeaderSlot sportType={sportType} location={location} />}
      statusSlot={<StatusSlot isOpen={isOpen} timeRange={timeRange} />}
      infoSlot={
        <InfoSlot
          currentPeople={currentPeople}
          maxPeople={maxPeople}
          deadline={formattedDeadline}
        />
      }
      descriptionSlot={<DescriptionSlot description={description} />}
      className={className}
    />
  );
};

export default MatchExplain;
