import styled from '@emotion/styled';
import { MdAccessTime, MdPeople, MdLocationOn } from 'react-icons/md';

import { colors } from '@/theme/color';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';

/**
 * 매치카드 전체 컨테이너
 */
export const LayoutContainer = styled.div`
  /* 배경색 - 카드 전체 배경 */
  background: ${colors.background.default};

  /* 모서리 둥글기 - 카드 테두리 둥근 정도 */
  border-radius: 0px;
  border: 1px solid ${colors.gray[300]};

  /* 카드 크기 - 상위 컨테이너 크기에 비례 */
  width: 100%; /* 카드 너비 */
  height: 80px; /* 카드 높이 */

  /* 레이아웃 기본 설정 */
  position: relative;
  display: flex;
  align-items: center; /* 세로 정렬 */

  /* 그림자 효과 - 카드 입체감 */
  box-shadow: 0 0px 0px rgba(0, 0, 0, 0.1); /* 기본 그림자 */

  /* 인터랙션 효과 */
  cursor: pointer;
  transition: box-shadow 0.2s ease; /* 애니메이션 속도 */

  /* 호버 시 그림자 효과 강화 */
  &:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15); /* 호버 그림자 */
  }
`;

/**
 * 왼쪽 이미지 영역
 */
export const LeftSlot = styled.div`
  /* 이미지 영역 크기 */
  width: 60px; /* 이미지 너비 */
  height: 60px; /* 이미지 높이 */

  /* 이미지 여백 - 카드 내에서의 위치 */
  margin: 10px; /* 이미지 주변 여백 */

  /* 크기 고정 설정 */
  flex-shrink: 0;
`;

/**
 * 실제 이미지 스타일
 */
export const SlotImage = styled.img`
  /* 이미지 크기 - 부모 영역에 맞춤 */
  width: 100%;
  height: 100%;

  /* 이미지 모서리 둥글기 */
  border-radius: 0px; /* 이미지 둥근 정도 */

  /* 이미지 크롭 방식 */
  object-fit: cover; /* 이미지 자르기 방식 */
`;

/**
 * 이미지 플레이스홀더
 */
export const ImagePlaceholder = styled.div`
  /* 플레이스홀더 크기 */
  width: 100%;
  height: 100%;

  /* 플레이스홀더 모서리 */
  border-radius: 0px; /* 모서리 둥근 정도 */

  /* 플레이스홀더 배경색 */
  background: ${colors.gray[200]}; /* 배경색 */

  /* 아이콘 중앙 정렬 */
  display: flex;
  align-items: center;
  justify-content: center;

  /* 아이콘 기본 색상 */
  color: ${colors.gray[500]}; /* 아이콘 색상 */

  /* 플레이스홀더 테두리 */
  border: 1px solid ${colors.gray[300]};
`;

/**
 * 플레이스홀더 위치 아이콘
 */
export const PlaceholderLocationIcon = styled(MdLocationOn)`
  /* 아이콘 크기 */
  width: 30px; /* 아이콘 너비 */
  height: 30px; /* 아이콘 높이 */

  /* 아이콘 색상 */
  color: ${colors.gray[500]}; /* 아이콘 색상 */
`;

/**
 * 가운데 텍스트 영역
 */
export const CenterSlot = styled.div`
  /* 영역 확장 설정 - 남은 공간을 모두 차지 */
  flex: 1;

  /* Flutter의 MainAxisAlignment.spaceEvenly와 동일한 효과 */
  display: flex;
  flex-direction: column; /* 세로 방향 배치 */
  justify-content: center;
  gap: 8px;

  /* 텍스트 오버플로우 방지 */
  min-width: 0;
`;

/**
 * 장소명 제목 스타일
 */
