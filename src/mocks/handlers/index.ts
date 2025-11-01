import { authHandlers } from './auth';
import { certificationHandlers } from './certification';
import { commonHandlers } from './common';
import { gamesHandlers } from './games';
import { profileHandlers } from './profile';
import { reportsHandlers } from './reports';
import { schoolsHandlers } from './schools';
import { sportsHandlers } from './sports';

export const handlers = [
  ...commonHandlers,
  ...authHandlers,
  ...certificationHandlers,
  ...profileHandlers,
  ...sportsHandlers,
  ...gamesHandlers,
  ...schoolsHandlers,
  ...reportsHandlers,
];
