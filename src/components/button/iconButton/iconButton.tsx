import type { ReactNode } from 'react';

import type { ButtonProps } from '@/components/button';

import * as S from './iconButton.styled';

export interface IconButtonProps
  extends Omit<ButtonProps, 'variant' | 'ariaLabel'> {
  ariaLabel: string;
  children?: ReactNode;
}

const IconButton = ({ ariaLabel, children, ...rest }: IconButtonProps) => {
  return (
    <S.StyledIconButton variant="icon" ariaLabel={ariaLabel} {...rest}>
      {children}
    </S.StyledIconButton>
  );
};

export default IconButton;