export const InfoTitle = styled.span`
  display: block; /* 블록 요소처럼 동작 */

  /* 제목 폰트 크기 */
  font-size: 12px; /* 제목 크기 */
  font-weight: 400; /* 제목 굵기 */
  line-height: 15px; /* 제목 줄 높이 */

  /* 제목 폰트 스타일 */
  ${typography.subtitle2Bold};
  color: ${colors.text.default};

  /* 제목 폰트 패밀리 */
  font-family: 'Inter-Regular', sans-serif; /* 제목 폰트 */

  /* 긴 텍스트 처리 */
  overflow: hidden;
  text-overflow: ellipsis; /* 긴 텍스트 ... 표시 */
  white-space: nowrap; /* 텍스트 한 줄로 제한 */
`;

/**
 * 시간 정보 컨테이너
 */
export const InfoTime = styled.div`
  /* 시간 정보 레이아웃 */
  display: flex;
  align-items: center; /* 아이콘과 텍스트 세로 정렬 */
  gap: 2px; /* 아이콘과 텍스트 간격 */

  /* 시간 텍스트 색상 */
  color: ${colors.text.default}; /* 시간 텍스트 색상 */

  /* 시간 폰트 스타일 */
  font-size: 12px; /* 시간 폰트 크기 */
  font-weight: 400; /* 시간 폰트 굵기 */
  line-height: 15px; /* 시간 줄 높이 */
  font-family: 'Inter-Regular', sans-serif; /* 시간 폰트 */
`;

/**
 * 시간 아이콘 스타일
 */
export const TimeIcon = styled(MdAccessTime)`
  /* 시계 아이콘 색상 */
  color: ${colors.red[700]}; /* 시계 아이콘 색상 */

  /* 시계 아이콘 크기 */
  font-size: 15px; /* 시계 아이콘 크기 */
`;

/**
 * 오른쪽 액션 영역
 */
export const RightSlot = styled.div`
  /* 버튼 영역 여백 */
  padding: 10px; /* 버튼 주변 여백 */

  /* 크기 고정 - 내용에 맞게 크기 유지 */
  flex-shrink: 0;

  /* 정렬 설정 */
  display: flex;
  align-items: center; /* 세로 정렬 */
  justify-content: flex-end; /* 가로 정렬 */
`;

/* ===== 인원 정보 관련 스타일 ===== */

/**
 * 인원 정보 전체 컨테이너
 */
export const PeopleInfoContainer = styled.div`
  /* 인원 정보 레이아웃 */
  display: flex;
  flex-direction: column; /* 세로 배치 */
  align-items: flex-end; /* 오른쪽 정렬 */
  gap: 8px; /* 인원수와 마감일 사이 간격 */
`;

/**
 * 인원 수 정보 스타일
 */
export const PeopleCount = styled.div`
  /* 인원 정보 레이아웃 */
  display: flex;
  align-items: center; /* 아이콘과 숫자 세로 정렬 */
  gap: 4px; /* 아이콘과 숫자 간격 */

  /* 인원 텍스트 색상 */
  color: ${colors.text.default}; /* 인원 텍스트 색상 */

  /* 인원 폰트 스타일 */
  font-size: 12px; /* 인원 폰트 크기 */
  font-weight: 400; /* 인원 폰트 굵기 */
  font-family: 'Inter-Regular', sans-serif; /* 인원 폰트 */

  /* 텍스트 정렬 */
  text-align: right; /* 인원 텍스트 정렬 */
`;

/**
 * 인원 아이콘 스타일
 */
export const PeopleIcon = styled(MdPeople)`
  /* 인원 아이콘 색상 */
  color: ${colors.yellow[600]}; /* 인원 아이콘 색상 */

  /* 인원 아이콘 크기 */
  font-size: 15px; /* 인원 아이콘 크기 */
`;

/**
 * 마감일 정보 스타일
 */
export const Deadline = styled.div`
  /* 마감일 텍스트 색상 */
  color: ${colors.text.default}; /* 마감일 색상 */

  /* 마감일 폰트 스타일 */
  font-size: 12px; /* 마감일 폰트 크기 */
  font-weight: 400; /* 마감일 폰트 굵기 */
  font-family: 'Inter-Regular', sans-serif; /* 마감일 폰트 */

  /* 마감일 텍스트 정렬 */
  text-align: right; /* 마감일 정렬 */
`;

