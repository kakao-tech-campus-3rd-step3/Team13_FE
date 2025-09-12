import React from 'react';

import * as S from './titleBar.styled';

interface TitleBarProps {
  leftSlot?: React.ReactNode;
  title?: string;
  rightSlot?: React.ReactNode;
  className?: string;
}

const TitleBar = ({ leftSlot, title, rightSlot, className }: TitleBarProps) => {
  return (
    <S.Wrapper className={className}>
      <S.Slot>{leftSlot}</S.Slot>
      <S.Title>{title}</S.Title>
      <S.Slot>{rightSlot}</S.Slot>
    </S.Wrapper>
  );
};

export default TitleBar;
