import styled from '@emotion/styled';

import { colors } from '@/theme/color';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';

export const Wrapper = styled.header`
  display: flex;
  align-items: center;
  height: ${spacing.spacing14};
  border-bottom: 1px solid ${colors.border.default};
`;

export const Slot = styled.div`
  width: ${spacing.spacing14};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: ${colors.text.default};
  ${typography.title1Bold};
  font-size: 1.125rem;
`;
