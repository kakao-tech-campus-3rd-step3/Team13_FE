import React from 'react';

import * as S from './matchCardLayout.styled';
import type { MatchCardLayoutProps } from './matchCardLayout.types';

/**
 * 매치카드의 기본 3-slot 레이아웃 컴포넌트
 *
 * 이 컴포넌트는 매치카드의 구조적 기반을 제공합니다:
 * - leftSlot: 왼쪽 영역 (이미지)
 * - centerSlot: 가운데 영역 (제목 + 시간)
 * - rightSlot: 오른쪽 영역 (인원정보, 버튼 등)
 *
 * Progressive Enhancement 패턴을 따라:
 * 1. 이 컴포넌트를 직접 사용 (최대 유연성)
 * 2. Preset 컴포넌트 사용 (편의성)
 * 3. 기존 호환 인터페이스 사용 (마이그레이션 용이성)
 */
export const MatchCardLayout: React.FC<MatchCardLayoutProps> = ({
  leftSlot,
  centerSlot,
  rightSlot,
  onCardClick,
  className,
}) => {
  /**
   * 카드 전체 클릭 핸들러
   * - 내부 버튼 클릭시에는 이벤트 버블링으로 인해 실행되지 않음
   */
  const handleCardClick = () => {
    if (onCardClick) {
      onCardClick();
    }
  };

  // 접근성: onCardClick이 있을 때만 인터랙티브 속성 적용
  const interactiveProps = onCardClick
    ? {
        role: 'button' as const,
        tabIndex: 0,
        onKeyPress: (e: React.KeyboardEvent) => {
          // 접근성: Enter나 Space 키로도 클릭 가능
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onCardClick();
          }
        },
      }
    : {};

  return (
    <S.LayoutContainer
      onClick={handleCardClick}
      className={className}
      role={interactiveProps.role}
      tabIndex={interactiveProps.tabIndex}
      onKeyPress={interactiveProps.onKeyPress}
    >
      {/* 왼쪽 슬롯: 이미지 영역 */}
      {leftSlot && <S.LeftSlot>{leftSlot}</S.LeftSlot>}

      {/* 가운데 슬롯: 주요 정보 영역 */}
      {centerSlot && <S.CenterSlot>{centerSlot}</S.CenterSlot>}

      {/* 오른쪽 슬롯: 액션/부가정보 영역 */}
      {rightSlot && <S.RightSlot>{rightSlot}</S.RightSlot>}
    </S.LayoutContainer>
  );
};

/**
 * TODO: 향후 개선 사항들
 *
 * 1. 반응형 디자인 적용
 *    - 모바일에서는 세로 레이아웃으로 변경
 *    - 태블릿/데스크톱에서 크기 조절
 *
 * 2. 애니메이션 효과 추가
 *    - hover 상태에서 부드러운 확대/그림자 효과
 *    - 로딩 상태 스켈레톤 UI
 *
 * 3. 테마 지원
 *    - 라이트/다크 모드 대응
 *    - 브랜드별 색상 테마 적용
 *
 * 4. 성능 최적화
 *    - 이미지 lazy loading 지원
 *    - Virtual scrolling 지원 (리스트에서 사용시)
 */

export default MatchCardLayout;

/**
 * 완료된 매치카드 레이아웃 컴포넌트
 * - 일반 MatchCardLayout과 동일하지만 시각적 효과(투명도, 블러) 적용
 */
export const FinishedMatchCardLayout: React.FC<MatchCardLayoutProps> = ({
  leftSlot,
  centerSlot,
  rightSlot,
  onCardClick,
  className,
}) => {
  /**
   * 카드 전체 클릭 핸들러
   */
  const handleCardClick = () => {
    if (onCardClick) {
      onCardClick();
    }
  };

  // 접근성: onCardClick이 있을 때만 인터랙티브 속성 적용
  const interactiveProps = onCardClick
    ? {
        role: 'button' as const,
        tabIndex: 0,
        onKeyPress: (e: React.KeyboardEvent) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onCardClick();
          }
        },
      }
    : {};

  return (
    <S.FinishedCardContainer
      onClick={handleCardClick}
      className={className}
      role={interactiveProps.role}
      tabIndex={interactiveProps.tabIndex}
      onKeyPress={interactiveProps.onKeyPress}
    >
      {/* 왼쪽 슬롯: 이미지 영역 */}
      {leftSlot && <S.LeftSlot className="left-slot">{leftSlot}</S.LeftSlot>}

      {/* 가운데 슬롯: 주요 정보 영역 */}
      {centerSlot && <S.CenterSlot>{centerSlot}</S.CenterSlot>}

      {/* 오른쪽 슬롯: 액션/부가정보 영역 */}
      {rightSlot && <S.RightSlot>{rightSlot}</S.RightSlot>}
    </S.FinishedCardContainer>
  );
};
