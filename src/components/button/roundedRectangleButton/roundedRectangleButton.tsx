import type { ComponentType, ReactNode } from 'react';

import type { ButtonProps } from '@/components/button/button.tsx';
import type { ToggleButtonProps } from '@/components/button/toggleButton/toggleButton.tsx';

import * as S from './roundedRectangleButton.styled';

type BaseRoundedRectangleButtonProps<
  P extends ButtonProps | ToggleButtonProps,
> = Omit<P, 'variant'> & {
  colorSet?: S.RoundedRectangleColors;
  children?: ReactNode;
};

const createRoundedRectangleButton = <
  P extends ButtonProps | ToggleButtonProps,
>(
  Component: ComponentType<P>,
) => {
  const RoundedRectangleButtonComponent = ({
    colorSet,
    children,
    ...rest
  }: BaseRoundedRectangleButtonProps<P>) => {
    return (
      <Component
        variant="secondary"
        colorSet={colorSet}
        {...(rest as P)} /* eslint-disable-line react/jsx-props-no-spreading */
      >
        {children}
      </Component>
    );
  };

  return RoundedRectangleButtonComponent;
};

export const RoundedRectangleButton = createRoundedRectangleButton<ButtonProps>(
  S.StyledRoundedRectangleButton,
);
export const ToggleRoundedRectangleButton =
  createRoundedRectangleButton<ToggleButtonProps>(
    S.StyledToggleRoundedRectangleButton,
  );

export type RoundedRectangleButtonProps =
  BaseRoundedRectangleButtonProps<ButtonProps>;
export type ToggleRoundedRectangleButtonProps =
  BaseRoundedRectangleButtonProps<ToggleButtonProps>;

export default RoundedRectangleButton;
