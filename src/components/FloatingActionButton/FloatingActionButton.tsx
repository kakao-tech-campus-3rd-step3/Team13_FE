import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import * as S from './FloatingActionButton.styled';

interface MenuItem {
  icon: string;
  label: string;
  path: string;
}

const menuItems: MenuItem[] = [
  { icon: '📋', label: '매칭 히스토리', path: '/match-history' },
  { icon: '🎯', label: '매칭 생성하기', path: '/create-match' },
];

/**
 * Floating Action Button 컴포넌트
 * - 우측 하단에 고정
 * - 클릭 시 메뉴 토글
 * - 매칭 히스토리, 매칭 생성하기로 이동
 */
export default function FloatingActionButton() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleMenuClick = (path: string) => {
    setIsOpen(false);
    void navigate(path);
  };

  const handleBackdropClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <S.Backdrop isOpen={isOpen} onClick={handleBackdropClick} />
      <S.FABContainer>
        <S.MenuContainer isOpen={isOpen}>
          {menuItems.map((item, index) => (
            <S.MenuItem
              key={item.path}
              index={index}
              onClick={() => handleMenuClick(item.path)}
            >
              <S.MenuIcon>{item.icon}</S.MenuIcon>
              {item.label}
            </S.MenuItem>
          ))}
        </S.MenuContainer>
        <S.MainFAB isOpen={isOpen} onClick={handleToggle} />
      </S.FABContainer>
    </>
  );
}
