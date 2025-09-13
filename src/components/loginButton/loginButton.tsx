import type { ReactNode } from 'react';

import type { ButtonProps } from '@/components/button/button';

import * as S from './loginButton.styled';

export interface LoginButtonProps
  extends Omit<ButtonProps, 'variant' | 'children'> {
  children?: ReactNode;
}

const LoginButton = ({
  children = '카카오로 시작하기',
  ...rest
}: LoginButtonProps) => {
  return (
    <S.StyledLoginButton variant="login" {...rest}>
      {children}
    </S.StyledLoginButton>
  );
};

export default LoginButton;
