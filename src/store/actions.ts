import { createAction } from '@reduxjs/toolkit';
import {Offer} from '../types/offer.ts';
import {City} from '../types/city.ts';
import {AppRoute, AuthorizationStatus, SortingOption} from '../const.ts';
import {UserData} from '../types/user-data.ts';


export const changeCityAction = createAction('global/changeCity', (city: City) => ({
  payload: city,
}));
export const loadPlacesAction = createAction('data/loadPlaces', (places : Offer[]) => ({
  payload: places
}));
export const changeSortingAction = createAction('data/changeSorting', (places : SortingOption) => ({
  payload: places
}));
export const requireAuthorizationAction = createAction('user/requireAuthorization', (status: AuthorizationStatus) => ({
  payload: status
}));
export const setErrorAction = createAction('global/setError', (error: string | null) => ({
  payload: error
}));
export const setOffersDataLoadingStatusAction = createAction('data/setOffersDataLoadingStatus', (status: boolean) => ({
  payload: status
}));
export const redirectToRoute = createAction('global/redirectToRoute', (route: AppRoute) => ({
  payload: route
}));
export const setUserAction = createAction('global/setUser', (user: UserData | null) => ({
  payload: user
}));