/* ===== 액션 버튼 관련 스타일 ===== */

/**
 * 취소하기 버튼 스타일
 */
export const CancelButton = styled.button`
  /* 버튼 크기 */
  padding: ${spacing.spacing2} ${spacing.spacing4}; /* 버튼 안쪽 여백 */

  /* 버튼 모양 */
  border-radius: 20px; /* 버튼 모서리 둥근 정도 */
  border: 1px solid ${colors.red[500]}; /* 버튼 테두리 색상 */
  background: ${colors.background.default}; /* 버튼 배경색 */

  /* 버튼 텍스트 색상 */
  color: ${colors.red[700]}; /* 버튼 텍스트 색상 */

  /* 버튼 폰트 */
  font-size: ${typography.body2Regular.fontSize}; /* 버튼 폰트 크기 */
  font-weight: ${typography.body2Bold.fontWeight}; /* 버튼 폰트 굵기 */

  /* 버튼 기본 설정 */
  cursor: pointer;
  transition: all 0.2s ease; /* 버튼 애니메이션 속도 */
  white-space: nowrap; /* 버튼 텍스트 줄바꿈 방지 */

  /* 버튼 호버 효과 */
  &:hover {
    background: ${colors.red[100]}; /* 호버시 배경색 */
  }

  /* 버튼 클릭 효과 */
  &:active {
    background: ${colors.red[200]}; /* 클릭시 배경색 */
  }

  /* 버튼 비활성화 효과 */
  &:disabled {
    opacity: 0.5; /* 비활성화시 투명도 */
    cursor: not-allowed;
  }
`;

/**
 * 결과 보기 버튼 스타일
 */
export const ResultButton = styled.button`
  /* 버튼 크기 */
  padding: ${spacing.spacing2} ${spacing.spacing4}; /* 버튼 안쪽 여백 */

  /* 버튼 모양 */
  border-radius: 20px; /* 버튼 모서리 둥근 정도 */
  border: 1px solid ${colors.blue[700]}; /* 버튼 테두리 색상 */
  background: ${colors.background.default}; /* 버튼 배경색 */

  /* 버튼 텍스트 색상 */
  color: ${colors.blue[700]}; /* 버튼 텍스트 색상 */

  /* 버튼 폰트 */
  font-size: ${typography.body2Regular.fontSize}; /* 버튼 폰트 크기 */
  font-weight: ${typography.body2Bold.fontWeight}; /* 버튼 폰트 굵기 */

  /* 버튼 기본 설정 */
  cursor: pointer;
  transition: all 0.2s ease; /* 버튼 애니메이션 속도 */
  white-space: nowrap; /* 버튼 텍스트 줄바꿈 방지 */

  /* 버튼 호버 효과 */
  &:hover {
    background: ${colors.blue[100]}; /* 호버시 배경색 */
  }

  /* 버튼 클릭 효과 */
  &:active {
    background: ${colors.blue[200]}; /* 클릭시 배경색 */
  }

  /* 버튼 비활성화 효과 */
  &:disabled {
    opacity: 0.5; /* 비활성화시 투명도 */
    cursor: not-allowed;
  }
`;

/**
 * 완료된 매치카드 컨테이너
 */
export const FinishedCardContainer = styled(LayoutContainer)`
  /* 완료된 카드 전체 투명도 효과 */
  opacity: 0.6;

  /* 완료된 카드 이미지 블러 효과 - 클래스 셀렉터 사용 */
  .left-slot {
    filter: blur(1px);
  }

  /* 호버 시 약간 더 선명하게 */
  &:hover {
    opacity: 0.8;

    .left-slot {
      filter: blur(0.5px);
    }
  }
`;
