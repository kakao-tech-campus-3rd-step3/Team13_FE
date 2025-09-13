import React from 'react';

import * as S from './originTitleBar.styled';

interface OriginTitleBarProps {
  title: string;
  onBack: () => void;
  className?: string;
}

const OriginTitleBar = ({ title, onBack, className }: OriginTitleBarProps) => {
  return (
    <S.Wrapper
      className={className}
      leftSlot={
        <S.BackButton onClick={onBack} aria-label="뒤로 가기">
          ←
        </S.BackButton>
      }
      title={title}
    />
  );
};

export default OriginTitleBar;
