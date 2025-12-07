import { createAction } from '@reduxjs/toolkit';
import {AppRoute} from '../const.ts';

export const redirectToRoute = createAction('global/redirectToRoute', (route: AppRoute) => ({
  payload: route,
}));
