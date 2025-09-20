import type { ComponentType, ReactNode } from 'react';

import type { ButtonProps } from '@/components/button/button.tsx';
import type { ToggleButtonProps } from '@/components/button/toggleButton/toggleButton.tsx';

import * as S from './textButton.styled';

type BaseTextButtonProps<P extends ButtonProps | ToggleButtonProps> = Omit<
  P,
  'variant'
> & {
  children?: ReactNode;
};

const createTextButton = <P extends ButtonProps | ToggleButtonProps>(
  Component: ComponentType<P>,
) => {
  const TextButtonComponent = ({
    children,
    ...rest
  }: BaseTextButtonProps<P>) => {
    return (
      <Component
        variant="text"
        {...(rest as P)} /* eslint-disable-line react/jsx-props-no-spreading */
      >
        {children}
      </Component>
    );
  };

  return TextButtonComponent;
};

export const TextButton = createTextButton<ButtonProps>(S.StyledTextButton);
export const ToggleTextButton = createTextButton<ToggleButtonProps>(
  S.StyledToggleTextButton,
);

export type TextButtonProps = BaseTextButtonProps<ButtonProps>;
export type ToggleTextButtonProps = BaseTextButtonProps<ToggleButtonProps>;

export default TextButton;
