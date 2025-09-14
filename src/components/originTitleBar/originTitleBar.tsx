import React from 'react';

import IconButton from '@/components/iconButton';

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
        <IconButton ariaLabel="뒤로 가기" onClick={onBack}>
          <S.BackIcon aria-hidden />
        </IconButton>
      }
      title={title}
    />
  );
};

export default OriginTitleBar;
