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
  background: linear-gradient(180deg, #fefce8 0%, #fef3c7 50%, #fde68a 100%);
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
      rgba(251, 191, 36, 0.15) 0%,
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
  color: #78350f;
  font-size: 28px;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: -0.02em;
  text-shadow: 0 1px 2px rgba(120, 53, 15, 0.05);
`;

export const SectionHint = styled.p`
  margin: 0;
  color: #92400e;
  font-size: 15px;
  line-height: 1.6;
  font-weight: 500;
  opacity: 0.9;
`;

export const List = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing3};
`;

export const LoadingShimmer = styled.div`
  height: 80px;
  border-radius: 16px;
  background: linear-gradient(90deg, #fef3c7 0%, #fde68a 50%, #fef3c7 100%);
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
  color: #92400e;
  font-size: 15px;
  line-height: 1.6;

  &::before {
    content: '🏅';
    font-size: 48px;
    opacity: 0.6;
  }
`;
