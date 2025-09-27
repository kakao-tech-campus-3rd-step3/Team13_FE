/**
 * DropDown 컴포넌트들의 Emotion 스타일 정의
 */

import { css } from '@emotion/react';
import styled from '@emotion/styled';

/**
 * 전체 드롭다운 컨테이너
 */
export const DropDownContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 360px;
`;

/**
 * 드롭다운 헤더 (라벨 + 토글 버튼)
 */
export const DropDownHeader = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 12px 16px;
  background-color: white;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  color: #111827;
  transition: all 0.2s ease;

  &:hover {
    border-color: #3b82f6;
  }

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }

  &:disabled {
    background-color: #f9fafb;
    color: #9ca3af;
    cursor: not-allowed;
  }
`;

/**
 * 헤더 내 라벨 텍스트
 */
export const HeaderLabel = styled.span`
  font-weight: 500;
  color: inherit;
  flex: 1;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 8px;

  /* TODO: 다중 선택 시 고급 텍스트 처리를 위한 추가 스타일
   * JavaScript와 조합하여 다음과 같은 기능 구현 예정:
   * - 실제 텍스트 길이 측정
   * - 영역을 초과하는 경우 마지막 완전한 단어 뒤에 '...' 추가
   * - 예: "06:00-09:00, 09:00-12:00" -> "06:00-09:00, 09:00-..."
   */
`;

/* TODO: 다중 선택용 특수 헤더 라벨 (추후 구현)
export const MultiSelectHeaderLabel = styled(HeaderLabel)`
  // JavaScript ResizeObserver와 함께 사용할 고급 텍스트 처리
  // 실시간으로 텍스트 길이를 측정하여 적절한 위치에서 자르기
`;
*/

/**
 * 토글 아이콘
 */
export const ToggleIcon = styled.span<{ isOpen: boolean }>`
  transition: transform 0.2s ease;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  font-size: 12px;
  color: #6b7280;
`;

/**
 * 드롭다운 리스트 컨테이너
 */
export const DropDownList = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: white;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  max-height: 240px;
  overflow-y: auto;
  margin-top: 4px;

  ${({ isOpen }) => css`
    display: ${isOpen ? 'block' : 'none'};
    animation: ${isOpen ? 'slideDown 0.2s ease' : 'none'};
  `}

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

/**
 * 개별 옵션 아이템
 */
export const DropDownOption = styled.div<{
  isSelected: boolean;
  disabled?: boolean;
}>`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: background-color 0.2s ease;
  border-bottom: 1px solid #f3f4f6;

  &:last-child {
    border-bottom: none;
  }

  ${({ isSelected, disabled }) => {
    if (disabled) {
      return css`
        background-color: #f9fafb;
        color: #9ca3af;
      `;
    }

    if (isSelected) {
      return css`
        background-color: rgba(59, 130, 246, 0.1);
        color: #3b82f6;
      `;
    }

    return css`
      &:hover {
        background-color: #f9fafb;
      }
    `;
  }}
`;

/**
 * 선택 인디케이터 (체크박스/라디오)
 */
export const SelectionIndicator = styled.span<{
  selectionMode: 'single' | 'multiple';
  isSelected: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  margin-right: 8px;
  border: 2px solid ${({ isSelected }) => (isSelected ? '#3b82f6' : '#d1d5db')};
  background-color: ${({ isSelected }) =>
    isSelected ? '#3b82f6' : 'transparent'};
  transition: all 0.2s ease;

  ${({ selectionMode }) =>
    selectionMode === 'single'
      ? css`
          border-radius: 50%;
        `
      : css`
          border-radius: 3px;
        `}

  &::after {
    content: ${({ isSelected }) => (isSelected ? "'✓'" : "''")};
    color: white;
    font-size: 12px;
    font-weight: bold;
  }
`;

/**
 * 옵션 라벨 텍스트
 */
export const OptionLabel = styled.span`
  flex: 1;
  font-size: 16px;
  line-height: 1.4;
`;
