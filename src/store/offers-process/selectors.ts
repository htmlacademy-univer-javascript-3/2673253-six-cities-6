import {createSelector} from '@reduxjs/toolkit';
import {State} from '../../types/state.ts';
import {NameSpace} from '../../const.ts';
import sortOffers from '../../utils/get-sorted-offers.ts';
import {getCurrentCity, getSorting} from '../settings-process/selectors.ts';
import {Offer} from '../../types/offer.ts';

export const getOffers = (state: State) => state[NameSpace.Offers].offers;
export const getOffersNearby = (state: State) => state[NameSpace.Offers].offersNearby;
export const getFavoriteOffers = (state: State) => state[NameSpace.Offers].favoriteOffers;
export const getCurrentOffer = (state: State) => state[NameSpace.Offers].currentOffer;
export const getCurrentReviews = (state: State) => state[NameSpace.Offers].currentReviews;
export const getIsOffersDataLoading = (state: State) => state[NameSpace.Offers].isOffersDataLoading;
export const getIsOffersNearbyDataLoading = (state: State) => state[NameSpace.Offers].isOffersNearbyDataLoading;
export const getIsOfferDataLoading = (state: State) => state[NameSpace.Offers].isOfferDataLoading;
export const getIsReviewsDataLoading = (state: State) => state[NameSpace.Offers].isReviewsDataLoading;

export const getOffersByCity = createSelector(
  [getOffers, getCurrentCity],
  (offers, city) => offers.filter((offer) => offer.city.name === city.name),
);

export const getSortedOffers = createSelector(
  [getOffersByCity, getSorting],
  (offers, sorting) => sortOffers(offers, sorting),
);

export const getFavoritesByCity = createSelector(
  [getFavoriteOffers],
  (favorites) => favorites.reduce<Record<string, Offer[]>>((acc, offer) => {
    const city = offer.city.name;
    if (!acc[city]) {
      acc[city] = [];
    }
    acc[city].push(offer);
    return acc;
  }, {}),
);
