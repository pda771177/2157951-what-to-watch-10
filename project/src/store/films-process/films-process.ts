import {createSlice} from '@reduxjs/toolkit';

import {
  changeFavoriteAction,
  loadFavoritesAction,
  loadFilmAction,
  loadFilmCommentsAction,
  loadFilmsAction,
  loadPromoFilmAction,
  loadSimilarFilmsAction,
  sendFilmCommentAction
} from '../api-actions';
import {NameSpace, UNKNOWN_FILM} from '../../consts';
import {TFilmProcess} from '../../types/state';

const initialState: TFilmProcess = {
  allFilmsList: [],
  promoFilm: null,
  isDataLoaded: false,
  selectedFilm: null,
  similarFilms: [],
  filmComments: [],
  favorites: []
};

export const filmsProcess = createSlice({
  name: NameSpace.Films,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loadFilmsAction.pending, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(loadFilmsAction.fulfilled, (state, {payload}) => {
        state.allFilmsList = payload;
        state.isDataLoaded = false;
      })
      .addCase(loadFilmsAction.rejected, (state) => {
        state.allFilmsList = [];
        state.isDataLoaded = false;
      })
      .addCase(loadPromoFilmAction.pending, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(loadPromoFilmAction.fulfilled, (state, {payload}) => {
        state.promoFilm = payload;
        state.isDataLoaded = false;
      })
      .addCase(loadPromoFilmAction.rejected, (state) => {
        state.promoFilm = null;
        state.isDataLoaded = false;
      })
      .addCase(loadFilmAction.pending, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(loadFilmAction.fulfilled, (state, {payload}) => {
        state.selectedFilm = payload;
        state.isDataLoaded = false;
      })
      .addCase(loadFilmAction.rejected, (state) => {
        state.selectedFilm = UNKNOWN_FILM;
        state.isDataLoaded = false;
      })
      .addCase(loadFavoritesAction.pending, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(loadFavoritesAction.fulfilled, (state, {payload}) => {
        state.favorites = payload;
        state.isDataLoaded = false;
      })
      .addCase(loadFavoritesAction.rejected, (state, {payload}) => {
        state.favorites = [];
        state.isDataLoaded = false;
      })
      .addCase(loadSimilarFilmsAction.pending, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(loadSimilarFilmsAction.fulfilled, (state, {payload}) => {
        state.similarFilms = payload;
        state.isDataLoaded = false;
      })
      .addCase(loadSimilarFilmsAction.rejected, (state, {payload}) => {
        state.similarFilms = [];
        state.isDataLoaded = false;
      })
      .addCase(changeFavoriteAction.pending, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(changeFavoriteAction.fulfilled, (state, {payload}) => {
        state.favorites = payload;
        state.isDataLoaded = false;
      })
      .addCase(changeFavoriteAction.rejected, (state) => {
        state.isDataLoaded = false;
      })
      .addCase(loadFilmCommentsAction.pending, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(loadFilmCommentsAction.fulfilled, (state, {payload}) => {
        state.filmComments = payload;
        state.isDataLoaded = false;
      })
      .addCase(loadFilmCommentsAction.rejected, (state) => {
        state.filmComments = [];
        state.isDataLoaded = false;
      })
      .addCase(sendFilmCommentAction.pending, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(sendFilmCommentAction.fulfilled, (state, {payload}) => {
        state.filmComments = payload;
        state.isDataLoaded = false;
      })
      .addCase(sendFilmCommentAction.rejected, (state) => {
        state.isDataLoaded = false;
      });
  }
});
