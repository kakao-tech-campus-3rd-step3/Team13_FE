import styled from '@emotion/styled';
import { MdAccessTime, MdPeople, MdLocationOn } from 'react-icons/md';

import { colors } from '@/theme/color';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';

/**
 * 매치카드 전체 컨테이너 - 메인 카드 크기와 모양 수정 위치
 *
 * 크기 수정하려면: width, height 값 변경
 * 테두리 수정하려면: border-radius, border 속성 추가/수정
 * 배경색 수정하려면: background 값 변경
 * 반응형 만들려면: @media 쿼리 추가하고 width/height를 %나 vw/vh로 변경
 * 그림자 수정하려면: box-shadow 값 변경
 * 호버 효과 수정하려면: &:hover 내부 스타일 변경
 */
export const LayoutContainer = styled.div`
  /* 배경색 - 카드 전체 배경 */
  background: ${colors.background.default};

  /* 모서리 둥글기 - 카드 테두리 둥근 정도 */
  border-radius: 12px;

  /* 카드 크기 - 반응형으로 만들려면 이 부분을 % 또는 vw로 변경 */
  width: 440px; /* 👈 카드 너비 수정 위치 */
  height: 80px; /* 👈 카드 높이 수정 위치 */

  /* 레이아웃 기본 설정 */
  position: relative;
  display: flex;
  align-items: center; /* 👈 세로 정렬 - center, flex-start, flex-end로 변경 가능 */

  /* 그림자 효과 - 카드 입체감 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* 👈 그림자 크기/색상 수정 위치 */

  /* 인터랙션 효과 */
  cursor: pointer;
  transition: box-shadow 0.2s ease; /* 👈 애니메이션 속도 수정 위치 */

  /* 호버 시 그림자 효과 강화 */
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); /* 👈 호버 그림자 수정 위치 */
  }

  /* 반응형 예시 - 필요시 주석 해제하고 수정
  @media (max-width: 768px) {
    width: 100%;
    height: 70px;
  }
  
  @media (max-width: 480px) {
    width: 100%;
    height: 60px;
    border-radius: 8px;
  }
  */
`;

/**
 * 왼쪽 이미지 영역 - 이미지 크기와 위치 수정 위치
 *
 * 이미지 크기 수정하려면: width, height 값 변경
 * 이미지 위치 수정하려면: margin 값 변경
 * 이미지 테두리 수정하려면: border-radius 값 변경
 * 반응형 이미지 만들려면: width/height를 %로 변경
 */
export const LeftSlot = styled.div`
  /* 이미지 영역 크기 */
  width: 60px; /* 👈 이미지 너비 수정 위치 */
  height: 60px; /* 👈 이미지 높이 수정 위치 */

  /* 이미지 여백 - 카드 내에서의 위치 */
  margin: 10px; /* 👈 이미지 주변 여백 수정 위치 */

  /* 크기 고정 설정 */
  flex-shrink: 0;

  /* 반응형 예시 - 필요시 주석 해제
  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    margin: 8px;
  }
  */
`;

/**
 * 가운데 텍스트 영역 - 제목과 시간 정보 위치 수정 위치
 *
 * 텍스트 위치 수정하려면: padding 값 변경
 * 세로 정렬 수정하려면: justify-content 추가 (flex-start, center, flex-end)
 * 가로 정렬 수정하려면: align-items 추가
 * 텍스트 영역 크기 제한하려면: max-width 추가
 */
export const CenterSlot = styled.div`
  /* 영역 확장 설정 - 남은 공간을 모두 차지 */
  flex: 1;

  /* 텍스트 내부 여백 */
  padding: 17px 0; /* 👈 위아래 여백 수정 위치 (좌우 여백은 0) */

  /* 텍스트 오버플로우 방지 */
  min-width: 0;

  /* 텍스트 세로 정렬 추가 예시 - 필요시 주석 해제
  display: flex;
  flex-direction: column;
  justify-content: center;  // 세로 중앙 정렬
  */

  /* 반응형 패딩 예시 - 필요시 주석 해제
  @media (max-width: 768px) {
    padding: 12px 0;
  }
  */
`;

