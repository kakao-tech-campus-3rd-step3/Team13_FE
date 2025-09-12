import React from 'react';

import * as S from './titleBar.styled';

interface TitleBarProps {
  leftSlot?: React.ReactNode;
  title?: string;
  rightSlot?: React.ReactNode;
}

const TitleBar = ({ leftSlot, title, rightSlot }: TitleBarProps) => {
  return (
    <S.Wrapper>
      <S.Slot>{leftSlot}</S.Slot>
      <S.Title>{title}</S.Title>
      <S.Slot>{rightSlot}</S.Slot>
    </S.Wrapper>
  );
};

export default TitleBar;
