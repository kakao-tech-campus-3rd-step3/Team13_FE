import React from 'react';

/**
 * 매치카드 레이아웃의 3개 슬롯에 들어갈 수 있는 컨텐츠 타입
 * - left: 이미지 또는 커스텀 컨텐츠
 * - center: 제목/시간 정보 또는 커스텀 컨텐츠
 * - right: 인원정보, 버튼 등 액션 관련 컨텐츠
 */
export interface MatchCardLayoutProps {
  /** 왼쪽 슬롯 - 주로 이미지가 들어감 */
  leftSlot?: React.ReactNode;
  /** 가운데 슬롯 - 주로 제목과 시간 정보가 들어감 */
  centerSlot?: React.ReactNode;
  /** 오른쪽 슬롯 - 주로 인원정보나 액션 버튼이 들어감 */
  rightSlot?: React.ReactNode;
  /** 전체 카드 클릭 이벤트 핸들러 */
  onCardClick?: () => void;
  /** 커스텀 클래스명 추가 */
  className?: string;
}

/**
 * 이미지 슬롯 컴포넌트의 props
 */
export interface ImageSlotProps {
  /** 이미지 URL */
  src?: string;
  /** 이미지 alt 텍스트 */
  alt?: string;
  /** 이미지가 없을 때 표시할 아이콘 (기본값: LocationIcon) */
  placeholder?: React.ReactNode;
}

/**
 * 정보 슬롯 컴포넌트의 props (제목 + 시간)
 */
export interface InfoSlotProps {
  /** 장소명 */
  title: string;
  /** 시간 정보 */
  time: string;
}

/**
 * 인원 정보 슬롯 컴포넌트의 props
 */
export interface PeopleInfoSlotProps {
  /** 인원 수 정보 (예: "8/10") */
  peopleCount: string;
  /** 지원 마감일 (예: "08/10 23:59") */
  deadline?: string;
}

/**
 * 액션 버튼 슬롯 컴포넌트의 props
 */
export interface ActionSlotProps {
  /** 버튼 텍스트 */
  text: string;
  /** 버튼 스타일 변형 */
  variant?: 'cancel' | 'result';
  /** 클릭 이벤트 핸들러 */
  onClick: (e: React.MouseEvent) => void;
  /** 비활성화 여부 */
  disabled?: boolean;
}

/**
 * 기존 MatchCardProps와의 호환성을 위한 props
 * Progressive Enhancement 패턴을 위해 기존 인터페이스도 지원
 */
// TODO : 추후 기존 인터페이스 관련 코드는 삭제
export interface CompatibleMatchCardProps {
  // 기본 정보
  title: string;
  time: string;
  image?: string;

  // 사람 수 관련 (recruitingMatchCard용)
  showPeopleCount?: boolean;
  peopleCount?: string;
  deadline?: string;

  // 버튼 관련 (setMatchCard, finishedMatchCard용)
  buttons?: Array<{
    text: string;
    variant: 'primary' | 'secondary';
    onClick: () => void;
    disabled?: boolean;
  }>;
  resultButton?: boolean;
  onResultClick?: () => void;

  // 이벤트 핸들러
  onCardClick?: () => void;
}
