import { css } from '@emotion/react';
import styled from '@emotion/styled';

import type { Theme } from '@/theme';

export const Form = styled.form`
  display: grid;
  gap: ${({ theme }) => theme.spacing5};
`;

export const Fields = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing4};
`;

export const SectionLabel = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.blue[700]};
  ${({ theme }) => theme.label1Bold};
  letter-spacing: 0.02em;
  text-transform: uppercase;
`;

export const Helper = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.text.sub};
  ${({ theme }) => theme.body2Regular};
`;

export const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing2};
  align-items: stretch;

  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: flex-end;
  }
`;

const baseButton = ({ theme }: { theme: Theme }) => css`
  border: 0;
  border-radius: 16px;
  padding: ${`${theme.spacing3} ${theme.spacing5}`};
  ${theme.body1Bold};
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    opacity 0.2s ease;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing1};

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
    transform: none;
    box-shadow: none;
  }
`;

export const SubmitButton = styled.button`
  ${({ theme }) => baseButton({ theme })};
  color: ${({ theme }) => theme.gray[0]};
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 45%, #1e40af 100%);
  box-shadow:
    0 12px 24px rgba(37, 99, 235, 0.25),
    0 4px 8px rgba(30, 64, 175, 0.2);

  &:hover:not(:disabled),
  &:focus-visible:not(:disabled) {
    transform: translateY(-1px);
    box-shadow:
      0 16px 32px rgba(37, 99, 235, 0.28),
      0 6px 12px rgba(30, 64, 175, 0.24);
  }

  &:focus-visible {
    outline: 3px solid rgba(37, 99, 235, 0.35);
    outline-offset: 3px;
  }
`;

export const SecondaryButton = styled.button`
  ${({ theme }) => baseButton({ theme })};
  background: rgba(15, 23, 42, 0.04);
  color: ${({ theme }) => theme.blue[900]};
  border: 1px solid rgba(37, 99, 235, 0.18);

  &:hover:not(:disabled),
  &:focus-visible:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 8px 16px rgba(15, 23, 42, 0.08);
  }

  &:focus-visible {
    outline: 3px solid rgba(30, 64, 175, 0.25);
    outline-offset: 3px;
  }
`;
