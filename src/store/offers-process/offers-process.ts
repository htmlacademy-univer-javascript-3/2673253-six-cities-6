import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const.ts';
import {OffersProcess} from '../../types/state.ts';
import {
  addCommentAction,
  changeFavoritesStatusAction,
  fetchFavoritesAction,
  fetchOfferAction,
  fetchOffersAction,
  fetchOffersNearbyAction,
  fetchReviewsAction,
  logoutAction
} from '../api-actions.ts';

const initialState: OffersProcess = {
  offers: [],
  offersNearby: [],
  favoriteOffers: [],
  currentOffer: null,
  currentReviews: [],
  isOffersDataLoading: false,
  isOffersNearbyDataLoading: false,
  isOfferDataLoading: true,
  isReviewsDataLoading: false,
};

export const offersProcess = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersDataLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.isOffersDataLoading = false;
        state.offers = action.payload;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isOffersDataLoading = false;
        state.offers = [];
      })
      .addCase(fetchOffersNearbyAction.pending, (state) => {
        state.isOffersNearbyDataLoading = true;
      })
      .addCase(fetchOffersNearbyAction.fulfilled, (state, action) => {
        state.isOffersNearbyDataLoading = false;
        state.offersNearby = action.payload;
      })
      .addCase(fetchOffersNearbyAction.rejected, (state) => {
        state.isOffersNearbyDataLoading = false;
        state.offersNearby = [];
      })
      .addCase(fetchOfferAction.pending, (state) => {
        state.isOfferDataLoading = true;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.isOfferDataLoading = false;
        state.currentOffer = action.payload;
      })
      .addCase(fetchOfferAction.rejected, (state) => {
        state.isOfferDataLoading = false;
        state.currentOffer = null;
      })
      .addCase(fetchReviewsAction.pending, (state) => {
        state.isReviewsDataLoading = true;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.isReviewsDataLoading = false;
        state.currentReviews = action.payload;
      })
      .addCase(fetchReviewsAction.rejected, (state) => {
        state.isReviewsDataLoading = false;
        state.currentReviews = [];
      })
      .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
        state.favoriteOffers = action.payload;
      })
      .addCase(fetchFavoritesAction.rejected, (state) => {
        state.favoriteOffers = [];
      })
      .addCase(changeFavoritesStatusAction.fulfilled, (state, action) => {
        const updated = action.payload;
        const offersIndex = state.offers.findIndex((offer) => offer.id === updated.id);
        if (offersIndex !== -1) {
          state.offers[offersIndex] = updated;
        }

        const nearbyIndex = state.offersNearby.findIndex((offer) => offer.id === updated.id);
        if (nearbyIndex !== -1) {
          state.offersNearby[nearbyIndex] = updated;
        }

        if (state.currentOffer && state.currentOffer.id === updated.id) {
          state.currentOffer = {...state.currentOffer, isFavorite: updated.isFavorite};
        }

        const favoritesIndex = state.favoriteOffers.findIndex((offer) => offer.id === updated.id);

        if (updated.isFavorite) {
          if (favoritesIndex === -1) {
            state.favoriteOffers.push(updated);
          } else {
            state.favoriteOffers[favoritesIndex] = updated;
          }
        } else if (favoritesIndex !== -1) {
          state.favoriteOffers.splice(favoritesIndex, 1);
        }
      })
      .addCase(addCommentAction.fulfilled, (state, action) => {
        state.currentReviews.push(action.payload);
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.favoriteOffers = [];
        state.currentOffer = null;
        state.currentReviews = [];
        state.offersNearby = [];
      });
  },
});
