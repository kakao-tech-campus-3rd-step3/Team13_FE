import styled from '@emotion/styled';

import { colors } from '@/theme/color';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.spacing3};
  padding: ${spacing.spacing4};
`;

export const EmailText = styled.p`
  margin: 0;
  ${typography.body1Regular};
  color: ${colors.text.default};
`;

export const CountText = styled.p`
  margin: 0;
  ${typography.body1Regular};
  color: ${colors.text.default};
`;