/**
 * 오른쪽 액션 영역 - 버튼이나 인원 정보 위치 수정 위치
 *
 * 버튼 위치 수정하려면: padding 값 변경
 * 버튼 정렬 수정하려면: justify-content 추가 (flex-start, center, flex-end)
 * 버튼 세로 정렬 수정하려면: align-items 값 변경
 */
export const RightSlot = styled.div`
  /* 버튼 영역 여백 */
  padding: 10px; /* 👈 버튼 주변 여백 수정 위치 */

  /* 크기 고정 - 내용에 맞게 크기 유지 */
  flex-shrink: 0;

  /* 정렬 설정 */
  display: flex;
  align-items: center; /* 👈 세로 정렬 수정 위치 (flex-start, center, flex-end) */

  /* 가로 정렬 추가 예시 - 필요시 주석 해제
  justify-content: flex-end;  // 오른쪽 정렬
  justify-content: center;    // 중앙 정렬  
  justify-content: flex-start; // 왼쪽 정렬
  */
`;

/* ===== 이미지 관련 스타일 ===== */

/**
 * 실제 이미지 스타일 - 이미지 모양 수정 위치
 *
 * 이미지 모서리 수정하려면: border-radius 값 변경
 * 이미지 크롭 방식 수정하려면: object-fit 값 변경 (cover, contain, fill)
 * 이미지 필터 추가하려면: filter 속성 추가
 */
export const SlotImage = styled.img`
  /* 이미지 크기 - 부모 영역에 맞춤 */
  width: 100%;
  height: 100%;

  /* 이미지 모서리 둥글기 */
  border-radius: 8px; /* 👈 이미지 모서리 둥근 정도 수정 위치 */

  /* 이미지 크롭 방식 */
  object-fit: cover; /* 👈 이미지 크롭 방식 수정 위치 (cover, contain, fill) */

  /* 이미지 효과 추가 예시 - 필요시 주석 해제
  filter: brightness(1.1);     // 밝기 조절
  filter: contrast(1.1);       // 대비 조절  
  filter: grayscale(0.2);      // 흑백 효과
  transition: filter 0.2s ease; // 호버 시 부드러운 변화
  
  &:hover {
    filter: brightness(1.2);
  }
  */
`;

/**
 * 이미지 없을 때 플레이스홀더 - 기본 아이콘 영역 스타일 수정 위치
 *
 * 플레이스홀더 배경색 수정하려면: background 값 변경
 * 플레이스홀더 모서리 수정하려면: border-radius 값 변경
 * 플레이스홀더 테두리 추가하려면: border 속성 추가
 */
export const ImagePlaceholder = styled.div`
  /* 플레이스홀더 크기 */
  width: 100%;
  height: 100%;

  /* 플레이스홀더 모서리 */
  border-radius: 8px; /* 👈 플레이스홀더 모서리 수정 위치 */

  /* 플레이스홀더 배경색 */
  background: ${colors.gray[200]}; /* 👈 플레이스홀더 배경색 수정 위치 */

  /* 아이콘 중앙 정렬 */
  display: flex;
  align-items: center;
  justify-content: center;

  /* 아이콘 기본 색상 */
  color: ${colors.gray[500]}; /* 👈 플레이스홀더 아이콘 색상 수정 위치 */

  /* 플레이스홀더 테두리 추가 예시 - 필요시 주석 해제
  border: 1px solid ${colors.gray[300]};
  */
`;

/**
 * 플레이스홀더 위치 아이콘 크기 수정 위치
 *
 * 아이콘 크기 수정하려면: width, height 값 변경
 * 아이콘 색상 수정하려면: color 값 변경
 */
