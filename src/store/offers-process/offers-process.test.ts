import {describe, expect, it} from 'vitest';
import {changeFavoritesStatusAction, fetchFavoritesAction, fetchOfferAction, fetchOffersAction, fetchOffersNearbyAction, fetchReviewsAction} from '../api-actions.ts';
import {offersProcess} from './offers-process.ts';
import {makeFakeOffer, makeFakeOfferWithInfo, makeFakeReview} from '../../test-helpers/mock-data.ts';
import {makeFakeOffersProcessState} from '../../test-helpers/mock-state.ts';

describe('offersProcess reducer', () => {
  const initialState = makeFakeOffersProcessState();

  it('should return initial state with unknown action', () => {
    const result = offersProcess.reducer(undefined, {type: 'unknown'});

    expect(result).toEqual(initialState);
  });

  it('should set loading true on fetchOffers pending', () => {
    const result = offersProcess.reducer(initialState, {type: fetchOffersAction.pending.type});

    expect(result.isOffersDataLoading).toBe(true);
  });

  it('should set offers data on fetchOffers fulfilled', () => {
    const offers = [makeFakeOffer({id: '1'}), makeFakeOffer({id: '2'})];
    const result = offersProcess.reducer(initialState, {type: fetchOffersAction.fulfilled.type, payload: offers});

    expect(result.offers).toEqual(offers);
    expect(result.isOffersDataLoading).toBe(false);
  });

  it('should reset offers on fetchOffers rejected', () => {
    const result = offersProcess.reducer({...initialState, offers: [makeFakeOffer()]}, {type: fetchOffersAction.rejected.type});

    expect(result.offers).toEqual([]);
    expect(result.isOffersDataLoading).toBe(false);
  });

  it('should handle nearby offers loading', () => {
    const fulfilledState = offersProcess.reducer(
      {...initialState, isOffersNearbyDataLoading: true},
      {type: fetchOffersNearbyAction.fulfilled.type, payload: [makeFakeOffer({id: '3'})]}
    );

    expect(fulfilledState.isOffersNearbyDataLoading).toBe(false);
    expect(fulfilledState.offersNearby).toHaveLength(1);

    const rejectedState = offersProcess.reducer(
      {...initialState, offersNearby: [makeFakeOffer({id: '4'})]},
      {type: fetchOffersNearbyAction.rejected.type}
    );

    expect(rejectedState.offersNearby).toEqual([]);
    expect(rejectedState.isOffersNearbyDataLoading).toBe(false);
  });

  it('should handle current offer loading', () => {
    const pendingState = offersProcess.reducer(initialState, {type: fetchOfferAction.pending.type});
    expect(pendingState.isOfferDataLoading).toBe(true);

    const offerInfo = makeFakeOfferWithInfo();
    const fulfilledState = offersProcess.reducer(initialState, {type: fetchOfferAction.fulfilled.type, payload: offerInfo});
    expect(fulfilledState.isOfferDataLoading).toBe(false);
    expect(fulfilledState.currentOffer).toEqual(offerInfo);

    const rejectedState = offersProcess.reducer({...initialState, currentOffer: offerInfo}, {type: fetchOfferAction.rejected.type});
    expect(rejectedState.isOfferDataLoading).toBe(false);
    expect(rejectedState.currentOffer).toBeNull();
  });

  it('should handle reviews loading', () => {
    const fulfilledState = offersProcess.reducer(
      {...initialState, isReviewsDataLoading: true},
      {type: fetchReviewsAction.fulfilled.type, payload: [makeFakeReview()]}
    );
    expect(fulfilledState.isReviewsDataLoading).toBe(false);
    expect(fulfilledState.currentReviews).toHaveLength(1);

    const rejectedState = offersProcess.reducer(
      {...initialState, currentReviews: [makeFakeReview()]},
      {type: fetchReviewsAction.rejected.type}
    );
    expect(rejectedState.currentReviews).toEqual([]);
  });

  it('should set favorite offers on fetchFavorites fulfilled', () => {
    const favorites = [makeFakeOffer({id: 'fav'})];
    const result = offersProcess.reducer(initialState, {type: fetchFavoritesAction.fulfilled.type, payload: favorites});

    expect(result.favoriteOffers).toEqual(favorites);
  });

  it('should update offers collections on changeFavoritesStatus fulfilled', () => {
    const updatedOffer = makeFakeOffer({id: '1', isFavorite: true});
    const startState = {
      ...initialState,
      offers: [makeFakeOffer({id: '1', isFavorite: false})],
      offersNearby: [makeFakeOffer({id: '2'})],
      favoriteOffers: [],
      currentOffer: makeFakeOfferWithInfo({id: '1', isFavorite: false}),
    };

    const result = offersProcess.reducer(startState, {type: changeFavoritesStatusAction.fulfilled.type, payload: updatedOffer});

    expect(result.offers[0]).toEqual(updatedOffer);
    expect(result.favoriteOffers[0]).toEqual(updatedOffer);
    expect(result.currentOffer?.isFavorite).toBe(true);
  });

  it('should remove offer from favorites when it is no longer favorite', () => {
    const updatedOffer = makeFakeOffer({id: 'fav', isFavorite: false});
    const startState = {
      ...initialState,
      favoriteOffers: [makeFakeOffer({id: 'fav', isFavorite: true})],
    };

    const result = offersProcess.reducer(startState, {type: changeFavoritesStatusAction.fulfilled.type, payload: updatedOffer});

    expect(result.favoriteOffers).toHaveLength(0);
  });
});
