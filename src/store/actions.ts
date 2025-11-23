import { createAction } from '@reduxjs/toolkit';
import {Offer} from '../types/offer.ts';
import {City} from '../types/city.ts';
import {AppRoute, AuthorizationStatus, SortingOption} from '../const.ts';
import {UserData} from '../types/user-data.ts';
import {OfferWithInfo} from '../types/offer-with-info.ts';
import {Review} from '../types/review.ts';


export const changeCityAction = createAction('global/changeCity', (city: City) => ({
  payload: city,
}));
export const loadOffersAction = createAction('data/loadOffers', (places : Offer[]) => ({
  payload: places
}));
export const loadOffersNearbyAction = createAction('data/loadOffersNearby', (places : Offer[]) => ({
  payload: places
}));
export const changeSortingAction = createAction('data/changeSorting', (places : SortingOption) => ({
  payload: places
}));
export const requireAuthorizationAction = createAction('user/requireAuthorization', (status: AuthorizationStatus) => ({
  payload: status
}));
export const setOffersDataLoadingStatusAction = createAction('data/setOffersDataLoadingStatus', (status: boolean) => ({
  payload: status
}));
export const setOffersNearbyDataLoadingStatusAction = createAction('data/setOffersNearbyDataLoadingStatus', (status: boolean) => ({
  payload: status
}));
export const setOfferDataLoadingStatusAction = createAction('data/setOfferDataLoadingStatus', (status: boolean) => ({
  payload: status
}));
export const setReviewsDataLoadingStatusAction = createAction('data/setReviewsDataLoadingStatus', (status: boolean) => ({
  payload: status
}));
export const redirectToRoute = createAction('global/redirectToRoute', (route: AppRoute) => ({
  payload: route
}));
export const setUserAction = createAction('global/setUser', (user: UserData | null) => ({
  payload: user
}));
export const setCurrentOfferAction = createAction('global/setCurrentOffer', (offer: OfferWithInfo | null) => ({
  payload: offer
}));
export const setCurrentReviewsAction = createAction('global/setCurrentReviews', (reviews: Review[]) => ({
  payload: reviews
}));