export const PlaceholderLocationIcon = styled(MdLocationOn)`
  /* 아이콘 크기 */
  width: 24px; /* 👈 위치 아이콘 너비 수정 위치 */
  height: 24px; /* 👈 위치 아이콘 높이 수정 위치 */

  /* 아이콘 색상 */
  color: ${colors.gray[500]}; /* 👈 위치 아이콘 색상 수정 위치 */
`;

/* ===== 텍스트 정보 관련 스타일 ===== */

/**
 * 장소명 제목 스타일 - 제목 텍스트 스타일 수정 위치
 *
 * 제목 폰트 크기 수정하려면: font-size 값 변경
 * 제목 색상 수정하려면: color 값 변경
 * 제목 굵기 수정하려면: font-weight 값 변경 (400=보통, 700=굵게)
 * 제목 위치 수정하려면: margin 값 변경
 * 제목 폰트 반응형 만들려면: @media 쿼리 추가
 */
export const InfoTitle = styled.h3`
  /* 제목 폰트 크기 */
  font-size: 12px; /* 👈 제목 크기 수정 위치 */
  font-weight: 400; /* 👈 제목 굵기 수정 위치 (400=보통, 700=굵게) */
  line-height: 15px; /* 👈 제목 줄 높이 수정 위치 */

  /* 제목 색상 */
  color: ${colors.text.default}; /* 👈 제목 색상 수정 위치 */

  /* 제목 여백 */
  margin: 0 0 8px 0; /* 👈 제목 아래 여백 수정 위치 */

  /* 제목 폰트 패밀리 */
  font-family: 'Inter-Regular', sans-serif; /* 👈 제목 폰트 수정 위치 */

  /* 긴 텍스트 처리 */
  overflow: hidden;
  text-overflow: ellipsis; /* 👈 긴 텍스트 ... 표시 */
  white-space: nowrap; /* 👈 텍스트 한 줄로 제한 */

  /* 반응형 폰트 예시 - 필요시 주석 해제
  @media (max-width: 768px) {
    font-size: 11px;
    line-height: 13px;
  }
  
  @media (max-width: 480px) {
    font-size: 10px;
    line-height: 12px;
  }
  */
`;

/**
 * 시간 정보 컨테이너 - 시간 텍스트와 아이콘 배치 수정 위치
 *
 * 시간 아이콘과 텍스트 간격 수정하려면: gap 값 변경
 * 시간 폰트 크기 수정하려면: font-size 값 변경
 * 시간 색상 수정하려면: color 값 변경
 * 시간 정렬 수정하려면: justify-content 추가
 */
export const InfoTime = styled.div`
  /* 시간 정보 레이아웃 */
  display: flex;
  align-items: center; /* 👈 아이콘과 텍스트 세로 정렬 */
  gap: 4px; /* 👈 아이콘과 텍스트 간격 수정 위치 */

  /* 시간 텍스트 색상 */
  color: ${colors.text.default}; /* 👈 시간 텍스트 색상 수정 위치 */

  /* 시간 폰트 스타일 */
  font-size: 12px; /* 👈 시간 폰트 크기 수정 위치 */
  font-weight: 400; /* 👈 시간 폰트 굵기 수정 위치 */
  line-height: 15px; /* 👈 시간 줄 높이 수정 위치 */
  font-family: 'Inter-Regular', sans-serif; /* 👈 시간 폰트 수정 위치 */
`;

/**
 * 시간 아이콘 스타일 - 시계 아이콘 모양 수정 위치
 *
 * 시계 아이콘 색상 수정하려면: color 값 변경
 * 시계 아이콘 크기 수정하려면: font-size 값 변경
 */
export const TimeIcon = styled(MdAccessTime)`
  /* 시계 아이콘 색상 */
  color: ${colors.red[700]}; /* 👈 시계 아이콘 색상 수정 위치 */

  /* 시계 아이콘 크기 */
  font-size: 14px; /* 👈 시계 아이콘 크기 수정 위치 */
`;

/* ===== 인원 정보 관련 스타일 ===== */

