import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

import { colors } from '@/theme/color';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';

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

export const Section = styled.main`
  display: grid;
  gap: ${spacing.spacing5};
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

  /* 하단 그라디언트 */
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 300px;
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

export const TitleBarWrapper = styled.div`
  margin: -${spacing.spacing6} -${spacing.spacing5} 0;
  padding-bottom: ${spacing.spacing4};
  animation: ${fadeIn} 0.5s ease-out;
`;

export const Header = styled.header`
  display: grid;
  gap: ${spacing.spacing5};
  padding: ${spacing.spacing8} ${spacing.spacing5};
  max-width: 480px;
  margin: 0 auto;
  width: 100%;
  animation: ${fadeIn} 0.6s ease-out 0.1s backwards;
`;

export const HeaderContent = styled.div`
  display: grid;
  gap: ${spacing.spacing3};
  text-align: center;
  position: relative;

  &::before {
    content: '🏀';
    font-size: 64px;
    display: block;
    margin: 0 auto ${spacing.spacing3};
    animation: ${float} 3s ease-in-out infinite;
    filter: drop-shadow(0 4px 12px rgba(59, 130, 246, 0.3));
  }
`;

export const Title = styled.h1`
  margin: 0;
  ${typography.title1Bold};
  font-size: 32px;
  font-weight: 800;
  letter-spacing: -0.03em;
  background: linear-gradient(135deg, #0f172a 0%, #1e40af 50%, #3b82f6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-align: center;
`;

export const Description = styled.p`
  margin: 0;
  ${typography.body1Regular};
  font-size: 16px;
  font-weight: 500;
  color: ${colors.text.sub};
  text-align: center;
  line-height: 1.6;
  opacity: 0.9;
`;

export const ExpiredNotice = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.spacing2};
  padding: ${spacing.spacing3} ${spacing.spacing4};
  border-radius: 16px;
  background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
  color: #991b1b;
  ${typography.body2Bold};
  font-weight: 600;
  box-shadow:
    0 4px 16px rgba(220, 38, 38, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(220, 38, 38, 0.2);
  animation: ${fadeIn} 0.5s ease-out;

  &::before {
    content: '⚠️';
    font-size: 20px;
  }
`;

export const ButtonStack = styled.div`
  display: grid;
  gap: ${spacing.spacing3};
  max-width: 480px;
  margin: 0 auto;
  width: 100%;
  padding: 0 ${spacing.spacing5};
  animation: ${fadeIn} 0.6s ease-out 0.2s backwards;
`;

export const Divider = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: ${spacing.spacing3};
  color: ${colors.text.placeholder};
  ${typography.label1Regular};
  font-size: 13px;
  font-weight: 600;
  margin: ${spacing.spacing2} 0;

  &::before,
  &::after {
    content: '';
    height: 2px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(226, 232, 240, 0.8) 50%,
      transparent 100%
    );
  }
`;

export const DummyButtonWrapper = styled.div`
  display: grid;
  gap: ${spacing.spacing2};
`;

export const StatusRegion = styled.div`
  display: grid;
  gap: ${spacing.spacing3};
  max-width: 480px;
  margin: 0 auto;
  width: 100%;
  padding: 0 ${spacing.spacing5};
  animation: ${fadeIn} 0.6s ease-out 0.3s backwards;
`;

const statusBase = `
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${spacing.spacing3};
  padding: ${spacing.spacing4};
  border-radius: 20px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 
    0 4px 16px rgba(15, 23, 42, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
  border: 1px solid;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    opacity: 0.8;
  }
`;

export const StatusMessage = styled.div`
  ${statusBase};
  background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
  color: #1e40af;
  border-color: rgba(59, 130, 246, 0.2);

  &::before {
    background: linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%);
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow:
      0 8px 24px rgba(59, 130, 246, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.8);
  }
`;

export const ErrorMessage = styled.div`
  ${statusBase};
  background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
  color: #991b1b;
  border-color: rgba(220, 38, 38, 0.2);

  &::before {
    background: linear-gradient(90deg, #ef4444 0%, #dc2626 100%);
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow:
      0 8px 24px rgba(220, 38, 38, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.8);
  }
`;

export const StatusContent = styled.div`
  display: grid;
  gap: ${spacing.spacing1};
  flex: 1;
`;

export const StatusTitle = styled.p`
  margin: 0;
  ${typography.body1Bold};
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.01em;
`;

export const StatusDescription = styled.p`
  margin: 0;
  ${typography.body2Regular};
  font-size: 14px;
  color: inherit;
  opacity: 0.9;
  line-height: 1.5;
`;

export const RetryButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing.spacing1};
  padding: ${spacing.spacing2} ${spacing.spacing4};
  border-radius: 14px;
  border: none;
  background: linear-gradient(135deg, #ffffff 0%, #fef2f2 100%);
  ${typography.label1Bold};
  font-size: 14px;
  font-weight: 700;
  color: #dc2626;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow:
    0 2px 8px rgba(220, 38, 38, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(220, 38, 38, 0.2);
  position: relative;
  overflow: hidden;

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
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow:
      0 4px 16px rgba(220, 38, 38, 0.25),
      inset 0 1px 0 rgba(255, 255, 255, 1);
    background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);

    &::before {
      opacity: 1;
    }
  }

  &:active {
    transform: translateY(0);
    box-shadow:
      0 2px 8px rgba(220, 38, 38, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.8);
  }

  &:focus-visible {
    outline: none;
    box-shadow:
      0 0 0 4px rgba(220, 38, 38, 0.2),
      0 2px 8px rgba(220, 38, 38, 0.15);
  }

  &::after {
    content: '↻';
    font-size: 16px;
    margin-left: 4px;
  }
`;
