import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(8px);
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

export const Page = styled.main`
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);
  animation: ${fadeIn} 0.4s ease-out;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 300px;
    background: radial-gradient(
      circle at 50% 0%,
      rgba(59, 130, 246, 0.08) 0%,
      transparent 70%
    );
    pointer-events: none;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing5};
  padding: ${({ theme }) =>
    `${theme.spacing6} ${theme.spacing4} ${theme.spacing8}`};
  max-width: 640px;
  margin: 0 auto;
  width: 100%;
  position: relative;
  z-index: 1;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing2};
`;

export const SectionTitle = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.text.default};
  font-size: 28px;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, #0f172a 0%, #334155 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const SectionHint = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.text.sub};
  font-size: 15px;
  line-height: 1.6;
  font-weight: 500;
  opacity: 0.8;
`;

export const List = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing3};
`;

export const LoadingShimmer = styled.div`
  height: 80px;
  border-radius: 16px;
  background: linear-gradient(90deg, #f1f5f9 0%, #e2e8f0 50%, #f1f5f9 100%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s ease-in-out infinite;
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing3};
  padding: ${({ theme }) => theme.spacing8};
  text-align: center;
  color: ${({ theme }) => theme.text.sub};
  font-size: 15px;
  line-height: 1.6;

  &::before {
    content: '🏅';
    font-size: 48px;
    opacity: 0.6;
  }
`;
