import styled from '@emotion/styled';

import { colors } from '@/theme/color';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';

export const Section = styled.main`
  display: grid;
  gap: ${spacing.spacing5};
`;

export const TitleBarWrapper = styled.div`
  margin: -${spacing.spacing6} -${spacing.spacing5} 0;
  padding-bottom: ${spacing.spacing4};
`;

export const Header = styled.header`
  display: grid;
  gap: ${spacing.spacing4};
`;

export const HeaderContent = styled.div`
  display: grid;
  gap: ${spacing.spacing2};
`;

export const Title = styled.h1`
  margin: 0;
  text-align: center;
  ${typography.title1Bold};
  color: ${colors.text.default};
`;

export const Description = styled.p`
  margin: 0;
  ${typography.body1Regular};
  color: ${colors.text.sub};
  text-align: center;
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

export const StatusRegion = styled.div`
  display: grid;
  gap: ${spacing.spacing2};
`;

const statusBase = `
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${spacing.spacing3};
  padding: ${spacing.spacing3};
  border-radius: 16px;
  transition: background-color 160ms ease;
`;

export const StatusMessage = styled.div`
  ${statusBase};
  background-color: ${colors.status.infoBackground};
  color: ${colors.status.info};
`;

export const ErrorMessage = styled.div`
  ${statusBase};
  background-color: ${colors.status.criticalBackground};
  color: ${colors.status.critical};
`;

export const StatusContent = styled.div`
  display: grid;
  gap: ${spacing.spacing1};
`;

export const StatusTitle = styled.p`
  margin: 0;
  ${typography.body1Bold};
`;

export const StatusDescription = styled.p`
  margin: 0;
  ${typography.body2Regular};
  color: inherit;
`;

export const RetryButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${spacing.spacing2} ${spacing.spacing3};
  border-radius: 12px;
  border: none;
  background-color: ${colors.background.default};
  ${typography.label1Bold};
  color: ${colors.status.critical};
  cursor: pointer;
  transition:
    transform 120ms ease,
    box-shadow 180ms ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 18px rgba(250, 52, 44, 0.18);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(250, 52, 44, 0.2);
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px rgba(250, 52, 44, 0.35);
  }
`;
