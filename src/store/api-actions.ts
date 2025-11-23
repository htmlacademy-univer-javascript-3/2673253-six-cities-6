import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state.js';
import {saveToken, dropToken} from '../services/token';
import {AuthData} from '../types/auth-data';
import {UserData} from '../types/user-data';
import {Offer} from '../types/offer.ts';
import {APIRoute, AppRoute, AuthorizationStatus} from '../const.ts';
import {
  loadFavoriteOffersAction,
  loadOffersAction,
  loadOffersNearbyAction,
  redirectToRoute,
  requireAuthorizationAction,
  setCurrentOfferAction,
  setCurrentReviewsAction, setFavoritesCountAction,
  setOfferDataLoadingStatusAction,
  setOffersDataLoadingStatusAction,
  setOffersNearbyDataLoadingStatusAction,
  setReviewsDataLoadingStatusAction,
  setUserAction
} from './actions.ts';
import {OfferWithInfo} from '../types/offer-with-info.ts';
import {Review} from '../types/review.ts';
import {ReviewData} from '../types/review-data.ts';
import {FavoriteData} from '../types/favorite-data.ts';


export const fetchOffersAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (cityName, {dispatch, extra: api}) => {
    dispatch(setOffersDataLoadingStatusAction(true));
    const {data} = await api.get<Offer[]>(APIRoute.Offers);
    const offers = data.filter((offer) => offer.city.name === cityName);
    dispatch(loadOffersAction(offers));
    dispatch(setOffersDataLoadingStatusAction(false));
  },
);

export const fetchOffersNearbyAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffersNearby',
  async (id, {dispatch, extra: api}) => {
    dispatch(setOffersNearbyDataLoadingStatusAction(true));
    const {data} = await api.get<Offer[]>(`${APIRoute.Offers}/${id}/nearby`);
    dispatch(loadOffersNearbyAction(data));
    dispatch(setOffersNearbyDataLoadingStatusAction(false));
  },
);
export const fetchOfferAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffer',
  async (id, {dispatch, extra: api}) => {
    dispatch(setOfferDataLoadingStatusAction(true));
    const {data} = await api.get<OfferWithInfo>(`${APIRoute.Offers}/${id}`);
    dispatch(setCurrentOfferAction(data));
    dispatch(setOfferDataLoadingStatusAction(false));
  },
);

export const fetchReviewsAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchReviews',
  async (id, {dispatch, extra: api}) => {
    dispatch(setReviewsDataLoadingStatusAction(true));
    const {data} = await api.get<Review[]>(`${APIRoute.Comments}/${id}`);
    dispatch(setCurrentReviewsAction(data));
    dispatch(setReviewsDataLoadingStatusAction(false));
  },
);

export const fetchFavoritesAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/getFavorites',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Offer[]>(APIRoute.Favorites);
    dispatch(loadFavoriteOffersAction(data));
    dispatch(setFavoritesCountAction(data.length));
  },
);

export const changeFavoritesStatusAction = createAsyncThunk<Offer, FavoriteData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offer/changeFavoritesStatus',
  async ({offerId, status}, {extra: api}) => {
    const {data} = await api.post<Offer>(`${APIRoute.Favorites}/${offerId}/${status}`);
    return data;
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<UserData>(APIRoute.Login);
      dispatch(requireAuthorizationAction(AuthorizationStatus.Auth));
      dispatch(setUserAction(data));
      await dispatch(fetchFavoritesAction());
    } catch {
      dispatch(requireAuthorizationAction(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password, redirectTo}, {dispatch, extra: api}) => {
    const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(data.token);
    dispatch(requireAuthorizationAction(AuthorizationStatus.Auth));
    dispatch(setUserAction(data));
    dispatch(redirectToRoute(redirectTo ?? AppRoute.Main));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorizationAction(AuthorizationStatus.NoAuth));
    dispatch(setUserAction(null));
  },
);

export const addCommentAction = createAsyncThunk<void, ReviewData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offer/addComment',
  async ({comment, rating, id}, {dispatch, extra: api}) => {
    await api.post<Review>(`${APIRoute.Comments}/${id}`, {comment, rating});
    await dispatch(fetchReviewsAction(id));
  },
);


