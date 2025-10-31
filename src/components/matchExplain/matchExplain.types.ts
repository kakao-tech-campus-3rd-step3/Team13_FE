import React from 'react';

/**
 * 스포츠 종류 타입: 추후 확장 가능
 */
export type SportType = 'futsal' | 'basketball';

/**
 * MatchExplain 메인 Props
 * 매치 상세 정보를 표시하는 컴포넌트
 */
export interface MatchExplainProps {
  /** 스포츠 종류 */
  sportType: SportType;
  /** 운동 장소 */
  location: string;
  /** 시작 시간 (ISO 8601) */
  startTime: string;
  /** 지속 시간 (분 단위) */
  duration: number;
  /** 현재 매칭 인원 */
  currentPeople: number;
  /** 제한 인원 */
  maxPeople: number;
  /** 지원 마감 시간 (ISO 8601) */
  deadline: string;
  /** 매치 설명 */
  description: string;
  /** 추가 CSS 클래스 */
  className?: string;
}

/**
 * MatchExplainLayout Props
 * 4개의 슬롯을 조합하는 레이아웃 컴포넌트
 */
export interface MatchExplainLayoutProps {
  /** 최상단 슬롯: 스포츠 아이콘 + 한글명 + 장소 */
  headerSlot?: React.ReactNode;
  /** 상단 슬롯: 모집 상태 + 시간 범위 */
  statusSlot?: React.ReactNode;
  /** 중단 슬롯: 현재 인원 + 마감 시간 */
  infoSlot?: React.ReactNode;
  /** 하단 슬롯: 매치 설명 (스크롤 가능) */
  descriptionSlot?: React.ReactNode;
  /** 추가 CSS 클래스 */
  className?: string;
}

/**
 * HeaderSlot Props
 * 스포츠 아이콘, 한글명, 장소를 표시
 */
export interface HeaderSlotProps {
  /** 스포츠 종류 */
  sportType: SportType;
  /** 운동 장소 */
  location: string;
}

/**
 * StatusSlot Props
 * 모집 상태와 시간 범위를 표시
 */
export interface StatusSlotProps {
  /** 모집 중 여부 */
  isOpen: boolean;
  /** 포맷된 시간 범위 문자열 */
  timeRange: string;
}

/**
 * InfoSlot Props
 * 현재 인원과 마감 시간을 표시
 */
export interface InfoSlotProps {
  /** 현재 매칭 인원 */
  currentPeople: number;
  /** 제한 인원 */
  maxPeople: number;
  /** 포맷된 마감 시간 문자열 */
  deadline: string;
}

/**
 * DescriptionSlot Props
 * 매치 설명을 표시 (스크롤 가능)
 */
export interface DescriptionSlotProps {
  /** 매치 설명 (여러 줄) */
  description: string;
}
