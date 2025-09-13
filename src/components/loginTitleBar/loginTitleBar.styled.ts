import styled from '@emotion/styled';

import TitleBar from '@/components/titleBar';
import { colors } from '@/theme/color';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';

export const Wrapper = styled(TitleBar)`
  background-color: ${colors.background.default};
  padding: 0 ${spacing.spacing4};

  & > div:nth-of-type(2) {
    ${typography.title1Bold};
    color: ${colors.text.default};
  }
`;
