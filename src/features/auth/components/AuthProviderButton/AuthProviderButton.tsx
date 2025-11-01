/* eslint-disable react/jsx-props-no-spreading */
import { forwardRef, type ButtonHTMLAttributes } from 'react';

import * as S from './AuthProviderButton.styled';

type Provider = 'google' | 'kakao';

type AuthProviderButtonProps = {
  provider: Provider;
  fullWidth?: boolean;
  loading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const LABELS: Record<Provider, string> = {
  google: 'Google로 계속하기',
  kakao: '카카오로 계속하기',
};

export const AuthProviderButton = forwardRef<
  HTMLButtonElement,
  AuthProviderButtonProps
>(
  (
    {
      provider,
      fullWidth = true,
      loading = false,
      disabled,
      children,
      ...rest
    },
    ref,
  ) => {
    const ButtonComponent =
      provider === 'google' ? S.GoogleButton : S.KakaoButton;

    return (
      <ButtonComponent
        ref={ref}
        type="button"
        aria-label={LABELS[provider]}
        $fullWidth={fullWidth}
        $loading={loading}
        disabled={disabled || loading}
        aria-busy={loading}
        {...rest}
      >
        <S.Icon aria-hidden="true">
          {provider === 'google' ? <GoogleIcon /> : <KakaoIcon />}
        </S.Icon>
        <S.Label>
          {loading ? '연결 중…' : (children ?? LABELS[provider])}
        </S.Label>
      </ButtonComponent>
    );
  },
);

/* eslint-enable react/jsx-props-no-spreading */

AuthProviderButton.displayName = 'AuthProviderButton';

function GoogleIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 48 48"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="#EA4335"
        d="M24 9.5c3.9 0 7.4 1.4 10.1 3.9l6.8-6.8C36.8 2.3 30.8 0 24 0 14.6 0 6.6 5.4 2.6 13.2l7.9 6.1C12.5 13.6 17.8 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.5 24c0-1.6-.2-3.2-.6-4.7H24v9h12.6c-.6 3-2.4 5.6-5 7.3l7.7 6c4.5-4.1 7.2-10.1 7.2-17.6z"
      />
      <path
        fill="#FBBC05"
        d="M10.5 28.3c-.5-1.4-.8-2.9-.8-4.3s.3-2.9.8-4.3l-7.9-6.1C.9 16.5 0 20.1 0 24s.9 7.5 2.6 10.4l7.9-6.1z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.5 0 12-2.1 16-5.6l-7.7-6c-2.1 1.4-4.8 2.2-8.3 2.2-6.3 0-11.6-4.2-13.5-10l-7.9 6.1C6.6 42.6 14.6 48 24 48z"
      />
    </svg>
  );
}

function KakaoIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 48 48"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="#181600"
        d="M24 8C13.5 8 5 14.1 5 21.8c0 4.8 3.3 9 8.4 11.3l-2 7.5c-.2.7.6 1.2 1.2.8l8-5c1.1.1 2.2.2 3.4.2 10.5 0 19-6.1 19-13.8S34.5 8 24 8z"
      />
    </svg>
  );
}
