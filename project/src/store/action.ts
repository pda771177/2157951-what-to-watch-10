import {createAction} from '@reduxjs/toolkit';
import {AuthorizationStatus} from '../consts';
import {TFilm} from '../types/types';

export const setDataLoadedStatus = createAction<boolean>('SET_DATA_LOADED_STATUS');
export const loadFilms = createAction('LOAD_FILMS', (films: TFilm[]) => ({payload: films}));
export const loadPromo = createAction('LOAD_PROMO', (film: TFilm) => ({payload: film}));
export const changeGenre = createAction('CHANGE_GENRE', (genre: string) => ({payload: genre}));
export const selectFilmsByGenre = createAction('SELECT_FILMS_BY_GENRE', (films: TFilm[]) => ({payload: films}));
export const requireAuthorization = createAction<AuthorizationStatus>('REQUIRE_AUTHORIZATION');
export const setError = createAction<string | null>('SET_ERROR');
