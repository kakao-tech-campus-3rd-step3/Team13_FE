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

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${spacing.spacing2};

  h2 {
    ${typography.title2Bold};
    margin: 0;
    color: ${colors.text.default};
  }
`;

export const TestLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing.spacing2};

  a {
    ${typography.body2Bold};
    padding: ${spacing.spacing1} ${spacing.spacing2};
    border-radius: 999px;
    background-color: ${colors.gray[100]};
    color: ${colors.text.default};
    text-decoration: none;

    &:hover {
      background-color: ${colors.gray[200]};
    }
  }
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

/* MatchCard 테스트 섹션 스타일링 */
export const MatchCardTestSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${spacing.spacing4};
  margin-top: ${spacing.spacing6};

  h2 {
    ${typography.title1Bold};
    color: ${colors.text.default};
    text-align: center;
    margin-bottom: ${spacing.spacing4};
    padding-bottom: ${spacing.spacing2};
    border-bottom: 2px solid ${colors.brand.kakaoYellow};
  }

  h3 {
    ${typography.title2Bold};
    color: ${colors.text.default};
    margin: ${spacing.spacing5} 0 ${spacing.spacing3} 0;
    padding-left: ${spacing.spacing2};
    border-left: 4px solid ${colors.brand.kakaoYellow};
  }
`;

export const MatchCardGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.spacing3};
`;

export const MatchCardItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.spacing2};
  padding: ${spacing.spacing3};
  background-color: ${colors.gray[100]};
  border-radius: 12px;
  border: 1px solid ${colors.gray[200]};

  h4 {
    ${typography.body1Bold};
    color: ${colors.text.sub};
    margin: 0 0 ${spacing.spacing2} 0;
    font-size: 14px;
  }

  /* MatchCard가 중앙에 오도록 */
  > * {
    align-self: center;
  }
`;
