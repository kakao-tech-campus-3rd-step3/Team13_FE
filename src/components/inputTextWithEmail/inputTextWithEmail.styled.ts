import styled from '@emotion/styled';

import { colors } from '@/theme/color';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.spacing1};
`;

export const InputArea = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.spacing2};
`;

export const LocalInput = styled.input`
  flex: 1;
  padding: ${spacing.spacing2};
  border: 1px solid ${colors.border.default};
  border-radius: ${spacing.spacing1};
  ${typography.body1Regular};
`;

export const AtSign = styled.span`
  ${typography.body1Regular};
  color: ${colors.text.sub};
`;

export const DomainSelect = styled.select`
  padding: ${spacing.spacing2};
  border: 1px solid ${colors.border.default};
  border-radius: ${spacing.spacing1};
  ${typography.body1Regular};
  background-color: ${colors.background.default};
`;

export const DomainInput = styled.input`
  padding: ${spacing.spacing2};
  border: 1px solid ${colors.border.default};
  border-radius: ${spacing.spacing1};
  ${typography.body1Regular};
`;

export const HelperText = styled.p`
  ${typography.label2Regular};
  color: ${colors.text.sub};
  margin: 0;
  text-align: left;
`;
