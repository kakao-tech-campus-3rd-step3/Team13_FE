import styled from '@emotion/styled';

export const Container = styled.main`
  padding: ${({ theme }) => theme.spacing6};
  background-color: ${({ theme }) => theme.background.default};
  min-height: 100vh;
`;

export const Title = styled.h1`
  margin: 0;
  color: ${({ theme }) => theme.text.default};
  font-size: ${({ theme }) => theme.title1Bold.fontSize};
  font-weight: ${({ theme }) => theme.title1Bold.fontWeight};
  line-height: ${({ theme }) => theme.title1Bold.lineHeight};
`;

export const Description = styled.p`
  margin: ${({ theme }) => `${theme.spacing2} 0 ${theme.spacing4}`};
  color: ${({ theme }) => theme.text.sub};
  font-size: ${({ theme }) => theme.body1Regular.fontSize};
  font-weight: ${({ theme }) => theme.body1Regular.fontWeight};
  line-height: ${({ theme }) => theme.body1Regular.lineHeight};
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
`;

export const NavList = styled.ul`
  display: flex;
  gap: ${({ theme }) => theme.spacing3};
  padding: 0;
  margin: 0;
  list-style: none;
`;

export const NavItem = styled.li``;

export const NavLink = styled.a`
  color: ${({ theme }) => theme.blue[700]};
  font-size: ${({ theme }) => theme.body1Regular.fontSize};
  font-weight: ${({ theme }) => theme.body1Regular.fontWeight};
  line-height: ${({ theme }) => theme.body1Regular.lineHeight};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const PreviewSection = styled.section`
  margin-top: ${({ theme }) => theme.spacing5};
  display: grid;
  gap: ${({ theme }) => theme.spacing3};
  padding: ${({ theme }) => `${theme.spacing4}`};
  border-radius: ${({ theme }) => theme.spacing3};
  background: linear-gradient(
    145deg,
    ${({ theme }) => theme.gray[0]},
    ${({ theme }) => theme.gray[100]}
  );
  box-shadow: 0 4px 24px rgba(26, 28, 32, 0.08);
`;

export const PreviewTitle = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.text.default};
  font-size: ${({ theme }) => theme.subtitle1Bold.fontSize};
  font-weight: ${({ theme }) => theme.subtitle1Bold.fontWeight};
  line-height: ${({ theme }) => theme.subtitle1Bold.lineHeight};
`;

export const PreviewDescription = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.text.sub};
  font-size: ${({ theme }) => theme.body2Regular.fontSize};
  font-weight: ${({ theme }) => theme.body2Regular.fontWeight};
  line-height: ${({ theme }) => theme.body2Regular.lineHeight};
`;
