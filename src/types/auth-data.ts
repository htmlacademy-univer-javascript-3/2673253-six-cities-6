import {AppRoute} from '../const.ts';

export type AuthData = {
  login: string;
  password: string;
  redirectTo?: AppRoute;
};
