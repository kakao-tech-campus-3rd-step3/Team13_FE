import type { ComponentType, ReactNode } from 'react';

import type { ButtonProps } from '@/components/button/button.tsx';
import type { ToggleButtonProps } from '@/components/button/toggleButton/toggleButton.tsx';

import * as S from './iconButton.styled';

type BaseIconButtonProps<P extends ButtonProps | ToggleButtonProps> = Omit<
  P,
  'variant' | 'ariaLabel'
> & {
  ariaLabel: string;
  children?: ReactNode;
};

const createIconButton = <P extends ButtonProps | ToggleButtonProps>(
  Component: ComponentType<P>,
) => {
  const IconButtonComponent = ({
    ariaLabel,
    children,
    ...rest
  }: BaseIconButtonProps<P>) => {
    return (
      <Component
        variant="icon"
        ariaLabel={ariaLabel}
        {...(rest as P)} /* eslint-disable-line react/jsx-props-no-spreading */
      >
        {children}
      </Component>
    );
  };

  return IconButtonComponent;
};

export const IconButton = createIconButton<ButtonProps>(S.StyledIconButton);
export const ToggleIconButton = createIconButton<ToggleButtonProps>(
  S.StyledToggleIconButton,
);

export type IconButtonProps = BaseIconButtonProps<ButtonProps>;
export type ToggleIconButtonProps = BaseIconButtonProps<ToggleButtonProps>;

export default IconButton;
