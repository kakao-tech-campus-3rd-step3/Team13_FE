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

export const ProfileSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${spacing.spacing4};
  max-width: 560px;
  width: 100%;
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

export const Avatar = styled.img`
  width: 96px;
  height: 96px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid ${colors.yellow[200]};
  box-shadow: 0 12px 24px rgba(15, 23, 42, 0.12);
`;

export const UserMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.spacing1};
`;

export const UserName = styled.h2`
  ${typography.title2Bold};
  color: ${colors.text.default};
  margin: 0;
`;

export const UserEmail = styled.p`
  ${typography.body1Regular};
  color: ${colors.text.sub};
  margin: 0;
  word-break: break-all;
`;

export const EmptyState = styled.p`
  ${typography.body1Regular};
  color: ${colors.text.sub};
  margin: 0;
`;

export const StatusList = styled.dl`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: ${spacing.spacing3};
  margin: 0;
`;

export const StatusItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.spacing1};
  padding: ${spacing.spacing3};
  border-radius: 16px;
  background-color: ${colors.background.fill};
  border: 1px solid ${colors.border.default};
`;

export const StatusLabel = styled.dt`
  ${typography.label1Regular};
  color: ${colors.text.sub};
  margin: 0;
`;

export const StatusValue = styled.dd`
  ${typography.title2Bold};
  color: ${colors.text.default};
  margin: 0;
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: ${spacing.spacing4};
`;

export const LogoutButton = styled.button`
  padding: ${spacing.spacing2} ${spacing.spacing4};
  border-radius: 9999px;
  border: none;
  background-color: ${colors.blue[700]};
  color: ${colors.gray[0]};
  ${typography.body1Bold};
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(33, 124, 249, 0.25);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(19, 95, 205, 0.35);
  }
`;
