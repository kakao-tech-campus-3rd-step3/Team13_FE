import { forwardRef } from 'react';
import type { CSSProperties, ForwardedRef } from 'react';

import Button from '@/components/button/button';
import type { ButtonProps } from '@/components/button/button';
import ToggleButton from '@/components/button/toggleButton';
import type { ToggleButtonProps } from '@/components/button/toggleButton';
import { colors } from '@/theme/color';
import { spacing } from '@/theme/spacing';

type ButtonStyleVariables = CSSProperties &
  Record<`--${string}`, string | undefined>;

export type RoundButtonSize = Extract<ButtonProps['size'], 'md' | 'lg'>;

export interface RoundButtonProps
  extends Omit<ButtonProps, 'variant' | 'size'> {
  size?: RoundButtonSize;
}

const RoundButtonInner = (
  { size = 'md', ...rest }: RoundButtonProps,
  ref: ForwardedRef<HTMLButtonElement>,
) => <Button {...rest} ref={ref} variant="round" size={size} />;

export const RoundButton = forwardRef<HTMLButtonElement, RoundButtonProps>(
  RoundButtonInner,
);
RoundButton.displayName = 'RoundButton';

export interface ToggleRoundButtonProps
  extends Omit<ToggleButtonProps, 'variant' | 'size'> {
  size?: RoundButtonSize;
}

const ToggleRoundButtonInner = (
  { size = 'md', ...rest }: ToggleRoundButtonProps,
  ref: ForwardedRef<HTMLButtonElement>,
) => <ToggleButton {...rest} ref={ref} variant="round" size={size} />;

export const ToggleRoundButton = forwardRef<
  HTMLButtonElement,
  ToggleRoundButtonProps
>(ToggleRoundButtonInner);
ToggleRoundButton.displayName = 'ToggleRoundButton';

export interface RoundedRectangleColors {
  background?: string;
  color?: string;
  hover?: string;
  active?: string;
}

export interface RoundedRectangleButtonProps
  extends Omit<ButtonProps, 'variant'> {
  colorSet?: RoundedRectangleColors;
}

const defaultRoundedRectangleColors = {
  background: colors.blue[700],
  color: colors.gray[0],
  hover: colors.blue[800],
  active: colors.blue[900],
};

const createRoundedRectangleVariables = (
  colorSet?: RoundedRectangleColors,
): CSSProperties => {
  const palette = { ...defaultRoundedRectangleColors, ...colorSet };
  const variables: ButtonStyleVariables = {
    background: palette.background,
    color: palette.color,
    border: `1px solid ${palette.background}`,
    borderRadius: spacing.spacing2,
    '--btn-hover-background': palette.hover,
    '--btn-active-background': palette.active,
  };

  return Object.fromEntries(
    Object.entries(variables).filter(([, value]) => value !== undefined),
  ) as CSSProperties;
};

const mergeStyle = (
  style: CSSProperties | undefined,
  variables: CSSProperties,
): CSSProperties | undefined => {
  if (!style) {
    return Object.keys(variables).length ? variables : undefined;
  }

  return Object.keys(variables).length ? { ...style, ...variables } : style;
};

const RoundedRectangleButtonInner = (
  { colorSet, style, ...rest }: RoundedRectangleButtonProps,
  ref: ForwardedRef<HTMLButtonElement>,
) => (
  <Button
    {...rest}
    ref={ref}
    variant="secondary"
    style={mergeStyle(style, createRoundedRectangleVariables(colorSet))}
  />
);

export const RoundedRectangleButton = forwardRef<
  HTMLButtonElement,
  RoundedRectangleButtonProps
>(RoundedRectangleButtonInner);
RoundedRectangleButton.displayName = 'RoundedRectangleButton';

export interface ToggleRoundedRectangleButtonProps
  extends Omit<ToggleButtonProps, 'variant'> {
  colorSet?: RoundedRectangleColors;
}

const ToggleRoundedRectangleButtonInner = (
  { colorSet, style, ...rest }: ToggleRoundedRectangleButtonProps,
  ref: ForwardedRef<HTMLButtonElement>,
) => (
  <ToggleButton
    {...rest}
    ref={ref}
    variant="secondary"
    style={mergeStyle(style, createRoundedRectangleVariables(colorSet))}
  />
);

export const ToggleRoundedRectangleButton = forwardRef<
  HTMLButtonElement,
  ToggleRoundedRectangleButtonProps
>(ToggleRoundedRectangleButtonInner);
ToggleRoundedRectangleButton.displayName = 'ToggleRoundedRectangleButton';

export type TextButtonProps = Omit<ButtonProps, 'variant'>;

const TextButtonInner = (
  props: TextButtonProps,
  ref: ForwardedRef<HTMLButtonElement>,
) => <Button {...props} ref={ref} variant="text" />;

export const TextButton = forwardRef<HTMLButtonElement, TextButtonProps>(
  TextButtonInner,
);
TextButton.displayName = 'TextButton';

export type ToggleTextButtonProps = Omit<ToggleButtonProps, 'variant'>;

const ToggleTextButtonInner = (
  props: ToggleTextButtonProps,
  ref: ForwardedRef<HTMLButtonElement>,
) => <ToggleButton {...props} ref={ref} variant="text" />;

export const ToggleTextButton = forwardRef<
  HTMLButtonElement,
  ToggleTextButtonProps
>(ToggleTextButtonInner);
ToggleTextButton.displayName = 'ToggleTextButton';
