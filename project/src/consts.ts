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
  Main = '/',
  Film = 'films/:id',
  SignIn = 'login',
  MyList = 'MyList',
  Player = 'player/:id',
  AddReview = 'films/:id/review'
}

export const TIMEOUT_SHOW_ERROR = 2000;
