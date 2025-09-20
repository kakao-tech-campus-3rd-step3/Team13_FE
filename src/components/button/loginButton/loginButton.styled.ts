import styled from '@emotion/styled';

import Button, { ToggleButton } from '@/components/button';
import { colors } from '@/theme/color';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';

export const StyledLoginButton = styled(Button)`
  width: 100%;
  ${typography.subtitle1Bold};
  padding: ${spacing.spacing3} ${spacing.spacing4};
  background: ${colors.brand.kakaoYellow};
  color: ${colors.brand.kakaoBrown};

  &:hover {
    background: ${colors.brand.kakaoYellowHover};
  }

  &:active {
    background: ${colors.brand.kakaoYellowPressed};
  }
`;

export const StyledToggleLoginButton =
  StyledLoginButton.withComponent(ToggleButton);
