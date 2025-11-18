import { createAction } from '@reduxjs/toolkit';
import {Offer} from '../types/offer.ts';
import {City} from '../types/city.ts';
import {SortingOption} from '../const.ts';


export const changeCityAction = createAction('changeCity', (city: City) => ({
  payload: city,
}));
export const fillPlacesAction = createAction('fillPlaces', (places : Offer[]) => ({
  payload: places
}));
export const changeSortingAction = createAction('changeSorting', (places : SortingOption) => ({
  payload: places
}));
