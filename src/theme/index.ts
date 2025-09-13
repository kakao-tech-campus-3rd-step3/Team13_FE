import { colors } from './color';
import type { Colors } from './color';
import { spacing } from './spacing';
import type { Spacing } from './spacing';
import { typography } from './typography';
import type { Typography } from './typography';

export interface Theme extends Colors, Typography, Spacing {}

export const theme: Theme = {
  ...colors,
  ...typography,
  ...spacing,
};

export type { Colors, Typography, Spacing };
