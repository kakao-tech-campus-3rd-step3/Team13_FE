import React from 'react';

import IconButton from '@/components/iconButton';

import * as S from './homeTitleBar.styled';

interface HomeTitleBarProps {
  title: string;
  onMenu: () => void;
}

const HomeTitleBar = ({ title, onMenu }: HomeTitleBarProps) => {
  return (
    <S.Wrapper
      title={title}
      rightSlot={
        <IconButton ariaLabel="profile" onClick={onMenu}>
          <S.ProfileIcon aria-hidden />
        </IconButton>
      }
    />
  );
};

export default HomeTitleBar;
