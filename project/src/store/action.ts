import {createAction} from '@reduxjs/toolkit';

export const loadFilms = createAction('LOAD_FILMS', (films) => ({payload: films}));
export const loadPromo = createAction('LOAD_PROMO', (film) => ({payload: film}));
export const changeGenre = createAction('CHANGE_GENRE', (genre) => ({payload: genre}));
export const selectFilmsByGenre = createAction('SELECT_FILMS_BY_GENRE', (films) => ({payload: films}));
