import styled from '@emotion/styled';

export const PageContainer = styled.main`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing4};
  padding-bottom: ${({ theme }) => theme.spacing6};
  background: ${({ theme }) => theme.background.fill};
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing2};
  padding: ${({ theme }) => `${theme.spacing3} ${theme.spacing4}`};
  background: ${({ theme }) => theme.background.default};
`;

export const SectionTitle = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.text.default};
  font-size: ${({ theme }) => theme.subtitle1Bold.fontSize};
  font-weight: ${({ theme }) => theme.subtitle1Bold.fontWeight};
  line-height: ${({ theme }) => theme.subtitle1Bold.lineHeight};
`;

export const StateGrid = styled.dl`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
  gap: ${({ theme }) => theme.spacing2};
  margin: 0;
`;

export const StateRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing1};
  padding: ${({ theme }) => theme.spacing2};
  border-radius: ${({ theme }) => theme.spacing2};
  background: ${({ theme }) => theme.gray[100]};
`;

export const StateLabel = styled.dt`
  color: ${({ theme }) => theme.text.sub};
  font-size: ${({ theme }) => theme.label2Regular.fontSize};
  font-weight: ${({ theme }) => theme.label2Regular.fontWeight};
  line-height: ${({ theme }) => theme.label2Regular.lineHeight};
`;

export const StateValue = styled.dd`
  margin: 0;
  color: ${({ theme }) => theme.text.default};
  font-size: ${({ theme }) => theme.body2Bold.fontSize};
  font-weight: ${({ theme }) => theme.body2Bold.fontWeight};
  line-height: ${({ theme }) => theme.body2Bold.lineHeight};
`;

export const GuideText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.text.sub};
  font-size: ${({ theme }) => theme.label1Regular.fontSize};
  font-weight: ${({ theme }) => theme.label1Regular.fontWeight};
  line-height: ${({ theme }) => theme.label1Regular.lineHeight};
`;
