import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { CgProfile } from 'react-icons/cg';

import TitleBar from '@/components/titleBar';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-3px);
  }
`;

export const Wrapper = styled(TitleBar)`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  height: 68px;
  padding: 0 ${spacing.spacing4};
  border-bottom: 1px solid rgba(226, 232, 240, 0.6);
  box-shadow:
    0 2px 12px rgba(15, 23, 42, 0.04),
    inset 0 -1px 0 rgba(255, 255, 255, 0.8);
  animation: ${fadeIn} 0.5s ease-out;
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    box-shadow:
      0 4px 20px rgba(15, 23, 42, 0.08),
      inset 0 -1px 0 rgba(255, 255, 255, 0.8);
  }

  & > div:nth-of-type(2) {
    ${typography.title1Bold};
    font-size: 24px;
    font-weight: 800;
    letter-spacing: -0.03em;
    background: linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #8b5cf6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: 0 2px 8px rgba(59, 130, 246, 0.15);
    animation: ${float} 3s ease-in-out infinite;
  }
`;

export const ProfileIcon = styled(CgProfile)`
  width: 44px;
  height: 44px;
  color: #3b82f6;
  padding: 8px;
  border-radius: 50%;
  background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.15);

  &:hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 4px 16px rgba(59, 130, 246, 0.25);
    background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
    color: #2563eb;
  }

  &:active {
    transform: translateY(0) scale(1);
    box-shadow: 0 2px 8px rgba(59, 130, 246, 0.2);
  }
`;
