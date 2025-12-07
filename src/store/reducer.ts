import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../const.ts';
import {userProcess} from './user-process/user-process.ts';
import {offersProcess} from './offers-process/offers-process.ts';
import {settingsProcess} from './settings-process/settings-process.ts';

export const reducer = combineReducers({
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.Offers]: offersProcess.reducer,
  [NameSpace.Settings]: settingsProcess.reducer,
});
