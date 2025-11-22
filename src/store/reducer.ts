import {createReducer} from '@reduxjs/toolkit';
import {
  changeCityAction,
  changeSortingAction,
  loadPlacesAction,
  requireAuthorizationAction,
  setErrorAction, setOffersDataLoadingStatusAction, setUserAction
} from './actions.ts';
import {Offer} from '../types/offer.ts';
import {City} from '../types/city.ts';
import {AuthorizationStatus, SortingOption} from '../const.ts';
import {UserData} from '../types/user-data.ts';

type stateCityProps = {
  city: City;
  places: Offer[];
  sorting: SortingOption;
  authorizationStatus: AuthorizationStatus;
  user: UserData | null;
  error: string | null;
  isOffersDataLoading: boolean;
}

const stateCity: stateCityProps = {
  city: {
    name: 'Paris',
    location: {
      latitude: 48.864716,
      longitude: 2.349014,
      zoom: 12
    }
  },
  places: [],
  sorting: SortingOption.Popular,
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
  error: null,
  isOffersDataLoading: false
};

export const reducer = createReducer(stateCity, (builder) => {
  builder
    .addCase(changeCityAction, (state, action) => {
      state.city = action.payload;
    })
    .addCase(loadPlacesAction, (state, action) => {
      state.places = action.payload;
    })
    .addCase(changeSortingAction, (state, action) => {
      state.sorting = action.payload;
    })
    .addCase(requireAuthorizationAction, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setErrorAction, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setOffersDataLoadingStatusAction, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(setUserAction, (state, action) => {
      state.user = action.payload;
    });
});
