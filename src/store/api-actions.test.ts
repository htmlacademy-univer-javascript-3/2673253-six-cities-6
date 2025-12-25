import {Action} from '@reduxjs/toolkit';
import MockAdapter from 'axios-mock-adapter';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {beforeEach, describe, expect, it, vi} from 'vitest';
import {AxiosInstance} from 'axios';
import {APIRoute, AppRoute} from '../const.ts';
import {State} from '../types/state.ts';
import {createAPI} from '../services/api.ts';
import {
  addCommentAction,
  changeFavoritesStatusAction,
  checkAuthAction,
  fetchFavoritesAction,
  fetchOfferAction,
  fetchOffersAction,
  fetchOffersNearbyAction,
  fetchReviewsAction,
  loginAction,
  logoutAction
} from './api-actions.ts';
import {redirectToRoute} from './actions.ts';
import {dropToken} from '../services/token.ts';
import {makeFakeOffer, makeFakeOfferWithInfo, makeFakeReview, makeFakeUserData} from '../test-helpers/mock-data.ts';
import {makeFakeState} from '../test-helpers/mock-state.ts';

vi.mock('../services/token', () => ({
  saveToken: vi.fn(),
  dropToken: vi.fn(),
  getToken: vi.fn(),
}));

vi.mock('react-toastify', () => ({
  toast: {
    warn: vi.fn(),
  },
}));

type AppThunkDispatch = ThunkDispatch<State, AxiosInstance, Action>;

const api = createAPI();
const mockAxiosAdapter = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State, Action<string>, AppThunkDispatch>(middlewares);

const initialState = makeFakeState();

