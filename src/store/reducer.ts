import {createReducer} from '@reduxjs/toolkit';
import {
  changeCityAction,
  changeSortingAction,
  loadOffersAction,
  loadOffersNearbyAction,
  requireAuthorizationAction,
  setCurrentOfferAction, setCurrentReviewsAction,
  setOfferDataLoadingStatusAction,
  setOffersDataLoadingStatusAction,
  setOffersNearbyDataLoadingStatusAction, setReviewsDataLoadingStatusAction,
  setUserAction
} from './actions.ts';
import {Offer} from '../types/offer.ts';
import {City} from '../types/city.ts';
import {AuthorizationStatus, SortingOption} from '../const.ts';
import {UserData} from '../types/user-data.ts';
import {OfferWithInfo} from '../types/offer-with-info.ts';
import {Review} from '../types/review.ts';

type stateCityProps = {
  city: City;
  offers: Offer[];
  offersNearby: Offer[];
  sorting: SortingOption;
  authorizationStatus: AuthorizationStatus;
  user: UserData | null;
  currentOffer: OfferWithInfo | null;
  currentReviews: Review[];
  isOffersDataLoading: boolean;
  isOffersNearbyDataLoading: boolean;
  isOfferDataLoading: boolean;
  isReviewsDataLoading: boolean;
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
  offers: [],
  offersNearby: [],
  sorting: SortingOption.Popular,
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
  currentOffer: null,
  currentReviews: [],
  isOffersDataLoading: false,
  isOffersNearbyDataLoading: false,
  isOfferDataLoading: false,
  isReviewsDataLoading: false,
};

export const reducer = createReducer(stateCity, (builder) => {
  builder
    .addCase(changeCityAction, (state, action) => {
      state.city = action.payload;
    })
    .addCase(loadOffersAction, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(loadOffersNearbyAction, (state, action) => {
      state.offersNearby = action.payload;
    })
    .addCase(changeSortingAction, (state, action) => {
      state.sorting = action.payload;
    })
    .addCase(requireAuthorizationAction, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setOffersDataLoadingStatusAction, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(setOffersNearbyDataLoadingStatusAction, (state, action) => {
      state.isOffersNearbyDataLoading = action.payload;
    })
    .addCase(setOfferDataLoadingStatusAction, (state, action) => {
      state.isOfferDataLoading = action.payload;
    })
    .addCase(setReviewsDataLoadingStatusAction, (state, action) => {
      state.isReviewsDataLoading = action.payload;
    })
    .addCase(setUserAction, (state, action) => {
      state.user = action.payload;
    })
    .addCase(setCurrentOfferAction, (state, action) => {
      state.currentOffer = action.payload;
    })
    .addCase(setCurrentReviewsAction, (state, action) => {
      state.currentReviews = action.payload;
    });
});
