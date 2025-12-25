import {AuthorizationStatus} from '../../const.ts';
import {makeFakeUserData, makeFakeOffer} from '../../test-helpers/mock-data.ts';
import {
  changeFavoritesStatusAction,
  checkAuthAction,
  fetchFavoritesAction,
  loginAction,
  logoutAction
} from '../api-actions.ts';
import {userProcess} from './user-process.ts';
import {makeFakeUserProcessState} from '../../test-helpers/mock-state.ts';

describe('userProcess reducer', () => {
  const initialState = makeFakeUserProcessState();

  it('should return initial state with unknown action', () => {
    const result = userProcess.reducer(undefined, {type: 'unknown'});

    expect(result).toEqual(initialState);
  });

  it('should set auth data when checkAuth fulfilled', () => {
    const user = makeFakeUserData();
    const result = userProcess.reducer(initialState, {type: checkAuthAction.fulfilled.type, payload: user});

    expect(result.authorizationStatus).toBe(AuthorizationStatus.Auth);
    expect(result.user).toEqual(user);
  });

  it('should set NoAuth when checkAuth rejected', () => {
    const result = userProcess.reducer(initialState, {type: checkAuthAction.rejected.type});

    expect(result.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
    expect(result.user).toBeNull();
  });

  it('should set auth data when login fulfilled', () => {
    const user = makeFakeUserData();
    const result = userProcess.reducer(initialState, {type: loginAction.fulfilled.type, payload: user});

    expect(result.authorizationStatus).toBe(AuthorizationStatus.Auth);
    expect(result.user).toEqual(user);
  });

  it('should reset auth data when login rejected', () => {
    const result = userProcess.reducer(initialState, {type: loginAction.rejected.type});

    expect(result.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
    expect(result.user).toBeNull();
  });

  it('should reset auth data when logout fulfilled', () => {
    const populatedState = {
      authorizationStatus: AuthorizationStatus.Auth,
      user: makeFakeUserData(),
      userFavoritesCount: 1,
    };
    const result = userProcess.reducer(populatedState, {type: logoutAction.fulfilled.type});

    expect(result.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
    expect(result.user).toBeNull();
    expect(result.userFavoritesCount).toBeNull();
  });

  it('should set favorites count when fetchFavorites fulfilled', () => {
    const favorites = [makeFakeOffer({id: '1'}), makeFakeOffer({id: '2'})];
    const result = userProcess.reducer(initialState, {type: fetchFavoritesAction.fulfilled.type, payload: favorites});

    expect(result.userFavoritesCount).toBe(favorites.length);
  });

  it('should reset favorites count when fetchFavorites rejected', () => {
    const result = userProcess.reducer({authorizationStatus: AuthorizationStatus.Auth, user: makeFakeUserData(), userFavoritesCount: 5}, {type: fetchFavoritesAction.rejected.type});

    expect(result.userFavoritesCount).toBeNull();
  });

  it('should increase favorites count when offer becomes favorite', () => {
    const result = userProcess.reducer(
      {...initialState, userFavoritesCount: 1},
      {type: changeFavoritesStatusAction.fulfilled.type, payload: makeFakeOffer({isFavorite: true})}
    );

    expect(result.userFavoritesCount).toBe(2);
  });

  it('should decrease favorites count when offer removed from favorites', () => {
    const result = userProcess.reducer(
      {...initialState, userFavoritesCount: 1},
      {type: changeFavoritesStatusAction.fulfilled.type, payload: makeFakeOffer({isFavorite: false})}
    );

    expect(result.userFavoritesCount).toBe(0);
  });
});
