import styled from '@emotion/styled';
import { MdLocationOn, MdPeople } from 'react-icons/md';

import { colors } from '@/theme/color';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';

/**
 * 전체 레이아웃 컨테이너
 */
export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: ${colors.background.default};
  border: 1px solid ${colors.gray[300]};
  border-radius: ${spacing.spacing2};
  padding: ${spacing.spacing5};
  gap: ${spacing.spacing4};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

/* ===== HeaderSection (최상단 영역) ===== */

/**
 * 최상단 영역: 스포츠 아이콘 + 스포츠명 + 장소
 */
export const HeaderSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.spacing3};
  padding-bottom: ${spacing.spacing3};
  border-bottom: 1px solid ${colors.gray[200]};
`;

/**
 * 스포츠 아이콘 이미지
 */
export const SportIcon = styled.img`
  width: ${spacing.spacing12};
  height: ${spacing.spacing12};
  flex-shrink: 0;
  object-fit: contain;
`;

/**
 * 스포츠 정보 영역 (스포츠명 + 장소)
 */
export const SportInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.spacing1};
  flex: 1;
  min-width: 0;
`;

/**
 * 스포츠 한글명
 */
export const SportName = styled.div`
  ${typography.title2Bold};
  color: ${colors.text.default};
`;

/**
 * 장소 텍스트
 */
export const Location = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.spacing1};
  ${typography.body2Regular};
  color: ${colors.text.sub};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

/**
 * 위치 아이콘
 */
export const LocationIcon = styled(MdLocationOn)`
  font-size: ${spacing.spacing4};
  color: ${colors.gray[500]};
  flex-shrink: 0;
`;

/* ===== StatusSection (상단 영역) ===== */

/**
 * 상단 영역: 모집 상태 배지 + 시간 범위
 */
export const StatusSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.spacing2};
  padding-bottom: ${spacing.spacing3};
  border-bottom: 1px solid ${colors.gray[200]};
`;

/**
 * 모집 상태 배지
 */
export const RecruitmentBadge = styled.span<{ isOpen: boolean }>`
  display: inline-block;
  padding: ${spacing.spacing1} ${spacing.spacing3};
  border-radius: ${spacing.spacing1};
  ${typography.body2Bold};
  width: fit-content;
  background: ${({ isOpen }) => (isOpen ? colors.green[100] : colors.red[100])};
  color: ${({ isOpen }) => (isOpen ? colors.green[600] : colors.red[700])};
`;

/**
 * 시간 범위 텍스트
 */
export const TimeRange = styled.div`
  ${typography.subtitle1Bold};
  color: ${colors.text.default};
`;

/* ===== InfoSection (중단 영역) ===== */

/**
 * 중단 영역: 현재 인원 + 마감 시간
 */
export const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.spacing2};
  padding-bottom: ${spacing.spacing3};
  border-bottom: 1px solid ${colors.gray[200]};
`;

/**
 * 현재 매칭 인원 텍스트
 */
export const PeopleInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.spacing2};
  ${typography.body1Regular};
  color: ${colors.text.default};
`;

/**
 * 인원 아이콘 (matchCard와 동일한 색상)
 */
export const PeopleIcon = styled(MdPeople)`
  font-size: ${spacing.spacing5};
  color: ${colors.yellow[600]};
  flex-shrink: 0;
`;

/**
 * 마감 시간 텍스트 (빨간색 강조)
 */
export const DeadlineInfo = styled.div`
  ${typography.body1Regular};
  color: ${colors.red[700]};
`;

/* ===== DescriptionSection (하단 영역) ===== */

/**
 * 하단 영역: 매치 설명 (스크롤 가능)
 */
export const DescriptionSection = styled.div`
  flex: 1;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: ${spacing.spacing2};
  }

  &::-webkit-scrollbar-track {
    background: ${colors.gray[100]};
    border-radius: ${spacing.spacing1};
  }

  &::-webkit-scrollbar-thumb {
    background: ${colors.gray[400]};
    border-radius: ${spacing.spacing1};

    &:hover {
      background: ${colors.gray[500]};
    }
  }
`;

/**
 * 매치 설명 텍스트
 */
export const DescriptionText = styled.p`
  ${typography.body1Regular};
  color: ${colors.text.default};
  white-space: pre-wrap;
  word-wrap: break-word;
  margin: 0;
  line-height: 1.6;
`;
