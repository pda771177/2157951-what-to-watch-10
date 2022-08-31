import {TFilm} from './types/types';

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

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

export const RegExps = {
  login: /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/,
  password: /^.*(?=.{2,})(?=.*\d)((?=.*[a-z])|(?=.*[A-Z])).*$/i
};

export const HTTP_POSITIVE_RESPONSE_CODE = 200;

export const UNKNOWN_FILM = {
  id: -1
} as TFilm;

export const MAX_GENRES_LENGTH = 9;
