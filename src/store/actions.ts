import { createAction } from '@reduxjs/toolkit';
import {Offer} from '../types/offer.ts';
import {City} from '../types/city.ts';
import {AuthorizationStatus, SortingOption} from '../const.ts';


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
export const setErrorAction = createAction<string | null>('global/setError');
