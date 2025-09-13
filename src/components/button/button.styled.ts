import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';

import { colors } from '@/theme/color';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'text'
  | 'icon'
  | 'round'
  | 'login';
export type ButtonSize = 'sm' | 'md' | 'lg';

const variantStyles = {
  primary: css`
    background: ${colors.brand.kakaoYellow};
    color: ${colors.brand.kakaoBrown};
    &:hover {
      background: ${colors.brand.kakaoYellowHover};
    }
    &:active {
      background: ${colors.brand.kakaoYellowPressed};
    }
  `,
  secondary: css`
    background: ${colors.background.fill};
    color: ${colors.text.default};
    border: 1px solid ${colors.border.default};
    &:hover {
      background: ${colors.gray[100]};
    }
    &:active {
      background: ${colors.gray[200]};
    }
  `,
  text: css`
    background: transparent;
    color: ${colors.text.default};
    padding: 0;
    &:hover {
      background: ${colors.background.fill};
    }
    &:active {
      background: ${colors.gray[200]};
    }
  `,
  icon: css`
    background: transparent;
    color: ${colors.text.default};
    padding: ${spacing.spacing2};
    border-radius: ${spacing.spacing1};
    &:hover {
      background: ${colors.background.fill};
    }
    &:active {
      background: ${colors.gray[200]};
    }
  `,
  round: css`
    background: ${colors.brand.kakaoYellow};
    color: ${colors.brand.kakaoBrown};
    border-radius: 50%;
    padding: ${spacing.spacing3};
    &:hover {
      background: ${colors.brand.kakaoYellowHover};
    }
    &:active {
      background: ${colors.brand.kakaoYellowPressed};
    }
  `,
  login: css`
    background: ${colors.brand.kakaoYellow};
    color: ${colors.brand.kakaoBrown};
    ${typography.subtitle1Bold};
    &:hover {
      background: ${colors.brand.kakaoYellowHover};
    }
    &:active {
      background: ${colors.brand.kakaoYellowPressed};
    }
  `,
} as const;

const sizeStyles = {
  sm: css`
    padding: ${spacing.spacing2} ${spacing.spacing3};
    ${typography.body2Bold};
  `,
  md: css`
    padding: ${spacing.spacing3} ${spacing.spacing4};
    ${typography.body1Bold};
  `,
  lg: css`
    padding: ${spacing.spacing4} ${spacing.spacing6};
    ${typography.title2Bold};
  `,
} as const;

export const StyledButton = styled.button<{
  variant: ButtonVariant;
  size: ButtonSize;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  ${typography.body1Bold};

  ${({ size }) => sizeStyles[size]};
  ${({ variant }) => variantStyles[variant]};

  &:focus-visible {
    outline: 2px solid ${colors.status.info};
    outline-offset: 2px;
  }

  &[disabled],
  &[data-loading='true'] {
    cursor: not-allowed;
    opacity: 0.6;
    pointer-events: none;
  }

  &[disabled]:hover,
  &[data-loading='true']:hover,
  &[disabled]:active,
  &[data-loading='true']:active {
    background: inherit;
  }

  &[aria-pressed='true'] {
    box-shadow: inset 0 0 0 2px ${colors.border.default};
    filter: saturate(1.05);
  }
`;

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div`
  width: 1em;
  height: 1em;
  border: 2px solid ${colors.background.fill};
  border-top-color: ${colors.text.sub};
  border-radius: 50%;
  animation: ${spin} 0.6s linear infinite;
`;
