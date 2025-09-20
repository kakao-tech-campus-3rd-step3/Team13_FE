import { css } from '@emotion/react';
import styled from '@emotion/styled';

import Button, { ToggleButton } from '@/components/button';
import { colors } from '@/theme/color';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';

const sizeStyles = {
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
} as const;

export const StyledRoundButton = styled(Button)<{ size: 'md' | 'lg' }>`
  padding: 0;
  border-radius: 50%;
  background: ${colors.brand.kakaoYellow};
  color: ${colors.brand.kakaoBrown};

  ${({ size }) => sizeStyles[size]};

  &:hover {
    background: ${colors.brand.kakaoYellowHover};
  }

  &:active {
    background: ${colors.brand.kakaoYellowPressed};
  }
`;

export const StyledToggleRoundButton =
  StyledRoundButton.withComponent(ToggleButton);
