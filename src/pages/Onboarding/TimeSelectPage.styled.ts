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

export const Page = styled.main`
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);
  animation: ${fadeIn} 0.4s ease-out;
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

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing3};

  @media (max-width: 380px) {
    grid-template-columns: 1fr;
  }
`;

export const ProgressIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing2};
  padding: ${({ theme }) => theme.spacing4};
  margin: 0 auto;
  max-width: 200px;
`;

export const ProgressDot = styled.div<{ active?: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ active, theme }) =>
    active
      ? 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)'
      : theme.text.placeholder};
  opacity: ${({ active }) => (active ? 1 : 0.3)};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  ${({ active }) =>
    active &&
    `
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.15);
  `}
`;
