import { authHandlers } from './auth';
import { certificationHandlers } from './certification';
import { commonHandlers } from './common';
import { gamesHandlers } from './games';
import { profileHandlers } from './profile';
import { reportsHandlers } from './reports';
import { schoolsHandlers } from './schools';
import { sportsHandlers } from './sports';
import { uploadHandlers } from './upload';

export const handlers = [
  ...commonHandlers,
  ...authHandlers,
  ...certificationHandlers,
  ...profileHandlers,
  ...uploadHandlers,
  ...sportsHandlers,
  ...gamesHandlers,
  ...schoolsHandlers,
  ...reportsHandlers,
];