/**
 * 인원 정보 전체 컨테이너 - 인원수와 마감일 배치 수정 위치
 *
 * 인원 정보 세로 배치 수정하려면: flex-direction 값 변경 (column, row)
 * 인원 정보 가로 정렬 수정하려면: align-items 값 변경 (flex-start, center, flex-end)
 * 인원 정보 간격 수정하려면: gap 값 변경
 */
export const PeopleInfoContainer = styled.div`
  /* 인원 정보 레이아웃 */
  display: flex;
  flex-direction: column; /* 👈 세로 배치 (row로 변경시 가로 배치) */
  align-items: flex-end; /* 👈 오른쪽 정렬 (flex-start=왼쪽, center=중앙) */
  gap: 8px; /* 👈 인원수와 마감일 사이 간격 수정 위치 */
`;

/**
 * 인원 수 정보 스타일 - 인원수 텍스트와 아이콘 수정 위치
 *
 * 인원 아이콘과 숫자 간격 수정하려면: gap 값 변경
 * 인원 폰트 크기 수정하려면: font-size 값 변경
 * 인원 텍스트 색상 수정하려면: color 값 변경
 * 인원 정보 정렬 수정하려면: justify-content 추가
 */
export const PeopleCount = styled.div`
  /* 인원 정보 레이아웃 */
  display: flex;
  align-items: center; /* 👈 아이콘과 숫자 세로 정렬 */
  gap: 4px; /* 👈 아이콘과 숫자 간격 수정 위치 */

  /* 인원 텍스트 색상 */
  color: ${colors.text.default}; /* 👈 인원 텍스트 색상 수정 위치 */

  /* 인원 폰트 스타일 */
  font-size: 12px; /* 👈 인원 폰트 크기 수정 위치 */
  font-weight: 400; /* 👈 인원 폰트 굵기 수정 위치 */
  font-family: 'Inter-Regular', sans-serif; /* 👈 인원 폰트 수정 위치 */

  /* 텍스트 정렬 */
  text-align: right; /* 👈 인원 텍스트 정렬 수정 위치 (left, center, right) */
`;

/**
 * 인원 아이콘 스타일 - 사람 아이콘 모양 수정 위치
 *
 * 인원 아이콘 색상 수정하려면: color 값 변경
 * 인원 아이콘 크기 수정하려면: font-size 값 변경
 */
export const PeopleIcon = styled(MdPeople)`
  /* 인원 아이콘 색상 */
  color: ${colors.yellow[600]}; /* 👈 인원 아이콘 색상 수정 위치 */

  /* 인원 아이콘 크기 */
  font-size: 14px; /* 👈 인원 아이콘 크기 수정 위치 */
`;

/**
 * 마감일 정보 스타일 - 지원 마감일 텍스트 수정 위치
 *
 * 마감일 폰트 크기 수정하려면: font-size 값 변경
 * 마감일 색상 수정하려면: color 값 변경
 * 마감일 정렬 수정하려면: text-align 값 변경
 */
export const Deadline = styled.div`
  /* 마감일 텍스트 색상 */
  color: ${colors.text.default}; /* 👈 마감일 색상 수정 위치 */

  /* 마감일 폰트 스타일 */
  font-size: 12px; /* 👈 마감일 폰트 크기 수정 위치 */
  font-weight: 400; /* 👈 마감일 폰트 굵기 수정 위치 */
  font-family: 'Inter-Regular', sans-serif; /* 👈 마감일 폰트 수정 위치 */

  /* 마감일 텍스트 정렬 */
  text-align: right; /* 👈 마감일 정렬 수정 위치 (left, center, right) */
`;

/* ===== 액션 버튼 관련 스타일 ===== */

/**
 * 취소하기 버튼 스타일 - 취소 버튼 모양 수정 위치
 *
 * 버튼 크기 수정하려면: padding 값 변경
 * 버튼 모서리 수정하려면: border-radius 값 변경
 * 버튼 색상 수정하려면: border, background, color 값 변경
 * 버튼 폰트 수정하려면: font-size, font-weight 값 변경
 * 버튼 호버 효과 수정하려면: &:hover 내부 스타일 변경
 */
