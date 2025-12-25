export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offers = '/offer/:id',
  NotFound = '*',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum SortingOption {
  Popular = 'Popular',
  PriceLowToHigh = 'Price: low to high',
  PriceHighToLow = 'Price: high to low',
  TopRatedFirst = 'Top rated first',
}

export enum APIRoute {
  Offers = '/offers',
  Favorites = '/favorite',
  Comments = '/comments',
  Login = '/login',
  Logout = '/logout',
}

export enum FavoriteStatus {
  In = 1,
  Out = 0,
}

export enum NameSpace {
  Loading = 'Loading',
  User = 'USER',
  Offers = 'OFFERS',
  Settings = 'SETTINGS',
}

export const DEFAULT_SORTING = SortingOption.Popular;
export const DEFAULT_CITY: City = {
  name: 'Paris',
  location: {
    latitude: 48.864716,
    longitude: 2.349014,
    zoom: 12,
  },
};

export const BACKEND_URL = 'https://14.design.htmlacademy.pro/six-cities';
export const REQUEST_TIMEOUT = 5000;

export const MAP_TILE_LAYER_URL = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
export const MAP_TILE_LAYER_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';
export const MAP_ICON_SIZE: [number, number] = [40, 40];
export const MAP_ICON_ANCHOR: [number, number] = [20, 40];
export const URL_MARKER_DEFAULT = 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';
export const URL_MARKER_CURRENT = 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';

export const MAX_RATING = 5;
export const RATING_STARS: readonly number[] = [5, 4, 3, 2, 1];
export const RATING_TITLES: Record<number, string> = {
  5: 'perfect',
  4: 'good',
  3: 'not bad',
  2: 'badly',
  1: 'terribly',
};
export const MIN_REVIEW_LENGTH = 50;
export const MAX_REVIEW_LENGTH = 300;
export const MAX_REVIEWS_PER_PAGE = 10;
import {City} from './types/city.ts';
