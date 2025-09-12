import styled from '@emotion/styled';

import { colors } from '@/theme/color';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';

export const TabList = styled.nav`
  display: flex;
  border-bottom: 1px solid ${colors.border.default};
`;

export const TabButton = styled.button<{ active: boolean }>`
  flex: 1;
  padding: ${spacing.spacing3} ${spacing.spacing4};
  background: none;
  border: none;
  cursor: pointer;
  ${typography.subtitle1Bold};
  color: ${({ active }) => (active ? colors.text.default : colors.text.sub)};
  border-bottom: ${({ active }) =>
    active ? `2px solid ${colors.brand.kakaoYellow}` : '2px solid transparent'};
`;

export const TabPanel = styled.div`
  padding: ${spacing.spacing4};
  ${typography.body1Regular};
`;
