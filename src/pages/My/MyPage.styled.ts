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
