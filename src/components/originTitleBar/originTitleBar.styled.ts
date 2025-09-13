import styled from '@emotion/styled';

import TitleBar from '@/components/titleBar';
import { colors } from '@/theme/color';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';

export const Wrapper = styled(TitleBar)`
  background-color: ${colors.background.default};
`;

export const BackButton = styled.button`
  width: ${spacing.spacing14};
  height: ${spacing.spacing14};
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  padding: 0;
  color: ${colors.text.default};
  ${typography.title1Bold};
  cursor: pointer;
`;
