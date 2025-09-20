import styled from '@emotion/styled';

import Button, { ToggleButton } from '@/components/button';
import { colors } from '@/theme/color';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';

export const StyledTextButton = styled(Button)`
  ${typography.body2Bold};
  padding: ${spacing.spacing2} ${spacing.spacing4};
  color: ${colors.text.default};
  background: transparent;
  border-radius: ${spacing.spacing1};

  &:hover {
    background: ${colors.background.fill};
  }

  &:active {
    background: ${colors.gray[200]};
  }
`;

export const StyledToggleTextButton =
  StyledTextButton.withComponent(ToggleButton);
