import styled from '@emotion/styled';
import { CgProfile } from 'react-icons/cg';

import TitleBar from '@/components/titleBar';
import { colors } from '@/theme/color';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';

export const Wrapper = styled(TitleBar)`
  background-color: #e1eefc;
  height: 60px;
  padding: 0 ${spacing.spacing2};

  & > div:nth-of-type(2) {
    ${typography.title1Bold};
    color: ${colors.text.default};
  }
`;

export const ProfileIcon = styled(CgProfile)`
  width: 40px;
  height: 40px;
  color: #4573a1;
`;
