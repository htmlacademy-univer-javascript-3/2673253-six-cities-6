import {store} from '../store';
import {AuthorizationStatus, SortingOption} from '../const.ts';
import {UserData} from './user-data.ts';
import {City} from './city.ts';
import {Offer} from './offer.ts';
import {OfferWithInfo} from './offer-with-info.ts';
import {Review} from './review.ts';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  user: UserData | null;
  userFavoritesCount: number | null;
};

export type SettingsProcess = {
  city: City;
  sorting: SortingOption;
};

export type OffersProcess = {
  offers: Offer[];
  offersNearby: Offer[];
  favoriteOffers: Offer[];
  currentOffer: OfferWithInfo | null;
  currentReviews: Review[];
  isOffersDataLoading: boolean;
  isOffersNearbyDataLoading: boolean;
  isOfferDataLoading: boolean;
  isReviewsDataLoading: boolean;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
