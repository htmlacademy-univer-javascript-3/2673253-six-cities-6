import { configureStore } from '@reduxjs/toolkit';
import {reducer} from './reducer.ts';

import {createAPI} from '../services/api';
import {redirect} from './middlewares/redirect.ts';

export const api = createAPI();

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});
