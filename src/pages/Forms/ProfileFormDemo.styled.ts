import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Page = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
  padding: ${({ theme }) => `${theme.spacing6} ${theme.spacing4}`};
  background: linear-gradient(
    180deg,
    ${({ theme }) => theme.blue[100]} 0%,
    ${({ theme }) => theme.background.fill} 55%,
    ${({ theme }) => theme.gray[100]} 100%
  );
  overflow: hidden;

  &::before,
  &::after {
    content: '';
    position: absolute;
    border-radius: 999px;
    filter: blur(90px);
    opacity: 0.4;
    z-index: 0;
  }

  &::before {
    width: 320px;
    height: 320px;
    top: -120px;
    right: -80px;
    background: ${({ theme }) =>
      `linear-gradient(135deg, ${theme.blue[400]} 0%, ${theme.blue[700]} 100%)`};
  }

  &::after {
    width: 260px;
    height: 260px;
    bottom: -100px;
    left: -60px;
    background: ${({ theme }) =>
      `linear-gradient(135deg, ${theme.yellow[200]} 0%, ${theme.blue[200]} 100%)`};
  }

  @media (min-width: 768px) {
    padding: ${({ theme }) => `${theme.spacing9} ${theme.spacing8}`};
  }
`;

export const Container = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
  display: grid;
  gap: ${({ theme }) => theme.spacing5};
  animation: ${fadeIn} 0.6s ease-out;
`;

export const Header = styled.header`
  display: grid;
  gap: ${({ theme }) => theme.spacing2};
  text-align: left;
`;

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  align-self: flex-start;
  padding: ${({ theme }) => `${theme.spacing1} ${theme.spacing2}`};
  border-radius: 999px;
  background: ${({ theme }) =>
    `linear-gradient(135deg, ${theme.blue[500]} 0%, ${theme.blue[700]} 100%)`};
  color: ${({ theme }) => theme.gray[0]};
  font-size: ${({ theme }) => theme.label2Bold.fontSize};
  font-weight: ${({ theme }) => theme.label2Bold.fontWeight};
  line-height: ${({ theme }) => theme.label2Bold.lineHeight};
  letter-spacing: 0.04em;
  text-transform: uppercase;
  box-shadow: 0 6px 12px rgba(33, 124, 249, 0.25);
`;

export const Title = styled.h1`
  margin: 0;
  font-size: ${({ theme }) => theme.title1Bold.fontSize};
  font-weight: ${({ theme }) => theme.title1Bold.fontWeight};
  line-height: ${({ theme }) => theme.title1Bold.lineHeight};
  letter-spacing: -0.02em;
  background: ${({ theme }) =>
    `linear-gradient(120deg, #0f172a 0%, ${theme.blue[700]} 100%)`};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const Subtitle = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.text.sub};
  font-size: ${({ theme }) => theme.body1Regular.fontSize};
  font-weight: ${({ theme }) => theme.body1Regular.fontWeight};
  line-height: ${({ theme }) => theme.body1Regular.lineHeight};
  opacity: 0.85;
`;

export const Card = styled.form`
  display: grid;
  gap: ${({ theme }) => theme.spacing5};
  padding: ${({ theme }) => `${theme.spacing6} ${theme.spacing5}`};
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(24px);
  box-shadow:
    0 12px 30px rgba(15, 23, 42, 0.12),
    0 30px 60px rgba(33, 124, 249, 0.14);

  @media (min-width: 768px) {
    padding: ${({ theme }) => `${theme.spacing7} ${theme.spacing7}`};
  }
`;

export const Divider = styled.hr`
  margin: 0;
  border: 0;
  height: 1px;
  background: ${({ theme }) =>
    `linear-gradient(90deg, transparent 0%, ${theme.blue[200]} 50%, transparent 100%)`};
`;

export const FormGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing5};

  @media (min-width: 720px) {
    gap: ${({ theme }) => theme.spacing6};
  }
`;

export const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing3};

  @media (min-width: 480px) {
    flex-direction: row;
    justify-content: flex-end;
  }
`;

export const Primary = styled.button`
  flex: 1;
  min-height: 48px;
  padding: ${({ theme }) => `${theme.spacing2} ${theme.spacing4}`};
  border-radius: 16px;
  border: 0;
  background: ${({ theme }) =>
    `linear-gradient(135deg, ${theme.blue[700]} 0%, ${theme.blue[500]} 100%)`};
  color: ${({ theme }) => theme.gray[0]};
  font-size: ${({ theme }) => theme.body1Bold.fontSize};
  font-weight: ${({ theme }) => theme.body1Bold.fontWeight};
  line-height: ${({ theme }) => theme.body1Bold.lineHeight};
  letter-spacing: 0.01em;
  box-shadow:
    0 12px 20px rgba(33, 124, 249, 0.25),
    inset 0 0 0 1px rgba(255, 255, 255, 0.2);
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    filter 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow:
      0 16px 28px rgba(33, 124, 249, 0.3),
      inset 0 0 0 1px rgba(255, 255, 255, 0.25);
  }

  &:active {
    transform: translateY(0);
    filter: brightness(0.95);
  }

  &:disabled {
    cursor: not-allowed;
    background: ${({ theme }) => theme.border.disabled};
    color: ${({ theme }) => theme.text.placeholder};
    box-shadow: none;
    transform: none;
  }
`;

export const Secondary = styled.button`
  flex: 1;
  min-height: 48px;
  padding: ${({ theme }) => `${theme.spacing2} ${theme.spacing4}`};
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.border.default};
  background: ${({ theme }) => theme.gray[0]};
  color: ${({ theme }) => theme.text.sub};
  font-size: ${({ theme }) => theme.body1Regular.fontSize};
  font-weight: ${({ theme }) => theme.body1Regular.fontWeight};
  line-height: ${({ theme }) => theme.body1Regular.lineHeight};
  cursor: pointer;
  transition:
    border-color 0.2s ease,
    transform 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.blue[500]};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    cursor: not-allowed;
    border-color: ${({ theme }) => theme.border.disabled};
    color: ${({ theme }) => theme.text.placeholder};
    transform: none;
  }
`;

export const FooterNote = styled.p`
  margin: 0;
  text-align: center;
  color: ${({ theme }) => theme.text.placeholder};
  font-size: ${({ theme }) => theme.label1Regular.fontSize};
  font-weight: ${({ theme }) => theme.label1Regular.fontWeight};
  line-height: ${({ theme }) => theme.label1Regular.lineHeight};
`;
