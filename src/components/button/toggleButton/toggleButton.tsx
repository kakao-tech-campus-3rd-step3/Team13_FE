import type { MouseEventHandler } from 'react';

import Button from '@/components/button/button';
import type { ButtonProps } from '@/components/button/button';

export interface ToggleButtonProps extends ButtonProps {
  pressed: boolean;
  onPressedChange: (pressed: boolean) => void;
}

const ToggleButton = ({
  pressed,
  onPressedChange,
  onClick,
  disabled = false,
  loading = false,
  ...rest
}: ToggleButtonProps) => {
  const isDisabled = disabled || loading;

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    onClick?.(event);
    if (!isDisabled) {
      onPressedChange(!pressed);
    }
  };

  return (
    <Button
      {...rest} /* eslint-disable-line react/jsx-props-no-spreading */
      disabled={disabled}
      loading={loading}
      aria-pressed={pressed}
      onClick={handleClick}
    />
  );
};

export default ToggleButton;
