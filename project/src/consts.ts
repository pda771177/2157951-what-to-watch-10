export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export const MINIMAL_PASSWORD_LENGTH = 1;

export enum APIRoute {
  PromoFilm = '/promo',
  Films = '/films',
  Film = '/films/:id',
  SimilarFilms = '/films/:id/similar',
  FilmComments = '/comments/:id',
  SendComment = '/comments/:id',
  Favorites = '/favorite',
  ChangeFavorite = '/favorite/:id/:status',
  Login = '/login',
  Logout = '/logout'
}

export enum AppRoute {
  Main = '/',
  Film = '/films/:id',
  SignIn = '/login',
  MyList = '/MyList',
  Player = '/player/:id',
  AddReview = '/films/:id/review',
  Unknown = '/404'
}

export enum NameSpace {
  Films = 'FILMS',
  User = 'USER'
}

export const TIMEOUT_SHOW_ERROR = 2000;
