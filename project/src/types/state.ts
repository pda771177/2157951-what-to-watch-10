import {store} from '../store';
import {AuthorizationStatus} from '../consts';
import {TComment, TFilm} from "./types";

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type TUserProcess = {
  authorizationStatus: AuthorizationStatus
}

export type TFilmProcess = {
  allFilmsList: TFilm[],
  promoFilm: TFilm | null,
  isDataLoaded: boolean,
  selectedFilm: TFilm | null,
  similarFilms: TFilm[] | [],
  filmComments: TComment[] | [],
  favorites: TFilm[] | []
}
