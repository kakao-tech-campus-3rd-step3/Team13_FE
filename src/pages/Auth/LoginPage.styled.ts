import styled from '@emotion/styled';

import { colors } from '@/theme/color';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';

export const Page = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
  padding: ${spacing.spacing6} ${spacing.spacing4};
  background-color: ${colors.background.fill};
`;

export const Card = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${spacing.spacing4};
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  padding: ${spacing.spacing6} ${spacing.spacing4};
  border-radius: 24px;
  background-color: ${colors.gray[0]};
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.08);
`;

export const Heading = styled.h1`
  ${typography.title1Bold};
  color: ${colors.text.default};
  margin: 0;
`;

export const Description = styled.p`
  ${typography.body1Regular};
  color: ${colors.text.sub};
  margin: 0;
`;

export const Toast = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.spacing2};
  padding: ${spacing.spacing2} ${spacing.spacing3};
  border-radius: 12px;
  background-color: ${colors.yellow[100]};
  color: ${colors.brown[800]};
  ${typography.body2Bold};
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.spacing3};
`;
