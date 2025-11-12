import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { MdArrowBack } from 'react-icons/md';

import TitleBar from '@/components/titleBar';

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

export const Wrapper = styled(TitleBar)`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  height: 64px;
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

  /* 타이틀 텍스트 스타일링 */
  & > div:nth-of-type(2) {
    font-size: 18px;
    font-weight: 700;
    color: #0f172a;
    letter-spacing: -0.02em;
  }
`;

export const BackIcon = styled(MdArrowBack)`
  width: 50px;
  height: 50px;
  color: #3b82f6;
  padding: 5px;
  border-radius: 12px;
  background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.15);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;

  &:hover {
    transform: translateX(-2px) scale(1.05);
    box-shadow: 0 4px 16px rgba(59, 130, 246, 0.25);
    background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
    color: #2563eb;
  }

  &:active {
    transform: translateX(0) scale(1);
    box-shadow: 0 2px 8px rgba(59, 130, 246, 0.2);
  }
`;
