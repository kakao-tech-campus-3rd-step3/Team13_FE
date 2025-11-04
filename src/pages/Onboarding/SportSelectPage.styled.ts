import styled from '@emotion/styled';

export const Page = styled.main`
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: ${({ theme }) => theme.spacing3};
  min-height: 100vh;
  background: ${({ theme }) => theme.background.fill};
`;

export const Content = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing3};
  padding: ${({ theme }) => `${theme.spacing4} ${theme.spacing4}`};
`;

export const SectionTitle = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.text.default};
  font-size: ${({ theme }) => theme.subtitle1Bold.fontSize};
  font-weight: ${({ theme }) => theme.subtitle1Bold.fontWeight};
  line-height: ${({ theme }) => theme.subtitle1Bold.lineHeight};
`;

export const SectionHint = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.text.placeholder};
  font-size: ${({ theme }) => theme.label1Regular.fontSize};
  line-height: ${({ theme }) => theme.label1Regular.lineHeight};
`;

export const List = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing2};
`;
