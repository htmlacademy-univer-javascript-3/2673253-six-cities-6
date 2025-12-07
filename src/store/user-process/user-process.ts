import {AuthorizationStatus, NameSpace} from '../../const.ts';
import {createSlice} from '@reduxjs/toolkit';
import {
  changeFavoritesStatusAction,
  checkAuthAction,
  fetchFavoritesAction,
  loginAction,
  logoutAction
} from '../api-actions.ts';
import {UserProcess} from '../../types/state.ts';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
  userFavoritesCount: null,
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.user = action.payload;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.user = null;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.user = action.payload;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.user = null;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.user = null;
        state.userFavoritesCount = null;
      })
      .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
        state.userFavoritesCount = action.payload.length;
      })
      .addCase(fetchFavoritesAction.rejected, (state) => {
        state.userFavoritesCount = null;
      })
      .addCase(changeFavoritesStatusAction.fulfilled, (state, action) => {
        const currentCount = state.userFavoritesCount ?? 0;
        const delta = action.payload.isFavorite ? 1 : -1;
        state.userFavoritesCount = Math.max(0, currentCount + delta);
      });
  }
});
