import styled from '@emotion/styled';

import { colors } from '@/theme/color';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';

export const Section = styled.main`
  display: grid;
  gap: ${spacing.spacing5};
`;

export const Header = styled.header`
  display: grid;
  gap: ${spacing.spacing2};
`;

export const Title = styled.h1`
  margin: 0;

  ${typography.title1Bold};
  color: ${colors.text.default};
`;

export const Description = styled.p`
  margin: 0;
  ${typography.body1Regular};
  color: ${colors.text.sub};
`;

export const ExpiredNotice = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.spacing2};
  padding: ${spacing.spacing2} ${spacing.spacing3};
  border-radius: 14px;
  background-color: ${colors.status.criticalBackground};
  color: ${colors.status.critical};
  ${typography.body2Bold};
`;

export const ButtonStack = styled.div`
  display: grid;
  gap: ${spacing.spacing3};
`;

export const Divider = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: ${spacing.spacing2};
  color: ${colors.text.placeholder};
  ${typography.label1Regular};

  &::before,
  &::after {
    content: '';
    height: 1px;
    background-color: ${colors.border.disabled};
  }
`;

export const DummyButtonWrapper = styled.div`
  display: grid;
  gap: ${spacing.spacing2};
`;
