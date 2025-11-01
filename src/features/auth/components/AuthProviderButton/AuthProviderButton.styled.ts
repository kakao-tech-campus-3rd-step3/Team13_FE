import styled from '@emotion/styled';

import { colors } from '@/theme/color';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';

export const Button = styled.button<{ $fullWidth: boolean; $loading: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing.spacing3};
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  min-height: 48px;
  padding: ${spacing.spacing3} ${spacing.spacing4};
  border-radius: 999px;
  border: 1px solid transparent;
  font-family: 'Pretendard', sans-serif;
  ${typography.body1Bold};
  cursor: pointer;
  pointer-events: ${({ $loading }) => ($loading ? 'none' : 'auto')};
  transition:
    transform 120ms ease,
    box-shadow 200ms ease,
    filter 120ms ease,
    opacity 200ms ease;
  background-color: transparent;
  color: ${colors.text.default};

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px rgba(33, 124, 249, 0.35);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export const Label = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing.spacing2};
`;

export const Icon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export const GoogleButton = styled(Button)`
  background-color: ${colors.gray[0]};
  color: ${colors.text.default};
  border-color: ${colors.gray[300]};
  box-shadow: 0 12px 32px rgba(15, 23, 42, 0.08);

  &:hover:not(:disabled) {
    filter: brightness(0.98);
    box-shadow: 0 18px 48px rgba(15, 23, 42, 0.12);
  }

  &:active:not(:disabled) {
    filter: brightness(0.94);
  }
`;

export const KakaoButton = styled(Button)`
  background-color: ${colors.brand.kakaoYellow};
  color: ${colors.brand.kakaoBrown};
  border-color: ${colors.brand.kakaoYellowHover};
  box-shadow: 0 12px 32px rgba(251, 228, 94, 0.4);

  &:hover:not(:disabled) {
    background-color: ${colors.brand.kakaoYellowHover};
    box-shadow: 0 16px 40px rgba(251, 228, 94, 0.48);
  }

  &:active:not(:disabled) {
    background-color: ${colors.brand.kakaoYellowPressed};
  }
`;
