import { authHandlers } from './auth';
import { certificationHandlers } from './certification';
import { commonHandlers } from './common';
import { profileHandlers } from './profile';

export const handlers = [
  ...commonHandlers,
  ...authHandlers,
  ...certificationHandlers,
  ...profileHandlers,
];
