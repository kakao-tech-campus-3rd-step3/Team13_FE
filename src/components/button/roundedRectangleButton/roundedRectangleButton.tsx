import type { ReactNode } from 'react';

import type { ButtonProps } from '@/components/button';

import * as S from './roundedRectangleButton.styled';

export interface RoundedRectangleButtonProps
  extends Omit<ButtonProps, 'variant'> {
  colorSet?: S.RoundedRectangleColors;
  children?: ReactNode;
}

const RoundedRectangleButton = ({
  colorSet,
  children,
  ...rest
}: RoundedRectangleButtonProps) => {
  return (
    <S.StyledRoundedRectangleButton
      variant="secondary"
      colorSet={colorSet}
      {...rest}
    >
      {children}
    </S.StyledRoundedRectangleButton>
  );
};

export default RoundedRectangleButton;
