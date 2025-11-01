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
