import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.96);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const shimmer = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
`;

export const LayoutContainer = styled.div`
  display: flex;
  gap: 16px;
  padding: 20px;
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border-radius: 20px;
  border: 1px solid rgba(226, 232, 240, 0.8);
  cursor: pointer;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  animation: ${scaleIn} 0.4s ease-out;
  box-shadow:
    0 2px 12px rgba(15, 23, 42, 0.06),
    0 1px 3px rgba(15, 23, 42, 0.04);
  --card-title-color: #0f172a;
  --card-info-color: #64748b;
  --image-shadow: 0 4px 12px rgba(15, 23, 42, 0.08);
  --image-scale: 1;
  --badge-translate: 0px;
  --badge-primary-shadow: 0 2px 8px rgba(59, 130, 246, 0.2);
  --badge-warning-shadow: 0 2px 8px rgba(245, 158, 11, 0.2);
  --badge-success-shadow: 0 2px 8px rgba(16, 185, 129, 0.2);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

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
      rgba(255, 255, 255, 0.4) 50%,
      transparent 100%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-6px) scale(1.01);
    border-color: rgba(59, 130, 246, 0.3);
    box-shadow:
      0 12px 32px rgba(15, 23, 42, 0.12),
      0 8px 24px rgba(59, 130, 246, 0.15);
    background: linear-gradient(135deg, #ffffff 0%, #eff6ff 100%);
    --card-title-color: #1e40af;
    --card-info-color: #475569;
    --image-shadow: 0 8px 20px rgba(15, 23, 42, 0.12);
    --image-scale: 1.08;
    --badge-translate: -2px;
    --badge-primary-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
    --badge-warning-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
    --badge-success-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);

    &::before {
      opacity: 1;
    }
  }

  &:hover::after {
    opacity: 1;
    animation: ${shimmer} 1.5s ease-in-out infinite;
  }

  &:active {
    transform: translateY(-3px) scale(0.99);
    transition: all 0.1s ease;
  }
`;

export const LeftSlot = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  flex-shrink: 0;
  border-radius: 16px;
  overflow: hidden;
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
  box-shadow: var(--image-shadow);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

export const SlotImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  transform: scale(var(--image-scale));
`;

export const ImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
  font-size: 48px;
  color: rgba(15, 23, 42, 0.35);
`;

export const CenterSlot = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
  position: relative;
  z-index: 1;
`;

export const InfoTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: var(--card-title-color);
  letter-spacing: -0.01em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: color 0.3s ease;
`;

export const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--card-info-color);
  font-weight: 500;
  transition: color 0.3s ease;
`;

export const Icon = styled.span`
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
`;

export const RightSlot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  gap: 8px;
  margin-left: auto;
  min-width: max-content;
  position: relative;
  z-index: 1;
`;

export const BadgeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: auto;
  flex-wrap: wrap;
  justify-content: flex-end;
`;

export const Badge = styled.span<{
  variant?: 'primary' | 'warning' | 'success';
}>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.02em;
  transition: all 0.3s ease;
  transform: translateY(var(--badge-translate));
  color: ${({ variant = 'primary' }) => {
    switch (variant) {
      case 'warning':
        return '#78350F';
      case 'success':
        return '#065F46';
      default:
        return '#1E40AF';
    }
  }};
  background: ${({ variant = 'primary' }) => {
    switch (variant) {
      case 'warning':
        return 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)';
      case 'success':
        return 'linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%)';
      default:
        return 'linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%)';
    }
  }};
  box-shadow: ${({ variant = 'primary' }) => `var(--badge-${variant}-shadow)`};
`;

export const ActionButton = styled.button<{ variant: 'cancel' | 'result' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 18px;
  border-radius: 14px;
  border: none;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${({ variant }) =>
    variant === 'cancel'
      ? '0 2px 10px rgba(248, 113, 113, 0.35)'
      : '0 2px 10px rgba(59, 130, 246, 0.35)'};
  background: ${({ variant }) =>
    variant === 'cancel'
      ? 'linear-gradient(135deg, #FCA5A5 0%, #F87171 100%)'
      : 'linear-gradient(135deg, #93C5FD 0%, #3B82F6 100%)'};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ variant }) =>
      variant === 'cancel'
        ? '0 6px 16px rgba(248, 113, 113, 0.45)'
        : '0 6px 16px rgba(59, 130, 246, 0.45)'};
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

export const FinishedCardContainer = styled(LayoutContainer)`
  opacity: 0.85;
  filter: grayscale(0.15);

  &:hover {
    opacity: 0.95;
    filter: grayscale(0);
  }
`;
