import {PayloadAction} from '@reduxjs/toolkit';
import browserHistory from '../../utils/browser-history.ts';
import {Middleware} from 'redux';
import {reducer} from '../reducer.ts';

type Reducer = ReturnType<typeof reducer>;

export const redirect: Middleware<unknown, Reducer> =
  () =>
    (next) =>
      (action: PayloadAction<string>) => {
        if (action.type === 'global/redirectToRoute') {
          browserHistory.push(action.payload);
        }

        return next(action);
      };
