import type { ComponentType, ReactNode } from 'react';

import type { ButtonProps } from '@/components/button/button.tsx';
import type { ToggleButtonProps } from '@/components/button/toggleButton/toggleButton.tsx';

import * as S from './roundButton.styled';

type BaseRoundButtonProps<P extends ButtonProps | ToggleButtonProps> = Omit<
  P,
  'variant' | 'size'
> & {
  size?: 'md' | 'lg';
  children?: ReactNode;
};

const createRoundButton = <P extends ButtonProps | ToggleButtonProps>(
  Component: ComponentType<P>,
) => {
  const RoundButtonComponent = ({
    size = 'md',
    children,
    ...rest
  }: BaseRoundButtonProps<P>) => {
    return (
      <Component
        variant="round"
        size={size}
        {...(rest as P)} /* eslint-disable-line react/jsx-props-no-spreading */
      >
        {children}
      </Component>
    );
  };

  return RoundButtonComponent;
};

export const RoundButton = createRoundButton<ButtonProps>(S.StyledRoundButton);
export const ToggleRoundButton = createRoundButton<ToggleButtonProps>(
  S.StyledToggleRoundButton,
);

export type RoundButtonProps = BaseRoundButtonProps<ButtonProps>;
export type ToggleRoundButtonProps = BaseRoundButtonProps<ToggleButtonProps>;

export default RoundButton;
