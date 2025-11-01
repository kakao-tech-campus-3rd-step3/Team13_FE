import styled from '@emotion/styled';

export const PageContainer = styled.main`
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  padding: ${({ theme }) => `${theme.spacing6} ${theme.spacing4}`};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing4};
`;

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing1};
`;

export const Title = styled.h1`
  margin: 0;
  color: ${({ theme }) => theme.text.default};
  font-size: ${({ theme }) => theme.title1Bold.fontSize};
  font-weight: ${({ theme }) => theme.title1Bold.fontWeight};
  line-height: ${({ theme }) => theme.title1Bold.lineHeight};
`;

export const Description = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.text.sub};
  font-size: ${({ theme }) => theme.body2Regular.fontSize};
  font-weight: ${({ theme }) => theme.body2Regular.fontWeight};
  line-height: ${({ theme }) => theme.body2Regular.lineHeight};
`;

export const Content = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing3};
`;
