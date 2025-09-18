import type { ReactNode } from 'react';

import type { ButtonProps } from '@/components/button';

import * as S from './roundButton.styled';

export interface RoundButtonProps
  extends Omit<ButtonProps, 'variant' | 'size'> {
  size?: 'md' | 'lg';
  children?: ReactNode;
}

const RoundButton = ({ size = 'md', children, ...rest }: RoundButtonProps) => {
  return (
    <S.StyledRoundButton variant="round" size={size} {...rest}>
      {children}
    </S.StyledRoundButton>
  );
};

export default RoundButton;
