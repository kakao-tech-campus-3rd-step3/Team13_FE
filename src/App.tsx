import React from 'react';

import UserHeader from '@/components/Header/UserHeader';
import PreferenceToggles from '@/components/Toggles/PreferenceToggles';

import {
  Description,
  Nav,
  NavItem,
  NavLink,
  NavList,
  PreviewDescription,
  PreviewSection,
  PreviewTitle,
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
          <NavItem>
            <NavLink href="/test/store">스토어 상태 테스트</NavLink>
          </NavItem>
        </NavList>
      </Nav>
      <PreviewSection aria-label="store-preview">
        <PreviewTitle>스토어 상태 UI 미리보기</PreviewTitle>
        <PreviewDescription>
          아래 토글과 헤더를 조작해 새로고침 후에도 상태가 유지되는지 확인해
          보세요.
        </PreviewDescription>
        <UserHeader />
        <PreferenceToggles />
      </PreviewSection>
    </Container>
  );
};

export default App;
