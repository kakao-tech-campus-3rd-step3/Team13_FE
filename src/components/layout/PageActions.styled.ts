import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
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

export const Container = styled.div`
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  gap: 16px;
  padding: 20px 16px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(226, 232, 240, 0.8);
  box-shadow: 0 -4px 24px rgba(15, 23, 42, 0.08);
  animation: ${slideUp} 0.4s ease-out;
  z-index: 100;

  @media (min-width: 640px) {
    padding: 24px 32px;
  }
`;

export const ResetButton = styled.button`
  padding: 14px 24px;
  border-radius: 14px;
  border: 2px solid #e2e8f0;
  background: white;
  color: #64748b;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;

  &:hover {
    border-color: #cbd5e1;
    background: #f8fafc;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(15, 23, 42, 0.1);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 6px rgba(15, 23, 42, 0.1);
  }

  &:focus-visible {
    outline: 3px solid rgba(100, 116, 139, 0.3);
    outline-offset: 2px;
  }
`;

export const NextButton = styled.button<{ disabled?: boolean }>`
  flex: 1;
  padding: 14px 32px;
  border-radius: 14px;
  border: none;
  background: ${({ disabled }) =>
    disabled ? '#E2E8F0' : 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)'};
  color: ${({ disabled }) => (disabled ? '#94A3B8' : 'white')};
  font-size: 16px;
  font-weight: 700;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  box-shadow: ${({ disabled }) =>
    disabled
      ? 'none'
      : '0 4px 16px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'};

  ${({ disabled }) =>
    !disabled &&
    css`
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          90deg,
          transparent,
          rgba(255, 255, 255, 0.3),
          transparent
        );
        background-size: 200% 100%;
        animation: ${shimmer} 2s ease-in-out infinite;
      }
    `}

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(59, 130, 246, 0.4);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: 0 2px 12px rgba(37, 99, 235, 0.4);
  }

  &:focus-visible {
    outline: 3px solid rgba(59, 130, 246, 0.4);
    outline-offset: 2px;
  }

  &::after {
    content: '→';
    margin-left: 8px;
    font-size: 18px;
    transition: transform 0.3s ease;
    display: inline-block;
  }

  &:hover:not(:disabled)::after {
    transform: translateX(4px);
  }
`;
