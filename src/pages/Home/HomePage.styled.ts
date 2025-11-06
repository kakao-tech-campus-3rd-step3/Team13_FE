import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

import { colors } from '@/theme/color';
import { spacing } from '@/theme/spacing';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
`;

/**
 * 페이지 전체 컨테이너
 */
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
    height: 400px;
    background: radial-gradient(
      circle at 50% 0%,
      rgba(59, 130, 246, 0.08) 0%,
      transparent 70%
    );
    pointer-events: none;
    z-index: 0;
  }

  /* 하단 그라디언트 */
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 200px;
    background: linear-gradient(
      180deg,
      transparent 0%,
      rgba(148, 163, 184, 0.05) 100%
    );
    pointer-events: none;
    z-index: 0;
  }

  & > * {
    position: relative;
    z-index: 1;
  }
`;

/**
 * 광고 배너 컨테이너
 */
export const BannerContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: ${spacing.spacing4} auto;
  padding: 0 ${spacing.spacing4};
  overflow: hidden;
  animation: ${slideDown} 0.6s ease-out;
`;

export const BannerImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  border-radius: 24px;
  box-shadow:
    0 4px 20px rgba(15, 23, 42, 0.08),
    0 8px 40px rgba(59, 130, 246, 0.12);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-4px) scale(1.01);
    box-shadow:
      0 8px 30px rgba(15, 23, 42, 0.12),
      0 16px 60px rgba(59, 130, 246, 0.18);
  }
`;

/**
 * 카테고리 필터 배너
 */
export const FilterBanner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${spacing.spacing3};
  padding: ${spacing.spacing4} ${spacing.spacing4};
  margin: 0 auto;
  max-width: 1200px;
  width: 100%;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  box-shadow:
    0 2px 12px rgba(15, 23, 42, 0.06),
    0 1px 3px rgba(15, 23, 42, 0.04),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  animation: ${fadeIn} 0.6s ease-out 0.2s backwards;
  position: sticky;
  top: ${spacing.spacing4};
  z-index: 100;
  margin-bottom: ${spacing.spacing4};

  @media (max-width: 768px) {
    flex-direction: column;
    gap: ${spacing.spacing2};
    align-items: stretch;
  }
`;

export const FilterLeftGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.spacing2};
  flex: 1;

  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

export const FilterRightGroup = styled.div`
  display: flex;
  align-items: center;
`;

export const FilterItem = styled.div`
  /* 드롭다운 스타일 커스터마이징 */
  & > div {
    height: 40px;
    background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
    color: #1e40af;
    border: 2px solid rgba(59, 130, 246, 0.2);
    border-radius: 14px;
    padding: 0 ${spacing.spacing3};
    font-weight: 600;
    font-size: 14px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 2px 8px rgba(59, 130, 246, 0.08);

    &:hover {
      background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
      border-color: rgba(59, 130, 246, 0.4);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
    }

    &:active {
      transform: translateY(0);
    }

    /* 아이콘 색상 */
    svg,
    path {
      color: #1e40af;
      fill: #1e40af;
      transition: all 0.3s ease;
    }
  }
`;

/**
 * 매치 리스트 컨테이너
 */
export const MatchListContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0 ${spacing.spacing4} ${spacing.spacing6};
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;

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

/**
 * 매치 카드 아이템
 */
export const MatchCardItem = styled.div`
  margin-bottom: ${spacing.spacing4};
  animation: ${fadeIn} 0.5s ease-out backwards;
  animation-delay: calc(var(--index, 0) * 0.05s);

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    animation: ${float} 2s ease-in-out infinite;
  }
`;

/**
 * 빈 상태 메시지
 */
export const EmptyMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${spacing.spacing3};
  padding: ${spacing.spacing8} ${spacing.spacing4};
  font-size: 16px;
  font-weight: 600;
  line-height: 1.6;
  color: ${colors.text.sub};
  text-align: center;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  margin: ${spacing.spacing6} auto;
  max-width: 500px;
  box-shadow:
    0 4px 20px rgba(15, 23, 42, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);

  &::before {
    content: '🏀';
    font-size: 64px;
    opacity: 0.6;
    animation: ${float} 3s ease-in-out infinite;
  }

  &::after {
    content: '새로운 매치가 곧 등록될 예정입니다!';
    font-size: 14px;
    color: ${colors.text.placeholder};
    font-weight: 500;
  }
`;

/**
 * 로딩 스켈레톤
 */
export const LoadingSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.spacing4};
  padding: ${spacing.spacing3} 0;
`;

export const SkeletonCard = styled.div`
  width: 100%;
  height: 140px;
  background: linear-gradient(
    90deg,
    rgba(241, 245, 249, 0.8) 0%,
    rgba(226, 232, 240, 0.8) 50%,
    rgba(241, 245, 249, 0.8) 100%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.8s ease-in-out infinite;
  border-radius: 20px;
  box-shadow:
    0 2px 12px rgba(15, 23, 42, 0.04),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899);
    opacity: 0.3;
  }
`;

/**
 * 섹션 헤더 (선택사항: 매치 리스트 위에 제목 추가 시)
 */
export const SectionHeader = styled.div`
  padding: ${spacing.spacing5} 0 ${spacing.spacing3};

  h2 {
    margin: 0;
    font-size: 24px;
    font-weight: 800;
    color: #0f172a;
    letter-spacing: -0.02em;
    background: linear-gradient(135deg, #0f172a 0%, #334155 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  p {
    margin: ${spacing.spacing1} 0 0;
    font-size: 14px;
    color: ${colors.text.sub};
    font-weight: 500;
  }
`;

/**
 * 필터 요약 배지 (활성 필터 개수 표시)
 */
export const FilterBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  font-size: 11px;
  font-weight: 700;
  border-radius: 10px;
  margin-left: ${spacing.spacing1};
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
`;

/**
 * 스크롤 투 탑 버튼
 */
export const ScrollToTopButton = styled.button`
  position: fixed;
  bottom: ${spacing.spacing5};
  right: ${spacing.spacing5};
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  font-size: 24px;
  cursor: pointer;
  box-shadow:
    0 4px 20px rgba(59, 130, 246, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1000;
  opacity: 0;
  transform: translateY(20px);
  pointer-events: none;

  &.visible {
    opacity: 1;
    transform: translateY(0);
    pointer-events: all;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow:
      0 8px 30px rgba(59, 130, 246, 0.5),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
  }

  &:active {
    transform: translateY(-2px);
  }

  &::before {
    content: '↑';
  }
`;
