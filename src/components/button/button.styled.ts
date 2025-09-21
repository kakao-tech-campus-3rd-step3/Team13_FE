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

const sizeStyles: Record<ButtonSize, ReturnType<typeof css>> = {
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
};

const variantStyles: Record<ButtonVariant, ReturnType<typeof css>> = {
  primary: css`
    background: ${colors.brand.kakaoYellow};
    color: ${colors.brand.kakaoBrown};
    border: 0;
    --btn-hover-background: ${colors.brand.kakaoYellowHover};
    --btn-active-background: ${colors.brand.kakaoYellowPressed};
  `,
  secondary: css`
    background: ${colors.background.fill};
    color: ${colors.text.default};
    border: 1px solid ${colors.border.default};
    --btn-hover-background: ${colors.gray[100]};
    --btn-active-background: ${colors.gray[200]};
  `,
  text: css`
    background: transparent;
    color: ${colors.text.default};
    border: 0;
    border-radius: ${spacing.spacing1};
    --btn-hover-background: ${colors.background.fill};
    --btn-active-background: ${colors.gray[200]};
  `,
  icon: css`
    background: transparent;
    color: ${colors.text.default};
    border: 0;
    border-radius: ${spacing.spacing1};
    padding: ${spacing.spacing2};
    --btn-hover-background: ${colors.background.fill};
    --btn-active-background: ${colors.gray[200]};
  `,
  round: css`
    background: ${colors.brand.kakaoYellow};
    color: ${colors.brand.kakaoBrown};
    border: 0;
    border-radius: 50%;
    padding: 0;
    gap: 0;
    --btn-hover-background: ${colors.brand.kakaoYellowHover};
    --btn-active-background: ${colors.brand.kakaoYellowPressed};
  `,
  login: css`
    background: ${colors.brand.kakaoYellow};
    color: ${colors.brand.kakaoBrown};
    border: 0;
    ${typography.subtitle1Bold};
    --btn-hover-background: ${colors.brand.kakaoYellowHover};
    --btn-active-background: ${colors.brand.kakaoYellowPressed};
  `,
};

const variantSizeOverrides: Partial<
  Record<ButtonVariant, Partial<Record<ButtonSize, ReturnType<typeof css>>>>
> = {
  round: {
    sm: css`
      width: ${spacing.spacing10};
      height: ${spacing.spacing10};
      ${typography.title2Bold};

      svg {
        width: ${spacing.spacing5};
        height: ${spacing.spacing5};
      }
    `,
    md: css`
      width: ${spacing.spacing12};
      height: ${spacing.spacing12};
      ${typography.title2Bold};

      svg {
        width: ${spacing.spacing6};
        height: ${spacing.spacing6};
      }
    `,
    lg: css`
      width: ${spacing.spacing16};
      height: ${spacing.spacing16};
      ${typography.title1Bold};

      svg {
        width: ${spacing.spacing8};
        height: ${spacing.spacing8};
      }
    `,
  },
  text: {
    sm: css`
      padding: ${spacing.spacing2} ${spacing.spacing4};
      ${typography.body2Bold};
    `,
    md: css`
      padding: ${spacing.spacing2} ${spacing.spacing4};
      ${typography.body2Bold};
    `,
    lg: css`
      padding: ${spacing.spacing2} ${spacing.spacing5};
      ${typography.body2Bold};
    `,
  },
  icon: {
    sm: css`
      width: ${spacing.spacing8};
      height: ${spacing.spacing8};
      padding: ${spacing.spacing1};

      svg {
        width: ${spacing.spacing4};
        height: ${spacing.spacing4};
      }
    `,
    md: css`
      width: ${spacing.spacing10};
      height: ${spacing.spacing10};
      padding: ${spacing.spacing2};

      svg {
        width: ${spacing.spacing5};
        height: ${spacing.spacing5};
      }
    `,
    lg: css`
      width: ${spacing.spacing12};
      height: ${spacing.spacing12};
      padding: ${spacing.spacing3};

      svg {
        width: ${spacing.spacing6};
        height: ${spacing.spacing6};
      }
    `,
  },
  login: {
    sm: css`
      ${typography.subtitle1Bold};
    `,
    md: css`
      ${typography.subtitle1Bold};
    `,
    lg: css`
      ${typography.subtitle1Bold};
    `,
  },
};

export const StyledButton = styled.button<{
  variant: ButtonVariant;
  size: ButtonSize;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing.spacing2};
  border: none;
  cursor: pointer;
  border-radius: ${spacing.spacing1};
  background: ${colors.background.fill};
  color: ${colors.text.default};
  padding: ${spacing.spacing3} ${spacing.spacing4};

  ${({ size }) => sizeStyles[size]};
  ${({ variant }) => variantStyles[variant]};
  ${({ variant, size }) =>
    variantSizeOverrides[variant]?.[size] ??
    variantSizeOverrides[variant]?.md ??
    null};

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

  &:hover {
    background: var(--btn-hover-background, currentColor);
  }

  &:active {
    background: var(--btn-active-background, currentColor);
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