describe('Async operations', () => {
  beforeEach(() => {
    mockAxiosAdapter.reset();
  });

  it('fetchOffersAction should dispatch pending and fulfilled', async () => {
    const offers = [makeFakeOffer()];
    mockAxiosAdapter.onGet(APIRoute.Offers).reply(200, offers);
    const store = mockStore(initialState);

    await store.dispatch(fetchOffersAction());

    const actions = store.getActions();
    expect(actions.map(({type}) => type)).toEqual([
      fetchOffersAction.pending.type,
      fetchOffersAction.fulfilled.type,
    ]);
    expect(actions[1].payload).toEqual(offers);
  });

  it('fetchOffersNearbyAction should dispatch pending and fulfilled', async () => {
    const offers = [makeFakeOffer({id: 'nearby'})];
    mockAxiosAdapter.onGet(`${APIRoute.Offers}/1/nearby`).reply(200, offers);
    const store = mockStore(initialState);

    await store.dispatch(fetchOffersNearbyAction('1'));

    const actions = store.getActions();
    expect(actions.map(({type}) => type)).toEqual([
      fetchOffersNearbyAction.pending.type,
      fetchOffersNearbyAction.fulfilled.type,
    ]);
    expect(actions[1].payload).toEqual(offers);
  });

  it('fetchOfferAction should dispatch pending and fulfilled', async () => {
    const offer = makeFakeOfferWithInfo({id: 'offer-1'});
    mockAxiosAdapter.onGet(`${APIRoute.Offers}/${offer.id}`).reply(200, offer);
    const store = mockStore(initialState);

    await store.dispatch(fetchOfferAction(offer.id));

    const actions = store.getActions();
    expect(actions.map(({type}) => type)).toEqual([
      fetchOfferAction.pending.type,
      fetchOfferAction.fulfilled.type,
    ]);
    expect(actions[1].payload).toEqual(offer);
  });

  it('fetchReviewsAction should dispatch pending and fulfilled', async () => {
    const reviews = [makeFakeReview({id: 'review-1'})];
    mockAxiosAdapter.onGet(`${APIRoute.Comments}/1`).reply(200, reviews);
    const store = mockStore(initialState);

    await store.dispatch(fetchReviewsAction('1'));

    const actions = store.getActions();
    expect(actions.map(({type}) => type)).toEqual([
      fetchReviewsAction.pending.type,
      fetchReviewsAction.fulfilled.type,
    ]);
    expect(actions[1].payload).toEqual(reviews);
  });

  it('fetchFavoritesAction should dispatch pending and fulfilled', async () => {
    const favorites = [makeFakeOffer({id: 'fav'})];
    mockAxiosAdapter.onGet(APIRoute.Favorites).reply(200, favorites);
    const store = mockStore(initialState);

    await store.dispatch(fetchFavoritesAction());

    const actions = store.getActions();
    expect(actions.map(({type}) => type)).toEqual([
      fetchFavoritesAction.pending.type,
      fetchFavoritesAction.fulfilled.type,
    ]);
    expect(actions[1].payload).toEqual(favorites);
  });

  it('changeFavoritesStatusAction should dispatch redirect on 401', async () => {
    mockAxiosAdapter.onPost(`${APIRoute.Favorites}/1/1`).reply(401);
    const store = mockStore(initialState);

    await store.dispatch(changeFavoritesStatusAction({offerId: '1', status: 1}));

    const actions = store.getActions().map(({type}) => type);
    expect(actions).toEqual([
      changeFavoritesStatusAction.pending.type,
      changeFavoritesStatusAction.rejected.type,
    ]);
  });

  it('changeFavoritesStatusAction should dispatch fulfilled when request succeeds', async () => {
    const offer = makeFakeOffer({id: 'fav', isFavorite: true});
    mockAxiosAdapter.onPost(`${APIRoute.Favorites}/fav/1`).reply(200, offer);
    const store = mockStore(initialState);

    await store.dispatch(changeFavoritesStatusAction({offerId: 'fav', status: 1}));

    const actions = store.getActions();
    expect(actions.map(({type}) => type)).toEqual([
      changeFavoritesStatusAction.pending.type,
      changeFavoritesStatusAction.fulfilled.type,
    ]);
    expect(actions[1].payload).toEqual(offer);
  });

  it('checkAuthAction should dispatch favorites fetch before fulfilled', async () => {
    const user = makeFakeUserData();
    const favorites = [makeFakeOffer()];
    mockAxiosAdapter.onGet(APIRoute.Login).reply(200, user);
    mockAxiosAdapter.onGet(APIRoute.Favorites).reply(200, favorites);
    const store = mockStore(initialState);

    await store.dispatch(checkAuthAction());

    const actions = store.getActions().map(({type}) => type);
    expect(actions).toEqual([
      checkAuthAction.pending.type,
      fetchFavoritesAction.pending.type,
      fetchFavoritesAction.fulfilled.type,
      checkAuthAction.fulfilled.type,
    ]);
  });

  it('loginAction should dispatch favorites fetch and redirect', async () => {
    const user = makeFakeUserData();
    const favorites = [makeFakeOffer()];
    mockAxiosAdapter.onPost(APIRoute.Login).reply(200, user);
    mockAxiosAdapter.onGet(APIRoute.Favorites).reply(200, favorites);
    const store = mockStore(initialState);

    await store.dispatch(loginAction({login: user.email, password: '123456', redirectTo: AppRoute.Favorites}));

    const actions = store.getActions().map(({type}) => type);
    expect(actions).toEqual([
      loginAction.pending.type,
      fetchFavoritesAction.pending.type,
      fetchFavoritesAction.fulfilled.type,
      redirectToRoute.type,
      loginAction.fulfilled.type,
    ]);
  });

  it('logoutAction should dispatch pending and fulfilled', async () => {
    mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);
    const store = mockStore(initialState);

    await store.dispatch(logoutAction());

    const actions = store.getActions().map(({type}) => type);
    expect(actions).toEqual([
      logoutAction.pending.type,
      logoutAction.fulfilled.type,
    ]);
    expect(dropToken).toHaveBeenCalled();
  });

  it('addCommentAction should dispatch pending and fulfilled', async () => {
    const review = makeFakeReview({id: 'new-review'});
    mockAxiosAdapter.onPost(`${APIRoute.Comments}/1`).reply(200, review);
    const store = mockStore(initialState);

    await store.dispatch(addCommentAction({comment: review.comment, rating: review.rating, id: '1'}));

    const actions = store.getActions().map(({type}) => type);
    expect(actions).toEqual([
      addCommentAction.pending.type,
      addCommentAction.fulfilled.type,
    ]);
    expect(store.getActions()[1].payload).toEqual(review);
  });
});
