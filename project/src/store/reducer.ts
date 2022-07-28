import {createReducer} from '@reduxjs/toolkit';
import films from '../mocks/films';
import {changeGenre, loadFilms, loadPromo, selectFilmsByGenre} from './action';
import {TFilm} from '../types/types';
import promo from "../mocks/promo";

type TState = {
  genre: string,
  allFilmsList: TFilm[],
  genredFilmsList: TFilm[],
  promoFilm: TFilm
};

const initialState: TState = {
  allFilmsList: films,
  genre: 'All genres',
  genredFilmsList: films,
  promoFilm: promo
};

function filterByGenre(filmsList: TFilm[], genre: string): TFilm[] {
  const resultFilms = filmsList.filter((film) => film.genre === genre);
  return resultFilms.length ? resultFilms : filmsList;
}

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadFilms, (state, action) => {
      state.allFilmsList = action.payload;
    })
    .addCase(loadPromo, (state, action) => {
      state.promoFilm = action.payload
    })
    .addCase(changeGenre, (state, action) => {
      state.genre = action.payload;
      state.genredFilmsList = filterByGenre(state.allFilmsList, state.genre);
    })
    .addCase(selectFilmsByGenre, (state: TState) => {
      state.genredFilmsList = filterByGenre(state.allFilmsList, state.genre);
    });
});

export {reducer};
