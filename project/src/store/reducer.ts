import {createReducer} from '@reduxjs/toolkit';
import {
  changeGenre,
  loadFilms,
  loadPromo,
  requireAuthorization,
  selectFilmsByGenre,
  setError,
  setDataLoadedStatus,
  loadFilm, loadSimilarFilms, loadFilmComments, loadFavorites,
} from './action';
import {TComment, TFilm} from '../types/types';
import {AuthorizationStatus} from '../consts';

type TState = {
  genre: string,
  allFilmsList: TFilm[],
  genredFilmsList: TFilm[],
  promoFilm: TFilm | null,
  authorizationStatus: AuthorizationStatus,
  error: string | null,
  isDataLoaded: boolean,
  selectedFilm: TFilm | null,
  similarFilms: TFilm[] | [],
  filmComments: TComment[] | [],
  favorites: TFilm[] | []
};

const initialState: TState = {
  allFilmsList: [],
  genre: 'All genres',
  genredFilmsList: [],
  promoFilm: null,
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
  isDataLoaded: false,
  selectedFilm: null,
  similarFilms: [],
  filmComments: [],
  favorites: []
};

function filterByGenre(filmsList: TFilm[], genre: string): TFilm[] {
  const resultFilms = filmsList.filter((film) => film.genre === genre);
  return resultFilms.length ? resultFilms : filmsList;
}

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadFilms, (state, action) => {
      state.allFilmsList = action.payload;
      state.genredFilmsList = filterByGenre(state.allFilmsList, state.genre);
    })
    .addCase(loadFilm, (state, action) => {
      state.selectedFilm = action.payload;
    })
    .addCase(loadSimilarFilms, (state, action) => {
      state.similarFilms = action.payload;
    })
    .addCase(loadFilmComments, (state, action) => {
      state.filmComments = action.payload;
    })
    .addCase(loadPromo, (state, action) => {
      state.promoFilm = action.payload;
    })
    .addCase(loadFavorites, (state, action) => {
      state.favorites = action.payload;
    })
    .addCase(changeGenre, (state, action) => {
      state.genre = action.payload;
      state.genredFilmsList = filterByGenre(state.allFilmsList, state.genre);
    })
    .addCase(selectFilmsByGenre, (state: TState) => {
      state.genredFilmsList = filterByGenre(state.allFilmsList, state.genre);
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action)=>{
      state.error = action.payload;
    })
    .addCase(setDataLoadedStatus, (state, action) => {
      state.isDataLoaded = action.payload;
    });
});

export {reducer};
