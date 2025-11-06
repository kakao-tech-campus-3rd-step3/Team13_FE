import { css } from '@emotion/react';
import styled from '@emotion/styled';

import type { Theme } from '@/theme';

export const Field = styled.div<{ invalid?: boolean }>`
  display: grid;
  gap: ${({ theme }) => theme.spacing2};
  padding: ${({ theme }) => `${theme.spacing3} ${theme.spacing4}`};
  border-radius: 20px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.96) 0%,
    rgba(255, 255, 255, 0.85) 100%
  );
  border: 1px solid
    ${({ invalid, theme }) =>
      invalid ? theme.red[500] : 'rgba(148, 163, 184, 0.28)'};
  box-shadow: ${({ invalid }) =>
    invalid
      ? '0 14px 28px rgba(250, 52, 44, 0.12)'
      : '0 12px 28px rgba(15, 23, 42, 0.12)'};
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;

  &:focus-within {
    border-color: ${({ theme }) => theme.blue[500]};
    box-shadow:
      0 16px 36px rgba(33, 124, 249, 0.22),
      inset 0 0 0 1px rgba(255, 255, 255, 0.4);
    transform: translateY(-1px);
  }
`;

export const Label = styled.label`
  color: ${({ theme }) => theme.text.default};
  font-size: ${({ theme }) => theme.label1Bold.fontSize};
  font-weight: ${({ theme }) => theme.label1Bold.fontWeight};
  line-height: ${({ theme }) => theme.label1Bold.lineHeight};
  letter-spacing: -0.01em;
`;

const interactiveField = ({ theme }: { theme: Theme }) => css`
  width: 100%;
  border: 0;
  padding: 0;
  background: transparent;
  color: ${theme.text.default};
  font-size: ${theme.body1Regular.fontSize};
  font-weight: ${theme.body1Regular.fontWeight};
  line-height: ${theme.body1Regular.lineHeight};
  min-height: 40px;

  &::placeholder {
    color: ${theme.text.placeholder};
  }

  &:focus-visible {
    outline: none;
  }
`;

export const Input = styled.input`
  ${({ theme }) => interactiveField({ theme })};
`;

export const TextArea = styled.textarea`
  ${({ theme }) => interactiveField({ theme })};
  min-height: 132px;
  resize: vertical;
`;

export const Hint = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.text.placeholder};
  font-size: ${({ theme }) => theme.label2Regular.fontSize};
  font-weight: ${({ theme }) => theme.label2Regular.fontWeight};
  line-height: ${({ theme }) => theme.label2Regular.lineHeight};
`;

export const ErrorText = styled.p`
  margin: 0;
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing1};
  color: ${({ theme }) => theme.red[700]};
  font-size: ${({ theme }) => theme.label1Regular.fontSize};
  font-weight: ${({ theme }) => theme.label1Regular.fontWeight};
  line-height: ${({ theme }) => theme.label1Regular.lineHeight};

  &::before {
    content: '⚠️';
    font-size: ${({ theme }) => theme.label1Regular.fontSize};
    line-height: 1;
  }
`;
