import {createReducer} from '@reduxjs/toolkit';
import {Offers} from '../mocks/offers.ts';
import {
  changeCityAction,
  changeSortingAction,
  loadPlacesAction,
  requireAuthorizationAction,
  setErrorAction, setOffersDataLoadingStatusAction
} from './actions.ts';
import {Offer} from '../types/offer.ts';
import {City} from '../types/city.ts';
import {AuthorizationStatus, SortingOption} from '../const.ts';

type stateCityProps = {
  city: City;
  places: Offer[];
  sorting: SortingOption;
  authorizationStatus: AuthorizationStatus;
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
  places: Offers.filter((offer: Offer) => offer.city.name === 'Paris'),
  sorting: SortingOption.Popular,
  authorizationStatus: AuthorizationStatus.Unknown,
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
    });
});
