import { forwardRef } from 'react';
import type {
  ComponentPropsWithoutRef,
  MouseEventHandler,
  ReactNode,
} from 'react';

import * as S from './button.styled';

export interface ButtonOwnProps {
  variant?: S.ButtonVariant;
  size?: S.ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  ariaLabel?: string; // icon 변형이면 필수
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children?: ReactNode;
}

export type ButtonProps = ButtonOwnProps &
  Omit<ComponentPropsWithoutRef<'button'>, keyof ButtonOwnProps | 'type'>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      disabled = false,
      loading = false,
      ariaLabel,
      onClick,
      children,
      ...rest
    }: ButtonProps,
    ref,
  ) => {
    if (variant === 'icon' && !ariaLabel) {
      console.warn(
        '[Button] `icon` variant requires `ariaLabel` for accessibility.',
      );
    }

    const isDisabled = disabled || loading;

    return (
      <S.StyledButton
        ref={ref}
        type="button"
        variant={variant}
        size={size}
        disabled={isDisabled}
        aria-label={ariaLabel}
        aria-busy={loading || undefined}
        data-loading={loading ? 'true' : undefined}
        onClick={onClick}
        {...rest}
      >
        {loading ? (
          <S.Spinner role="status" aria-live="polite" aria-label="loading" />
        ) : (
          children
        )}
      </S.StyledButton>
    );
  },
);

Button.displayName = 'Button';

export default Button;
