import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.92) translateY(8px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
`;

export const pulse = keyframes`
  0%, 100% {
    box-shadow: 
      0 8px 24px rgba(59, 130, 246, 0.15), 
      0 0 0 0 rgba(59, 130, 246, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.5);
  }
  50% {
    box-shadow: 
      0 12px 32px rgba(59, 130, 246, 0.25),
      0 0 0 6px rgba(59, 130, 246, 0),
      inset 0 1px 0 rgba(255, 255, 255, 0.5);
  }
`;

const shimmer = keyframes`
  0% {
    transform: translateX(-100%) rotate(45deg);
  }
  100% {
    transform: translateX(300%) rotate(45deg);
  }
`;

const bounce = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
`;

export const Card = styled.button<{ selected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  padding: 28px 22px;
  border-radius: 24px;
  border: 2px solid
    ${({ selected }) => (selected ? '#3B82F6' : 'rgba(226, 232, 240, 0.8)')};
  background: ${({ selected }) =>
    selected
      ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.12) 0%, rgba(147, 197, 253, 0.12) 100%)'
      : 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)'};
  cursor: pointer;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  animation: ${scaleIn} 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) backwards;
  box-shadow: ${({ selected }) =>
    selected
      ? '0 8px 24px rgba(59, 130, 246, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.5), 0 1px 3px rgba(15, 23, 42, 0.1)'
      : '0 2px 8px rgba(15, 23, 42, 0.06), 0 1px 3px rgba(15, 23, 42, 0.04)'};
  --icon-transform: scale(1) rotate(0deg);
  --icon-filter: ${({ selected }) =>
    selected
      ? 'drop-shadow(0 4px 12px rgba(59, 130, 246, 0.4))'
      : 'drop-shadow(0 2px 4px rgba(15, 23, 42, 0.1))'};
  --title-color: ${({ selected }) => (selected ? '#1E40AF' : '#0F172A')};
  --caption-color: ${({ selected }) => (selected ? '#3B82F6' : '#64748B')};
  --caption-opacity: ${({ selected }) => (selected ? 1 : 0.85)};

  /* 상단 그라디언트 바 */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%);
    opacity: ${({ selected }) => (selected ? 1 : 0)};
    transition: opacity 0.35s ease;
  }

  /* 선택 시 배경 shimmer 효과 */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.3) 50%,
      transparent 100%
    );
    opacity: ${({ selected }) => (selected ? 1 : 0)};
    animation: ${({ selected }) => (selected ? shimmer : 'none')} 3s ease-in-out
      infinite;
  }

  &:hover {
    transform: translateY(-6px) scale(1.03);
    border-color: ${({ selected }) => (selected ? '#2563EB' : '#BFDBFE')};
    box-shadow: ${({ selected }) =>
      selected
        ? '0 16px 40px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.6)'
        : '0 12px 28px rgba(15, 23, 42, 0.14), 0 4px 12px rgba(15, 23, 42, 0.08)'};
    background: ${({ selected }) =>
      selected
        ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.16) 0%, rgba(147, 197, 253, 0.16) 100%)'
        : 'linear-gradient(135deg, #FFFFFF 0%, #EFF6FF 100%)'};
    --icon-transform: scale(1.2) rotate(8deg);
    --icon-filter: ${({ selected }) =>
      selected
        ? 'drop-shadow(0 8px 16px rgba(59, 130, 246, 0.5))'
        : 'drop-shadow(0 4px 8px rgba(15, 23, 42, 0.15))'};
    --title-color: ${({ selected }) => (selected ? '#1E3A8A' : '#1E293B')};
    --caption-color: ${({ selected }) => (selected ? '#2563EB' : '#475569')};
    --caption-opacity: 1;
  }

  &:active {
    transform: translateY(-3px) scale(0.98);
    transition: all 0.1s ease;
    --icon-transform: scale(1.1) rotate(4deg);
  }

  ${({ selected }) =>
    selected &&
    css`
      animation:
        ${scaleIn} 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) backwards,
        ${pulse} 3s ease-in-out 0.5s infinite;
    `}

  &:focus-visible {
    outline: 3px solid rgba(59, 130, 246, 0.5);
    outline-offset: 3px;
  }
`;

export const IconWrapper = styled.div<{ selected: boolean }>`
  font-size: 48px;
  line-height: 1;
  transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  transform: var(--icon-transform, scale(1) rotate(0deg));
  filter: var(
    --icon-filter,
    ${({ selected }) =>
      selected
        ? 'drop-shadow(0 4px 12px rgba(59, 130, 246, 0.4))'
        : 'drop-shadow(0 2px 4px rgba(15, 23, 42, 0.1))'}
  );
  position: relative;
  z-index: 1;
`;

export const Title = styled.h3<{ selected: boolean }>`
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: var(
    --title-color,
    ${({ selected }) => (selected ? '#1E40AF' : '#0F172A')}
  );
  letter-spacing: -0.02em;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
`;

export const Caption = styled.p<{ selected: boolean }>`
  margin: 0;
  font-size: 13px;
  font-weight: 600;
  color: var(
    --caption-color,
    ${({ selected }) => (selected ? '#3B82F6' : '#64748B')}
  );
  transition: all 0.3s ease;
  text-align: center;
  line-height: 1.5;
  position: relative;
  z-index: 1;
  opacity: var(--caption-opacity, ${({ selected }) => (selected ? 1 : 0.85)});
`;

export const CheckIcon = styled.div<{ visible: boolean }>`
  position: absolute;
  top: 14px;
  right: 14px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transform: ${({ visible }) =>
    visible ? 'scale(1) rotate(0deg)' : 'scale(0.3) rotate(-180deg)'};
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: ${({ visible }) =>
    visible ? '0 4px 16px rgba(59, 130, 246, 0.5)' : 'none'};
  z-index: 2;
  animation: ${({ visible }) => (visible ? bounce : 'none')} 0.6s ease-in-out
    0.2s;

  &::before {
    content: '';
    position: absolute;
    inset: -4px;
    border-radius: 50%;
    background: linear-gradient(
      135deg,
      rgba(59, 130, 246, 0.3),
      rgba(37, 99, 235, 0.3)
    );
    opacity: ${({ visible }) => (visible ? 1 : 0)};
    transition: opacity 0.3s ease;
  }

  &::after {
    content: '✓';
    color: white;
    font-size: 16px;
    font-weight: 900;
    position: relative;
    z-index: 1;
  }
`;

export const SelectionBadge = styled.div<{ visible: boolean }>`
  position: absolute;
  bottom: 14px;
  left: 50%;
  transform: translateX(-50%)
    ${({ visible }) => (visible ? 'translateY(0)' : 'translateY(10px)')};
  padding: 4px 12px;
  border-radius: 12px;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.4);
  z-index: 2;
  pointer-events: none;
  white-space: nowrap;
`;
