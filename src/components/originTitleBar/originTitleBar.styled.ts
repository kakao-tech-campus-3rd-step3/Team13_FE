import styled from '@emotion/styled';
import { MdArrowBack } from 'react-icons/md';

import TitleBar from '@/components/titleBar';
import { colors } from '@/theme/color';
import { spacing } from '@/theme/spacing';

export const Wrapper = styled(TitleBar)`
  background-color: ${colors.background.default};
`;

export const BackIcon = styled(MdArrowBack)`
  width: ${spacing.spacing5};
  height: ${spacing.spacing5};
  color: ${colors.text.default};
`;
