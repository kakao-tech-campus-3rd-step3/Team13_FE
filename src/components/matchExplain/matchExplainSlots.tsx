import React from 'react';

import { SPORT_LABELS, SPORT_ICONS } from './constants';
import * as S from './matchExplain.styled';
import type {
  HeaderSlotProps,
  StatusSlotProps,
  InfoSlotProps,
  DescriptionSlotProps,
} from './matchExplain.types';

/**
 * HeaderSlot - 최상단 영역
 * 스포츠 아이콘 + 스포츠명 + 장소를 표시
 */
export const HeaderSlot: React.FC<HeaderSlotProps> = ({
  sportType,
  location,
}) => {
  return (
    <S.HeaderSection>
      <S.SportIcon src={SPORT_ICONS[sportType]} alt={SPORT_LABELS[sportType]} />
      <S.SportInfo>
        <S.SportName>{SPORT_LABELS[sportType]}</S.SportName>
        <S.Location>
          <S.LocationIcon />
          {location}
        </S.Location>
      </S.SportInfo>
    </S.HeaderSection>
  );
};

/**
 * StatusSlot - 상단 영역
 * 모집 상태 배지 + 시간 범위를 표시
 */
export const StatusSlot: React.FC<StatusSlotProps> = ({
  isOpen,
  timeRange,
}) => {
  return (
    <S.StatusSection>
      <S.RecruitmentBadge isOpen={isOpen}>
        {isOpen ? '모집중' : '모집완료'}
      </S.RecruitmentBadge>
      <S.TimeRange>{timeRange}</S.TimeRange>
    </S.StatusSection>
  );
};

/**
 * InfoSlot - 중단 영역
 * 현재 인원 + 마감 시간을 표시
 */
export const InfoSlot: React.FC<InfoSlotProps> = ({
  currentPeople,
  maxPeople,
  deadline,
}) => {
  return (
    <S.InfoSection>
      <S.PeopleInfo>
        <S.PeopleIcon />
        현재 매칭 인원: {currentPeople}/{maxPeople}
      </S.PeopleInfo>
      <S.DeadlineInfo>지원 마감 시간: {deadline}</S.DeadlineInfo>
    </S.InfoSection>
  );
};

/**
 * DescriptionSlot - 하단 영역
 * 매치 설명을 표시 (스크롤 가능)
 */
export const DescriptionSlot: React.FC<DescriptionSlotProps> = ({
  description,
}) => {
  return (
    <S.DescriptionSection>
      <S.DescriptionText>{description}</S.DescriptionText>
    </S.DescriptionSection>
  );
};
