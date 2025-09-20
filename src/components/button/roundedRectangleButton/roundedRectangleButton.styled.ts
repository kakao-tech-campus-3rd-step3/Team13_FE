import { css } from '@emotion/react';
import styled from '@emotion/styled';

import Button, { ToggleButton } from '@/components/button';
import { colors } from '@/theme/color';
import { spacing } from '@/theme/spacing';

export interface RoundedRectangleColors {
  background?: string;
  color?: string;
  hover?: string;
  active?: string;
}

const defaultColors = {
  background: colors.blue[700],
  color: colors.gray[0],
  hover: colors.blue[800],
  active: colors.blue[900],
};

export const StyledRoundedRectangleButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'colorSet',
})<{
  colorSet?: RoundedRectangleColors;
}>`
  border-radius: ${spacing.spacing2};
  ${({ colorSet }) => {
    const c = { ...defaultColors, ...colorSet };
    return css`
      background: ${c.background};
      color: ${c.color};
      border: 1px solid ${c.background};
      &:hover {
        background: ${c.hover};
      }
      &:active {
        background: ${c.active};
      }
    `;
  }}
`;

export const StyledToggleRoundedRectangleButton =
  StyledRoundedRectangleButton.withComponent(ToggleButton);
