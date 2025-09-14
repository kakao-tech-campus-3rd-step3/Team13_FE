import styled from '@emotion/styled';

import Button from '@/components/button';
import { colors } from '@/theme/color';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';

export const StyledIconButton = styled(Button)`
  ${typography.body1Bold};
  width: ${spacing.spacing10};
  height: ${spacing.spacing10};
  padding: ${spacing.spacing2};
  color: ${colors.text.default};
  background: transparent;
  border-radius: ${spacing.spacing1};

  &:hover {
    background: ${colors.background.fill};
  }

  &:active {
    background: ${colors.gray[200]};
  }

  svg {
    width: ${spacing.spacing5};
    height: ${spacing.spacing5};
  }
`;
