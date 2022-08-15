import {createAction} from '@reduxjs/toolkit';
import {AppRoute, AuthorizationStatus} from '../consts';
import {TComment, TFilm} from '../types/types';

export const setDataLoadedStatus = createAction<boolean>('SET_DATA_LOADED_STATUS');
export const loadFilm = createAction('LOAD_FILM', (film: TFilm) => ({payload: film}));
export const loadSimilarFilms = createAction('LOAD_SIMILAR_FILMS', (films: TFilm[]) => ({payload: films}));
export const loadFilmComments = createAction('LOAD_FILM_COMMENTS', (comments: TComment[]) => ({payload: comments}));
export const sendFilmComment = createAction<{ comment: string, rating: number }>('SEND_FILM_COMMENT');
export const loadFilms = createAction('LOAD_FILMS', (films: TFilm[]) => ({payload: films}));
export const loadPromo = createAction('LOAD_PROMO', (film: TFilm) => ({payload: film}));
export const changeGenre = createAction('CHANGE_GENRE', (genre: string) => ({payload: genre}));
export const selectFilmsByGenre = createAction('SELECT_FILMS_BY_GENRE', (films: TFilm[]) => ({payload: films}));
export const requireAuthorization = createAction<AuthorizationStatus>('REQUIRE_AUTHORIZATION');
export const setError = createAction<string | null>('SET_ERROR');
export const redirectToRoute = createAction<AppRoute>('REDIRECT_TO_ROUTE');

