import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

import { spacing } from '@/theme/spacing';

const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

/**
 * FAB 컨테이너
 * #root 컨테이너 내부에 위치하도록 absolute 사용
 */
export const FABContainer = styled.div`
  position: absolute;
  bottom: ${spacing.spacing6};
  right: ${spacing.spacing6};
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: ${spacing.spacing3};
`;

/**
 * 메인 FAB 버튼
 */
export const MainFAB = styled.button<{ isOpen: boolean }>`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  font-size: 28px;
  cursor: pointer;
  box-shadow:
    0 8px 32px rgba(59, 130, 246, 0.4),
    inset 0 2px 0 rgba(255, 255, 255, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  animation: ${scaleIn} 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(45deg)' : 'rotate(0deg)')};

  &:hover {
    transform: ${({ isOpen }) =>
      isOpen ? 'rotate(45deg) scale(1.1)' : 'scale(1.1)'};
    box-shadow:
      0 12px 40px rgba(59, 130, 246, 0.5),
      inset 0 2px 0 rgba(255, 255, 255, 0.3);
  }

  &:active {
    transform: ${({ isOpen }) =>
      isOpen ? 'rotate(45deg) scale(1.05)' : 'scale(1.05)'};
  }

  &::before {
    content: '+';
    font-weight: 300;
    line-height: 1;
  }
`;

/**
 * 메뉴 컨테이너
 */
export const MenuContainer = styled.div<{ isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${spacing.spacing2};
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  pointer-events: ${({ isOpen }) => (isOpen ? 'all' : 'none')};
  transition: opacity 0.3s ease;
`;

/**
 * 메뉴 아이템
 */
export const MenuItem = styled.button<{ index: number }>`
  display: flex;
  align-items: center;
  gap: ${spacing.spacing3};
  padding: ${spacing.spacing3} ${spacing.spacing4};
  border-radius: 50px;
  border: none;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  color: #0f172a;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  box-shadow:
    0 4px 16px rgba(15, 23, 42, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  animation: ${slideUp} 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  animation-delay: ${({ index }) => `${index * 0.05}s`};
  animation-fill-mode: backwards;
  white-space: nowrap;

  &:hover {
    transform: translateX(-4px);
    background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
    color: #1e40af;
    box-shadow:
      0 8px 24px rgba(59, 130, 246, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.8);
  }

  &:active {
    transform: translateX(-2px) scale(0.98);
  }
`;

/**
 * 메뉴 아이콘
 */
export const MenuIcon = styled.span`
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

/**
 * 백드롭 (메뉴 외부 클릭 시 닫기용)
 * #root 컨테이너 내부에서만 표시되도록 absolute 사용
 */
export const Backdrop = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.2);
  backdrop-filter: blur(2px);
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  pointer-events: ${({ isOpen }) => (isOpen ? 'all' : 'none')};
  transition: opacity 0.3s ease;
  z-index: 999;
`;