export const CancelButton = styled.button`
  /* 버튼 크기 */
  padding: ${spacing.spacing2} ${spacing.spacing4}; /* 👈 버튼 안쪽 여백 수정 위치 */

  /* 버튼 모양 */
  border-radius: 20px; /* 👈 버튼 모서리 둥근 정도 수정 위치 */
  border: 1px solid ${colors.red[500]}; /* 👈 버튼 테두리 색상 수정 위치 */
  background: ${colors.background.default}; /* 👈 버튼 배경색 수정 위치 */

  /* 버튼 텍스트 색상 */
  color: ${colors.red[700]}; /* 👈 버튼 텍스트 색상 수정 위치 */

  /* 버튼 폰트 */
  font-size: ${typography.body2Regular
    .fontSize}; /* 👈 버튼 폰트 크기 수정 위치 */
  font-weight: ${typography.body2Bold
    .fontWeight}; /* 👈 버튼 폰트 굵기 수정 위치 */

  /* 버튼 기본 설정 */
  cursor: pointer;
  transition: all 0.2s ease; /* 👈 버튼 애니메이션 속도 수정 위치 */
  white-space: nowrap; /* 👈 버튼 텍스트 줄바꿈 방지 */

  /* 버튼 호버 효과 */
  &:hover {
    background: ${colors.red[100]}; /* 👈 호버시 배경색 수정 위치 */
  }

  /* 버튼 클릭 효과 */
  &:active {
    background: ${colors.red[200]}; /* 👈 클릭시 배경색 수정 위치 */
  }

  /* 버튼 비활성화 효과 */
  &:disabled {
    opacity: 0.5; /* 👈 비활성화시 투명도 수정 위치 */
    cursor: not-allowed;
  }
`;

/**
 * 결과 보기 버튼 스타일 - 결과 버튼 모양 수정 위치
 *
 * 버튼 크기 수정하려면: padding 값 변경
 * 버튼 모서리 수정하려면: border-radius 값 변경
 * 버튼 색상 수정하려면: border, background, color 값 변경
 * 버튼 폰트 수정하려면: font-size, font-weight 값 변경
 * 버튼 호버 효과 수정하려면: &:hover 내부 스타일 변경
 */
export const ResultButton = styled.button`
  /* 버튼 크기 */
  padding: ${spacing.spacing2} ${spacing.spacing4}; /* 👈 버튼 안쪽 여백 수정 위치 */

  /* 버튼 모양 */
  border-radius: 20px; /* 👈 버튼 모서리 둥근 정도 수정 위치 */
  border: 1px solid ${colors.blue[700]}; /* 👈 버튼 테두리 색상 수정 위치 */
  background: ${colors.background.default}; /* 👈 버튼 배경색 수정 위치 */

  /* 버튼 텍스트 색상 */
  color: ${colors.blue[700]}; /* 👈 버튼 텍스트 색상 수정 위치 */

  /* 버튼 폰트 */
  font-size: ${typography.body2Regular
    .fontSize}; /* 👈 버튼 폰트 크기 수정 위치 */
  font-weight: ${typography.body2Bold
    .fontWeight}; /* 👈 버튼 폰트 굵기 수정 위치 */

  /* 버튼 기본 설정 */
  cursor: pointer;
  transition: all 0.2s ease; /* 👈 버튼 애니메이션 속도 수정 위치 */
  white-space: nowrap; /* 👈 버튼 텍스트 줄바꿈 방지 */

  /* 버튼 호버 효과 */
  &:hover {
    background: ${colors.blue[100]}; /* 👈 호버시 배경색 수정 위치 */
  }

  /* 버튼 클릭 효과 */
  &:active {
    background: ${colors.blue[200]}; /* 👈 클릭시 배경색 수정 위치 */
  }

  /* 버튼 비활성화 효과 */
  &:disabled {
    opacity: 0.5; /* 👈 비활성화시 투명도 수정 위치 */
    cursor: not-allowed;
  }
`;
