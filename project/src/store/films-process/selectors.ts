
import {State} from '../../types/state';
import {TComment, TFilm} from '../../types/types';
import {NameSpace} from '../../consts';

export const getAllFilms = (state: State): TFilm[] => state[NameSpace.Films].allFilmsList;
export const getPromoFilm = (state: State): TFilm | null => state[NameSpace.Films].promoFilm;
export const getFilmComments = (state: State): TComment[] => state[NameSpace.Films].filmComments;
export const getSimilarFilms = (state: State): TFilm[] => state[NameSpace.Films].similarFilms;
export const getSelectedFilm = (state: State): TFilm | null => state[NameSpace.Films].selectedFilm;
export const getLoadingStatus = (state: State): boolean => state[NameSpace.Films].isDataLoaded;
export const getFavorites = (state: State): TFilm[] => state[NameSpace.Films].favorites;
