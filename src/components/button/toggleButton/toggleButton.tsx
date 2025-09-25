import { forwardRef } from 'react';
import type { ForwardedRef, MouseEventHandler } from 'react';

import Button from '@/components/button/button';
import type { ButtonProps } from '@/components/button/button';

export interface ToggleButtonProps extends ButtonProps {
  pressed: boolean;
  onPressedChange: (pressed: boolean) => void;
}

const ToggleButtonInner = (
  {
    pressed,
    onPressedChange,
    onClick,
    disabled = false,
    loading = false,
    ...rest
  }: ToggleButtonProps,
  ref: ForwardedRef<HTMLButtonElement>,
) => {
  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    onClick?.(event);
    const isDisabled = disabled || loading;
    if (event.defaultPrevented || isDisabled) {
      return;
    }
    onPressedChange(!pressed);
  };

  return (
    <Button
      {...rest}
      ref={ref}
      disabled={disabled || loading}
      loading={loading}
      aria-pressed={pressed}
      onClick={handleClick}
    />
  );
};

const ToggleButton = forwardRef<HTMLButtonElement, ToggleButtonProps>(
  ToggleButtonInner,
);

ToggleButton.displayName = 'ToggleButton';

export default ToggleButton;
