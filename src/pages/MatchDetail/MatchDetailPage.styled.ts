import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

import { spacing } from '@/theme/spacing';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
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

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
`;

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);
  position: relative;

  /* 배경 패턴 효과 */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 500px;
    background: radial-gradient(
      circle at 50% 0%,
      rgba(59, 130, 246, 0.08) 0%,
      transparent 70%
    );
    pointer-events: none;
    z-index: 0;
  }

  & > * {
    position: relative;
    z-index: 1;
  }
`;

export const ImageContainer = styled.div`
  width: 100%;
  max-height: 480px;
  overflow: hidden;
  background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%);
  position: relative;
  animation: ${fadeIn} 0.6s ease-out;

  /* 하단 그라디언트 오버레이 */
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 120px;
    background: linear-gradient(
      180deg,
      transparent 0%,
      rgba(15, 23, 42, 0.6) 100%
    );
    z-index: 2;
    pointer-events: none;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

export const MatchImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 480px;
  object-fit: cover;
  object-position: center;
  display: block;
  position: relative;
  z-index: 0;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);

  /* 세로가 더 긴 이미지인 경우 정중앙 기준으로 크롭 */
  aspect-ratio: auto;

  @supports (aspect-ratio: 16 / 9) {
    max-height: min(480px, calc(100vw * 9 / 16));
  }
`;

export const ContentContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  animation: ${fadeIn} 0.6s ease-out 0.2s backwards;

  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(148, 163, 184, 0.3);
    border-radius: 4px;

    &:hover {
      background: rgba(148, 163, 184, 0.5);
    }
  }
`;

export const ButtonContainer = styled.div`
  padding: ${spacing.spacing5};
  padding-top: ${spacing.spacing3};
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(226, 232, 240, 0.6);
  box-shadow:
    0 -4px 20px rgba(15, 23, 42, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  position: sticky;
  bottom: 0;
  z-index: 100;
  animation: ${scaleIn} 0.5s ease-out;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;

  button {
    width: 100%;
    height: 60px;
    font-size: 17px;
    font-weight: 700;
    border-radius: 16px;
    border: none;
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    color: white;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow:
      0 4px 20px rgba(59, 130, 246, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
    position: relative;
    overflow: hidden;
    letter-spacing: -0.01em;
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${spacing.spacing4};
  flex: 1;
  padding: ${spacing.spacing8};

  &::before {
    content: '⏳';
    font-size: 64px;
    animation: ${pulse} 1.5s ease-in-out infinite;
    filter: drop-shadow(0 4px 12px rgba(59, 130, 246, 0.3));
  }

  &::after {
    content: '매치 정보를 불러오는 중...';
    font-size: 16px;
    font-weight: 600;
    color: #64748b;
    text-align: center;
  }
`;

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${spacing.spacing4};
  flex: 1;
  padding: ${spacing.spacing8};

  &::before {
    content: '😢';
    font-size: 64px;
    animation: ${pulse} 2s ease-in-out infinite;
    filter: drop-shadow(0 4px 12px rgba(239, 68, 68, 0.3));
  }

  &::after {
    content: '매치 정보를 불러올 수 없습니다';
    font-size: 16px;
    font-weight: 600;
    color: #dc2626;
    text-align: center;
  }
`;

/**
 * 추가 스타일: 매치 정보 섹션들을 위한 카드 스타일
 */
export const InfoCard = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: ${spacing.spacing4};
  margin-bottom: ${spacing.spacing4};
  border: 1px solid rgba(226, 232, 240, 0.8);
  box-shadow:
    0 2px 12px rgba(15, 23, 42, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-2px);
    box-shadow:
      0 8px 24px rgba(15, 23, 42, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 1);
  }
`;

export const InfoTitle = styled.h3`
  margin: 0 0 ${spacing.spacing3} 0;
  font-size: 18px;
  font-weight: 700;
  color: #0f172a;
  letter-spacing: -0.02em;
  display: flex;
  align-items: center;
  gap: ${spacing.spacing2};

  &::before {
    content: '';
    width: 4px;
    height: 20px;
    background: linear-gradient(180deg, #3b82f6 0%, #8b5cf6 100%);
    border-radius: 2px;
  }
`;

export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${spacing.spacing2} 0;
  border-bottom: 1px solid rgba(241, 245, 249, 0.8);

  &:last-child {
    border-bottom: none;
  }
`;

export const InfoLabel = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #64748b;
`;

export const InfoValue = styled.span`
  font-size: 15px;
  font-weight: 700;
  color: #0f172a;
  letter-spacing: -0.01em;
`;

/**
 * 상태 배지
 */
export const StatusBadge = styled.span<{
  status?: 'recruiting' | 'full' | 'closed';
}>`
  display: inline-flex;
  align-items: center;
  padding: 6px 14px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.02em;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  ${({ status = 'recruiting' }) => {
    switch (status) {
      case 'full':
        return `
          background: linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%);
          color: #78350F;
        `;
      case 'closed':
        return `
          background: linear-gradient(135deg, #F3F4F6 0%, #E5E7EB 100%);
          color: #4B5563;
        `;
      default:
        return `
          background: linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%);
          color: #065F46;
        `;
    }
  }}
`;
