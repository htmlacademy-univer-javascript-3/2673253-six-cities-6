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

export const URL_MARKER_DEFAULT = 'markup/img/pin.svg';
export const URL_MARKER_CURRENT = 'markup/img/pin-active.svg';
