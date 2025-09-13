import React from 'react';

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
        <S.IconButton aria-label="profile" onClick={onMenu}>
          <S.ProfileIcon />
        </S.IconButton>
      }
    />
  );
};

export default HomeTitleBar;
