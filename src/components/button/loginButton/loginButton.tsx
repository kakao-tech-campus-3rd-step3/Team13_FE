import type { ComponentType, ReactNode } from 'react';

import type { ButtonProps } from '@/components/button/button.tsx';
import type { ToggleButtonProps } from '@/components/button/toggleButton/toggleButton.tsx';

import * as S from './loginButton.styled';

type BaseLoginButtonProps<P extends ButtonProps | ToggleButtonProps> = Omit<
  P,
  'variant' | 'children'
> & {
  children?: ReactNode;
};

const DEFAULT_LABEL = '카카오로 시작하기';

const createLoginButton = <P extends ButtonProps | ToggleButtonProps>(
  Component: ComponentType<P>,
) => {
  const LoginButtonComponent = ({
    children = DEFAULT_LABEL,
    ...rest
  }: BaseLoginButtonProps<P>) => {
    return (
      <Component
        variant="login"
        {...(rest as P)} /* eslint-disable-line react/jsx-props-no-spreading */
      >
        {children}
      </Component>
    );
  };

  return LoginButtonComponent;
};

export const LoginButton = createLoginButton<ButtonProps>(S.StyledLoginButton);
export const ToggleLoginButton = createLoginButton<ToggleButtonProps>(
  S.StyledToggleLoginButton,
);

export type LoginButtonProps = BaseLoginButtonProps<ButtonProps>;
export type ToggleLoginButtonProps = BaseLoginButtonProps<ToggleButtonProps>;

export default LoginButton;
