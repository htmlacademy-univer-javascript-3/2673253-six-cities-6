import {createReducer} from '@reduxjs/toolkit';
import {
  changeCityAction,
  changeSortingAction, loadFavoriteOffersAction,
  loadOffersAction,
  loadOffersNearbyAction,
  requireAuthorizationAction,
  setCurrentOfferAction, setCurrentReviewsAction, setFavoritesCountAction,
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
import {addCommentAction, changeFavoritesStatusAction} from './api-actions.ts';

type stateCityProps = {
  city: City;
  offers: Offer[];
  offersNearby: Offer[];
  favoriteOffers: Offer[];
  sorting: SortingOption;
  authorizationStatus: AuthorizationStatus;
  user: UserData | null;
  userFavoritesCount: number | null;
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
  favoriteOffers: [],
  sorting: SortingOption.Popular,
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
  userFavoritesCount: null,
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
    .addCase(loadFavoriteOffersAction, (state, action) => {
      state.favoriteOffers = action.payload;
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
    .addCase(setFavoritesCountAction, (state, action) => {
      state.userFavoritesCount = action.payload;
    })
    .addCase(setCurrentOfferAction, (state, action) => {
      state.currentOffer = action.payload;
    })
    .addCase(setCurrentReviewsAction, (state, action) => {
      state.currentReviews = action.payload;
    })
    .addCase(changeFavoritesStatusAction.fulfilled, (state, action) => {
      const updated = action.payload;

      if (state.userFavoritesCount) {
        if (updated.isFavorite) {
          state.userFavoritesCount = state.userFavoritesCount + 1;
        } else {
          state.userFavoritesCount = state.userFavoritesCount - 1;
        }
      }

      const offersIndex = state.offers.findIndex((o) => o.id === updated.id);
      if (offersIndex !== -1) {
        state.offers[offersIndex] = updated;
      }

      const nearbyIndex = state.offersNearby.findIndex((o) => o.id === updated.id);
      if (nearbyIndex !== -1) {
        state.offersNearby[nearbyIndex] = updated;
      }

      if (state.currentOffer && state.currentOffer.id === updated.id) {
        state.currentOffer.isFavorite = updated.isFavorite;
      }

      const favoritesIndex = state.favoriteOffers.findIndex((o) => o.id === updated.id);

      if (updated.isFavorite) {
        if (favoritesIndex === -1) {
          state.favoriteOffers.push(updated);
        } else {
          state.favoriteOffers[favoritesIndex] = updated;
        }
      } else {
        if (favoritesIndex !== -1) {
          state.favoriteOffers.splice(favoritesIndex, 1);
        }
      }
    })
    .addCase(addCommentAction.fulfilled, (state, action) => {
      const updated1 = action.payload;
      state.currentReviews.push(updated1);
    });
});
