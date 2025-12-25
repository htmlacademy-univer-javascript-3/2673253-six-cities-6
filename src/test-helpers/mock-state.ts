import {AuthorizationStatus, DEFAULT_CITY, DEFAULT_SORTING, NameSpace} from '../const.ts';
import {OffersProcess, SettingsProcess, State, UserProcess} from '../types/state.ts';

export const makeFakeUserProcessState = (overrides: Partial<UserProcess> = {}): UserProcess => ({
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
  userFavoritesCount: null,
  ...overrides,
});

export const makeFakeOffersProcessState = (overrides: Partial<OffersProcess> = {}): OffersProcess => ({
  offers: [],
  offersNearby: [],
  favoriteOffers: [],
  currentOffer: null,
  currentReviews: [],
  isOffersDataLoading: false,
  isOffersNearbyDataLoading: false,
  isOfferDataLoading: true,
  isReviewsDataLoading: false,
  ...overrides,
});

export const makeFakeSettingsProcessState = (overrides: Partial<SettingsProcess> = {}): SettingsProcess => ({
  city: DEFAULT_CITY,
  sorting: DEFAULT_SORTING,
  ...overrides,
});

export const makeFakeState = (overrides: Partial<State> = {}): State => ({
  [NameSpace.User]: {
    ...makeFakeUserProcessState(),
    ...(overrides[NameSpace.User] ?? {}),
  },
  [NameSpace.Offers]: {
    ...makeFakeOffersProcessState(),
    ...(overrides[NameSpace.Offers] ?? {}),
  },
  [NameSpace.Settings]: {
    ...makeFakeSettingsProcessState(),
    ...(overrides[NameSpace.Settings] ?? {}),
  },
});
