import {AxiosError, AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../../types/state.ts';
import {saveToken, dropToken} from '../../services/token.ts';
import {AuthData} from '../../types/auth-data.ts';
import {UserData} from '../../types/user-data.ts';
import {Offer} from '../../types/offer.ts';
import {APIRoute, AppRoute} from '../../const.ts';
import {redirectToRoute} from '../actions.ts';
import {OfferWithInfo} from '../../types/offer-with-info.ts';
import {Review} from '../../types/review.ts';
import {ReviewData} from '../../types/review-data.ts';
import {FavoriteData} from '../../types/favorite-data.ts';
import {StatusCodes} from 'http-status-codes';


export const fetchOffersAction = createAsyncThunk<Offer[], void, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Offer[]>(APIRoute.Offers);
    return data;
  },
);

export const fetchOffersNearbyAction = createAsyncThunk<Offer[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffersNearby',
  async (id, {extra: api}) => {
    const {data} = await api.get<Offer[]>(`${APIRoute.Offers}/${id}/nearby`);
    return data;
  },
);
export const fetchOfferAction = createAsyncThunk<OfferWithInfo, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffer',
  async (id, {extra: api}) => {
    const {data} = await api.get<OfferWithInfo>(`${APIRoute.Offers}/${id}`);
    return data;
  },
);

export const fetchReviewsAction = createAsyncThunk<Review[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchReviews',
  async (id, {extra: api}) => {
    const {data} = await api.get<Review[]>(`${APIRoute.Comments}/${id}`);
    return data;
  },
);

export const fetchFavoritesAction = createAsyncThunk<Offer[], void, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/getFavorites',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Offer[]>(APIRoute.Favorites);
    return data;
  },
);

export const changeFavoritesStatusAction = createAsyncThunk<Offer, FavoriteData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offer/changeFavoritesStatus',
  async ({offerId, status}, {dispatch, extra: api}) => {
    try {
      const {data} = await api.post<Offer>(`${APIRoute.Favorites}/${offerId}/${status}`);
      return data;
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === StatusCodes.UNAUTHORIZED) {
        dispatch(redirectToRoute(AppRoute.Login));
      }

      throw error;
    }
  },
);

export const checkAuthAction = createAsyncThunk<UserData, void, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<UserData>(APIRoute.Login);
    await dispatch(fetchFavoritesAction());
    return data;
  },
);

export const loginAction = createAsyncThunk<UserData, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password, redirectTo}, {dispatch, extra: api}) => {
    const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(data.token);
    await dispatch(fetchFavoritesAction());
    dispatch(redirectToRoute(redirectTo ?? AppRoute.Main));
    return data;
  },
);

export const logoutAction = createAsyncThunk<void, void, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  },
);

export const addCommentAction = createAsyncThunk<Review, ReviewData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offer/addComment',
  async ({comment, rating, id}, {extra: api}) => {
    const {data} = await api.post<Review>(`${APIRoute.Comments}/${id}`, {comment, rating});
    return data;
  },
);
