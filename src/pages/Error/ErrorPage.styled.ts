import styled from '@emotion/styled';

import { colors } from '@/theme/color';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';

export const Page = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: ${spacing.spacing6} ${spacing.spacing4};
  background-color: ${colors.background.fill};
  text-align: center;
`;

export const Heading = styled.h1`
  ${typography.title1Bold};
  color: ${colors.text.default};
  margin: 0;
`;

export const Description = styled.p`
  ${typography.body1Regular};
  color: ${colors.text.sub};
  margin: ${spacing.spacing3} 0 0;
`;
