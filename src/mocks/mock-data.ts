import {DEFAULT_CITY} from '../const.ts';
import {City} from '../types/city.ts';
import {Host} from '../types/host.ts';
import {Location} from '../types/location.ts';
import {Offer} from '../types/offer.ts';
import {OfferWithInfo} from '../types/offer-with-info.ts';
import {Review} from '../types/review.ts';
import {ReviewUser} from '../types/review-user.ts';
import {UserData} from '../types/user-data.ts';

const defaultLocation: Location = {
  latitude: 0,
  longitude: 0,
  zoom: 10,
};

export const makeFakeCity = (name = 'Test City'): City => ({
  name,
  location: {...defaultLocation},
});

export const makeFakeLocation = (overrides: Partial<Location> = {}): Location => ({
  ...defaultLocation,
  ...overrides,
});

export const makeFakeHost = (overrides: Partial<Host> = {}): Host => ({
  name: 'Host name',
  avatarUrl: 'https://test.host/avatar.jpg',
  isPro: false,
  ...overrides,
});

export const makeFakeOffer = (overrides: Partial<Offer> = {}): Offer => ({
  id: 'offer-id',
  title: 'Test offer',
  type: 'apartment',
  price: 100,
  city: DEFAULT_CITY,
  location: makeFakeLocation(),
  isFavorite: false,
  isPremium: false,
  rating: 4,
  previewImage: 'https://test.image/preview.jpg',
  ...overrides,
});

export const makeFakeOfferWithInfo = (overrides: Partial<OfferWithInfo> = {}): OfferWithInfo => ({
  id: 'offer-info-id',
  title: 'Test offer with info',
  type: 'apartment',
  price: 200,
  city: DEFAULT_CITY,
  location: makeFakeLocation(),
  isFavorite: false,
  isPremium: true,
  rating: 5,
  description: 'Test description',
  bedrooms: 2,
  goods: ['Wi-Fi', 'Heating'],
  host: makeFakeHost(),
  images: ['https://test.image/1.jpg', 'https://test.image/2.jpg'],
  maxAdults: 3,
  ...overrides,
});

export const makeFakeReviewUser = (overrides: Partial<ReviewUser> = {}): ReviewUser => ({
  name: 'Reviewer',
  avatarUrl: 'https://test.avatar/reviewer.jpg',
  isPro: true,
  ...overrides,
});

export const makeFakeReview = (overrides: Partial<Review> = {}): Review => ({
  id: 'review-id',
  date: new Date().toISOString(),
  user: makeFakeReviewUser(),
  comment: 'Test comment',
  rating: 4,
  ...overrides,
});

export const makeFakeUserData = (overrides: Partial<UserData> = {}): UserData => ({
  email: 'test@test.ru',
  name: 'Test User',
  token: 'token',
  ...overrides,
});
