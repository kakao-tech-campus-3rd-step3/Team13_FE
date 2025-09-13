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
  pressed?: boolean; // 토글 상태
  onPressedChange?: (v: boolean) => void; // 토글 핸들러(선택)
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children?: ReactNode;
}

export type ButtonProps = ButtonOwnProps &
  Omit<ComponentPropsWithoutRef<'button'>, keyof ButtonOwnProps | 'type'>;

const Button = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  ariaLabel,
  pressed,
  onPressedChange,
  onClick,
  children,
  ...rest
}: ButtonProps) => {
  if (variant === 'icon' && !ariaLabel) {
    console.warn(
      '[Button] `icon` variant requires `ariaLabel` for accessibility.',
    );
  }

  const isDisabled = disabled || loading;

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    onClick?.(e);
    if (!isDisabled && typeof pressed === 'boolean' && onPressedChange) {
      onPressedChange(!pressed);
    }
  };

  return (
    <S.StyledButton
      type="button"
      variant={variant}
      size={size}
      disabled={isDisabled}
      aria-label={ariaLabel}
      aria-busy={loading || undefined}
      aria-pressed={typeof pressed === 'boolean' ? pressed : undefined}
      data-loading={loading ? 'true' : undefined}
      onClick={handleClick}
      {...rest}
    >
      {loading ? (
        <S.Spinner role="status" aria-live="polite" aria-label="loading" />
      ) : (
        children
      )}
    </S.StyledButton>
  );
};

export default Button;
