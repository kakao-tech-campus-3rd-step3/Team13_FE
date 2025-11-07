import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

/**
 * 전체 드롭다운 컨테이너
 */
export const DropDownContainer = styled.div<{ isOpen?: boolean }>`
  position: relative;
  width: 100%;
  animation: ${scaleIn} 0.3s ease-out;
  overflow: visible;
  z-index: ${({ isOpen }) => (isOpen ? 10001 : 1)};
`;

/**
 * 드롭다운 헤더 (라벨 + 토글 버튼)
 */
export const DropDownHeader = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 14px 18px;
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border: 2px solid rgba(226, 232, 240, 0.8);
  border-radius: 16px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  color: #0f172a;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow:
    0 2px 8px rgba(15, 23, 42, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  position: relative;
  overflow: hidden;

  /* 호버 시 배경 효과 */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 0;
  }

  &:hover {
    border-color: rgba(59, 130, 246, 0.4);
    transform: translateY(-2px);
    box-shadow:
      0 4px 16px rgba(59, 130, 246, 0.12),
      inset 0 1px 0 rgba(255, 255, 255, 1);

    &::before {
      opacity: 1;
    }
  }

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow:
      0 0 0 4px rgba(59, 130, 246, 0.15),
      0 2px 8px rgba(15, 23, 42, 0.06),
      inset 0 1px 0 rgba(255, 255, 255, 0.8);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: linear-gradient(135deg, #f9fafb 0%, #f1f5f9 100%);
    color: #9ca3af;
    cursor: not-allowed;
    border-color: #e5e7eb;

    &:hover {
      transform: none;
      box-shadow: none;

      &::before {
        opacity: 0;
      }
    }
  }

  & > * {
    position: relative;
    z-index: 1;
  }
`;

/**
 * 헤더 내 라벨 텍스트
 */
export const HeaderLabel = styled.span`
  font-weight: 600;
  color: inherit;
  flex: 1;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 12px;
  letter-spacing: -0.01em;
`;

/**
 * 토글 아이콘
 */
export const ToggleIcon = styled.span<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 8px;
  background: ${({ isOpen }) =>
    isOpen
      ? 'linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%)'
      : 'rgba(148, 163, 184, 0.1)'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  font-size: 14px;
  color: ${({ isOpen }) => (isOpen ? '#1E40AF' : '#64748B')};
  box-shadow: ${({ isOpen }) =>
    isOpen ? '0 2px 8px rgba(59, 130, 246, 0.15)' : 'none'};
`;

/**
 * 드롭다운 리스트 컨테이너
 */
export const DropDownList = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  z-index: 10000;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 16px;
  box-shadow:
    0 8px 32px rgba(15, 23, 42, 0.12),
    0 4px 16px rgba(59, 130, 246, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  max-height: 280px;
  overflow-y: auto;

  ${({ isOpen }) => css`
    display: ${isOpen ? 'block' : 'none'};
    animation: ${isOpen ? slideDown : 'none'} 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  `}

  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    margin: 8px 0;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(148, 163, 184, 0.3);
    border-radius: 4px;

    &:hover {
      background: rgba(148, 163, 184, 0.5);
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
  padding: 12px 16px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  border-bottom: 1px solid rgba(241, 245, 249, 0.8);
  position: relative;

  &:first-of-type {
    border-radius: 16px 16px 0 0;
  }

  &:last-child {
    border-bottom: none;
    border-radius: 0 0 16px 16px;
  }

  ${({ isSelected, disabled }) => {
    if (disabled) {
      return css`
        background-color: rgba(249, 250, 251, 0.5);
        color: #9ca3af;
      `;
    }

    if (isSelected) {
      return css`
        background: linear-gradient(
          135deg,
          rgba(59, 130, 246, 0.08) 0%,
          rgba(147, 197, 253, 0.08) 100%
        );
        color: #1e40af;
        font-weight: 600;

        &::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: linear-gradient(180deg, #3b82f6 0%, #8b5cf6 100%);
          border-radius: 0 3px 3px 0;
        }
      `;
    }

    return css`
      &:hover {
        background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
        transform: translateX(4px);
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
  width: 22px;
  height: 22px;
  margin-right: 12px;
  border: 2px solid ${({ isSelected }) => (isSelected ? '#3B82F6' : '#CBD5E1')};
  background: ${({ isSelected }) =>
    isSelected ? 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)' : 'white'};
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: ${({ isSelected }) =>
    isSelected
      ? '0 4px 12px rgba(59, 130, 246, 0.3)'
      : '0 2px 4px rgba(15, 23, 42, 0.06)'};

  ${({ selectionMode }) =>
    selectionMode === 'single'
      ? css`
          border-radius: 50%;
        `
      : css`
          border-radius: 6px;
        `}

  ${({ isSelected }) =>
    isSelected &&
    css`
      transform: scale(1.1);
    `}

  &::after {
    content: ${({ isSelected }) => (isSelected ? "'✓'" : "''")};
    color: white;
    font-size: 14px;
    font-weight: 900;
  }
`;

/**
 * 옵션 라벨 텍스트
 */
export const OptionLabel = styled.span`
  flex: 1;
  font-size: 15px;
  line-height: 1.5;
  letter-spacing: -0.01em;
`;
