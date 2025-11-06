import styled from '@emotion/styled';

import { colors } from '@/theme/color';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';

export const Page = styled.main`
  display: flex;
  flex-direction: column;
  gap: ${spacing.spacing5};
  min-height: 100vh;
  padding: ${spacing.spacing6} ${spacing.spacing4};
  background-color: ${colors.background.fill};
`;

export const TitleBarWrapper = styled.div`
  width: 100%;
  max-width: 560px;
  margin: 0 auto;
`;

export const Content = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${spacing.spacing4};
  width: 100%;
  max-width: 560px;
  margin: 0 auto;
  padding: ${spacing.spacing6} ${spacing.spacing4};
  border-radius: 24px;
  background-color: ${colors.gray[0]};
  box-shadow: 0 24px 48px rgba(15, 23, 42, 0.08);
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
  white-space: pre-line;
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const BackButton = styled.button`
  padding: ${spacing.spacing2} ${spacing.spacing4};
  border: none;
  border-radius: 9999px;
  background-color: ${colors.gray[900]};
  color: ${colors.gray[0]};
  ${typography.body1Bold};
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    opacity 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(15, 23, 42, 0.2);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(15, 23, 42, 0.3);
  }
`;
