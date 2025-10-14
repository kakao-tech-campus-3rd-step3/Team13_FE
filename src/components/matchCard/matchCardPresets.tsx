import React from 'react';

import { MatchCardLayout, FinishedMatchCardLayout } from './matchCardLayout';
import {
  ImageSlot,
  InfoSlot,
  PeopleInfoSlot,
  ActionSlot,
} from './matchCardSlots';

/**
 * 버튼 설정 객체
 * 버튼 텍스트와 감지 로직을 중앙화하여 관리
 */
const BUTTON_CONFIG = {
  cancel: {
    text: '취소하기',
    variant: 'cancel' as const,
  },
  result: {
    text: '결과 보기',
    variant: 'result' as const,
  },
} as const;

/**
 * 기본 매치카드 컴포넌트
 *
 * 사용 케이스: 단순한 매치 정보만 표시 (오른쪽 슬롯 없음)
 * 구성 요소:
 * - 왼쪽: 이미지
 * - 가운데: 장소 + 시간 정보
 * - 오른쪽: 없음
 */
export interface BasicMatchCardProps {
  /** 장소명 */
  title: string;
  /** 시간 정보 */
  time: string;
  /** 이미지 URL (선택) */
  image?: string;
  /** 카드 클릭 이벤트 */
  onCardClick?: () => void;
}

export const BasicMatchCard: React.FC<BasicMatchCardProps> = ({
  title,
  time,
  image,
  onCardClick,
}) => {
  return (
    <MatchCardLayout
      leftSlot={<ImageSlot src={image} alt={title} />}
      centerSlot={<InfoSlot title={title} time={time} />}
      onCardClick={onCardClick}
    />
  );
};

/**
 * 모집중 매치카드 컴포넌트
 *
 * 사용 케이스: 인원 모집 중인 매치 표시
 * 구성 요소:
 * - 왼쪽: 이미지
 * - 가운데: 장소 + 시간 정보
 * - 오른쪽: 제한 인원 + 지원 마감일
 */
export interface RecruitingMatchCardProps {
  /** 장소명 */
  title: string;
  /** 시간 정보 */
  time: string;
  /** 이미지 URL (선택) */
  image?: string;
  /** 인원 수 정보 (예: "8/10") */
  peopleCount: string;
  /** 지원 마감일 (선택, 예: "08/10 23:59") */
  deadline?: string;
  /** 카드 클릭 이벤트 */
  onCardClick?: () => void;
}

export const RecruitingMatchCard: React.FC<RecruitingMatchCardProps> = ({
  title,
  time,
  image,
  peopleCount,
  deadline,
  onCardClick,
}) => {
  return (
    <MatchCardLayout
      leftSlot={<ImageSlot src={image} alt={title} />}
      centerSlot={<InfoSlot title={title} time={time} />}
      rightSlot={
        <PeopleInfoSlot peopleCount={peopleCount} deadline={deadline} />
      }
      onCardClick={onCardClick}
    />
  );
};

/**
 * 매치 예약 설정 카드 컴포넌트
 *
 * 사용 케이스: 예약된 매치에서 취소 기능 제공
 * 구성 요소:
 * - 왼쪽: 이미지
 * - 가운데: 장소 + 시간 정보
 * - 오른쪽: 취소하기 버튼
 */
export interface SetMatchCardProps {
  /** 장소명 */
  title: string;
  /** 시간 정보 */
  time: string;
  /** 이미지 URL (선택) */
  image?: string;
  /** 취소 버튼 클릭 이벤트 */
  onCancelClick: () => void;
  /** 카드 클릭 이벤트 (선택) */
  onCardClick?: () => void;
  /** 취소 버튼 비활성화 여부 */
  cancelDisabled?: boolean;
}

export const SetMatchCard: React.FC<SetMatchCardProps> = ({
  title,
  time,
  image,
  onCancelClick,
  onCardClick,
  cancelDisabled = false,
}) => {
  return (
    <MatchCardLayout
      leftSlot={<ImageSlot src={image} alt={title} />}
      centerSlot={<InfoSlot title={title} time={time} />}
      rightSlot={
        <ActionSlot
          text={BUTTON_CONFIG.cancel.text}
          variant={BUTTON_CONFIG.cancel.variant}
          onClick={onCancelClick}
          disabled={cancelDisabled}
        />
      }
      onCardClick={onCardClick}
    />
  );
};

/**
 * 완료된 매치카드 컴포넌트
 *
 * 사용 케이스: 종료된 매치의 결과 확인 기능 제공
 * 구성 요소:
 * - 왼쪽: 이미지 (보통 흑백 처리되거나 투명도 적용)
 * - 가운데: 장소 + 시간 정보
 * - 오른쪽: 결과 보기 버튼
 */
export interface FinishedMatchCardProps {
  /** 장소명 */
  title: string;
  /** 시간 정보 */
  time: string;
  /** 이미지 URL (선택) */
  image?: string;
  /** 결과 보기 버튼 클릭 이벤트 */
  onResultClick: () => void;
  /** 카드 클릭 이벤트 (선택) */
  onCardClick?: () => void;
  /** 결과 보기 버튼 비활성화 여부 */
  resultDisabled?: boolean;
}

export const FinishedMatchCard: React.FC<FinishedMatchCardProps> = ({
  title,
  time,
  image,
  onResultClick,
  onCardClick,
  resultDisabled = false,
}) => {
  return (
    <FinishedMatchCardLayout
      leftSlot={<ImageSlot src={image} alt={title} />}
      centerSlot={<InfoSlot title={title} time={time} />}
      rightSlot={
        <ActionSlot
          text={BUTTON_CONFIG.result.text}
          variant={BUTTON_CONFIG.result.variant}
          onClick={onResultClick}
          disabled={resultDisabled}
        />
      }
      onCardClick={onCardClick}
    />
  );
};

/**
 * TODO: 추후 추가할 수 있는 Preset 컴포넌트들
 *
 * 1. LoadingMatchCard - 로딩 상태의 스켈레톤 UI
 * 2. ErrorMatchCard - 오류 상태 표시
 * 3. RankMatchCard - 랭크 매칭에 사용될 카드
 */
