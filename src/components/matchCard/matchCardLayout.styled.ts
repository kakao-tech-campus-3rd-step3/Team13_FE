import styled from '@emotion/styled';
import { MdAccessTime, MdPeople, MdLocationOn } from 'react-icons/md';

import { colors } from '@/theme/color';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';

/**
 * 매치카드 레이아웃의 최외곽 컨테이너
 * - 3-slot 구조의 기반이 되는 컨테이너
 * - 기존 CardContainer 스타일을 유지
 */
export const LayoutContainer = styled.div`
  background: ${colors.background.default};
  border-radius: 12px;
  /* TODO: 반응형 디자인 적용 시 이 고정값들을 변경해야 함 */
  width: 440px;
  height: 80px;
  position: relative;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: box-shadow 0.2s ease;
  display: flex;
  align-items: center;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

/**
 * 왼쪽 슬롯 영역 (이미지 영역)
 * - 고정된 크기와 위치
 * - 이미지나 플레이스홀더가 들어감
 */
export const LeftSlot = styled.div`
  /* TODO: 반응형 디자인 적용 시 이 고정값들을 변경해야 함 */
  width: 60px;
  height: 60px;
  margin: 10px;
  flex-shrink: 0; /* 크기 고정 */
`;

/**
 * 가운데 슬롯 영역 (제목 + 시간 정보)
 * - 남은 공간을 유연하게 차지
 * - 오른쪽 슬롯이 있을 때는 공간을 공유
 */
export const CenterSlot = styled.div`
  flex: 1;
  padding: 17px 0;
  min-width: 0; /* flex item이 최소 크기보다 작아질 수 있도록 */
`;

/**
 * 오른쪽 슬롯 영역 (액션 버튼, 인원 정보 등)
 * - 내용에 따라 크기가 결정됨
 * - 없으면 CenterSlot이 전체 공간을 차지
 */
export const RightSlot = styled.div`
  padding: 10px;
  flex-shrink: 0; /* 내용에 맞게 크기 유지 */
  display: flex;
  align-items: center;
`;

/* ===== 이미지 슬롯 관련 스타일 ===== */

/**
 * 매치 장소 이미지
 * - 기존 CardImage 스타일을 슬롯 시스템에 맞게 조정
 */
export const SlotImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  object-fit: cover;
`;

/**
 * 이미지가 없을 때의 플레이스홀더
 * - 위치 아이콘이 기본으로 표시됨
 */
export const ImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  background: ${colors.gray[200]};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.gray[500]};
`;

/**
 * 플레이스홀더 내의 위치 아이콘
 */
export const PlaceholderLocationIcon = styled(MdLocationOn)`
  /* TODO: 반응형 디자인 적용 시 이 고정값을 변경해야 함 */
  width: 24px;
  height: 24px;
  color: ${colors.gray[500]};
`;

/* ===== 정보 슬롯 관련 스타일 ===== */

// TODO : 해당 title(장소), subtitle(시간) 디자인 수정 필요
/**
 * 제목 (장소명)
 * - "장소: " prefix가 포함됨
 */
export const InfoTitle = styled.h3`
  /* TODO: 반응형 디자인 적용 시 이 고정값들을 변경해야 함 */
  font-size: 12px;
  font-weight: 400;
  line-height: 15px;
  color: ${colors.text.default};
  margin: 0 0 8px 0;
  font-family: 'Inter-Regular', sans-serif;
  /* 텍스트가 길 경우 말줄임표 처리 */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

/**
 * 시간 정보 컨테이너
 * - 시계 아이콘 + 시간 텍스트
 */
export const InfoTime = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${colors.text.default};
  /* TODO: 반응형 디자인 적용 시 이 고정값들을 변경해야 함 */
  font-size: 12px;
  font-weight: 400;
  line-height: 15px;
  font-family: 'Inter-Regular', sans-serif;
`;

/**
 * 시간 정보의 시계 아이콘
 */
export const TimeIcon = styled(MdAccessTime)`
  color: ${colors.red[700]};
  /* TODO: 반응형 디자인 적용 시 이 고정값을 변경해야 함 */
  font-size: 14px;
`;

/* ===== 인원 정보 슬롯 관련 스타일 ===== */

/**
 * 인원 정보 전체 컨테이너
 * - 인원 수와 마감일을 세로로 배치
 */
export const PeopleInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
`;

/**
 * 인원 수 정보 (아이콘 + 텍스트)
 */
export const PeopleCount = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${colors.text.default};
  /* TODO: 반응형 디자인 적용 시 이 고정값들을 변경해야 함 */
  font-size: 12px;
  font-weight: 400;
  font-family: 'Inter-Regular', sans-serif;
  text-align: right;
`;

/**
 * 인원 수의 사람 아이콘
 */
export const PeopleIcon = styled(MdPeople)`
  color: ${colors.yellow[600]};
  /* TODO: 반응형 디자인 적용 시 이 고정값을 변경해야 함 */
  font-size: 14px;
`;

/**
 * 지원 마감일 정보
 */
export const Deadline = styled.div`
  color: ${colors.text.default};
  /* TODO: 반응형 디자인 적용 시 이 고정값들을 변경해야 함 */
  font-size: 12px;
  font-weight: 400;
  font-family: 'Inter-Regular', sans-serif;
  text-align: right;
`;

/* ===== 액션 슬롯 관련 스타일 ===== */

/**
 * 취소하기 버튼 (setMatchCard용)
 * - 빨간색 테두리의 보조 버튼 스타일
 */
export const CancelButton = styled.button`
  padding: ${spacing.spacing2} ${spacing.spacing4};
  border-radius: 20px;
  border: 1px solid ${colors.red[500]};
  background: ${colors.background.default};
  color: ${colors.red[700]};
  font-size: ${typography.body2Regular.fontSize};
  font-weight: ${typography.body2Bold.fontWeight};
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: ${colors.red[100]};
  }

  &:active {
    background: ${colors.red[200]};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

/**
 * 결과 보기 버튼 (finishedMatchCard용)
 * - 파란색 테두리의 버튼 스타일
 */
export const ResultButton = styled.button`
  padding: ${spacing.spacing2} ${spacing.spacing4};
  border-radius: 20px;
  border: 1px solid ${colors.blue[700]};
  background: ${colors.background.default};
  color: ${colors.blue[700]};
  font-size: ${typography.body2Regular.fontSize};
  font-weight: ${typography.body2Bold.fontWeight};
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: ${colors.blue[100]};
  }

  &:active {
    background: ${colors.blue[200]};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
