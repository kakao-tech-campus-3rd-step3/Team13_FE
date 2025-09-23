// IconButton.tsx
import { forwardRef } from 'react';
import type { ReactNode, CSSProperties } from 'react';

import Button, { type ButtonProps } from '@/components/button/button';
import ToggleButton, {
  type ToggleButtonProps,
} from '@/components/button/toggleButton';
import { spacing } from '@/theme/spacing';

type BaseIconButtonProps<P extends ButtonProps | ToggleButtonProps> = Omit<
  P,
  'variant' | 'ariaLabel'
> & {
  ariaLabel: string;
  children?: ReactNode;
};

export type IconButtonProps = BaseIconButtonProps<ButtonProps>;
export type ToggleIconButtonProps = BaseIconButtonProps<ToggleButtonProps>;

type BtnSize = NonNullable<ButtonProps['size']>;
const ICON_SIDE = {
  sm: spacing.spacing8,
  md: spacing.spacing10,
  lg: spacing.spacing12,
} as const satisfies Record<BtnSize, string>;

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ ariaLabel, children, size = 'md', style, ...rest }, ref) => {
    const side = ICON_SIDE[size];
    const merged: CSSProperties = {
      width: side,
      height: side,
      minWidth: side,
      minHeight: side,
      ...style,
    };
    return (
      <Button
        {...rest}
        ref={ref}
        variant="icon"
        size={size}
        ariaLabel={ariaLabel}
        style={merged}
      >
        {children}
      </Button>
    );
  },
);
IconButton.displayName = 'IconButton';

export const ToggleIconButton = forwardRef<
  HTMLButtonElement,
  ToggleIconButtonProps
>(({ ariaLabel, children, size = 'md', style, ...rest }, ref) => {
  const side = ICON_SIDE[size];
  const merged: CSSProperties = {
    width: side,
    height: side,
    minWidth: side,
    minHeight: side,
    ...style,
  };
  return (
    <ToggleButton
      {...rest}
      ref={ref}
      variant="icon"
      size={size}
      ariaLabel={ariaLabel}
      style={merged}
    >
      {children}
    </ToggleButton>
  );
});
ToggleIconButton.displayName = 'ToggleIconButton';

export default IconButton;
