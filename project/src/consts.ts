export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export enum APIRoute {
  PromoFilm = '/promo',
  Films = '/films',
  Login = '/login',
  Logout = '/logout'
}

export enum AppRoute {
  Login = '/login',
  Root = '/'
}

export const TIMEOUT_SHOW_ERROR = 2000;
