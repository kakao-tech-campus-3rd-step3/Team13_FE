import React from 'react';

import {
  Description,
  Nav,
  NavItem,
  NavLink,
  NavList,
  Title,
  Container,
} from './App.styled';
const App: React.FC = () => {
  return (
    <Container>
      <Title>Team13 Demo Home</Title>
      <Description>
        컴포넌트 테스트 전용 페이지로 이동해 최신 훅 UI를 확인하세요.
      </Description>
      <Nav>
        <NavList>
          <NavItem>
            <NavLink href="/test">컴포넌트 테스트 홈</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/test/sports">스포츠 목록 테스트</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/test/games">게임 리스트 테스트</NavLink>
          </NavItem>
        </NavList>
      </Nav>
    </Container>
  );
};

export default App;
