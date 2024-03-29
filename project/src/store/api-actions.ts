import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state';
import {AxiosInstance} from 'axios';
import {APIRoute, AppRoute, HTTP_POSITIVE_RESPONSE_CODE} from '../consts';
import {TAuthData} from '../types/auth-data';
import {TUserData} from '../types/user-data';
import {dropUser, saveUser} from '../services/localStorageUser';
import {TComment, TFilm} from '../types/types';
import {redirectToRoute} from './action';


export const loadFilmsAction = createAsyncThunk<TFilm[], undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'LOAD_FILMS',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<TFilm[]>(APIRoute.Films);
    return data;
  }
);

export const loadFavoritesAction = createAsyncThunk<TFilm[], undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'LOAD_FAVORITES',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<TFilm[]>(APIRoute.Favorites);
    return data;
  }
);

export const changeFavoriteAction = createAsyncThunk<TFilm[], { filmId: number, favorite: boolean }, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'CHANGE_FAVORITE',
  async ({filmId, favorite}, {dispatch, extra: api}) => {
    await api.post(APIRoute.ChangeFavorite.replace(':id', filmId.toString()).replace(':status', String(favorite ? 1 : 0)));
    const {data} = await api.get<TFilm[]>(APIRoute.Favorites);
    return data;
  }
);

export const loadFilmAction = createAsyncThunk<TFilm, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'LOAD_FILM',
  async (filmId, {dispatch, extra: api}) => {
    const {status, data} = await api.get<TFilm>(APIRoute.Film.replace(':id', filmId));
    if (status === HTTP_POSITIVE_RESPONSE_CODE){
      dispatch(loadFilmCommentsAction(filmId));
      dispatch(loadSimilarFilmsAction(filmId));
    }
    return data;
  }
);

export const loadSimilarFilmsAction = createAsyncThunk<TFilm[], string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'LOAD_SIMILAR_FILMS',
  async (filmId, {dispatch, extra: api}) => {
    const {data} = await api.get<TFilm[]>(APIRoute.SimilarFilms.replace(':id', filmId));
    return data;
  }
);

export const loadFilmCommentsAction = createAsyncThunk<TComment[], string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'LOAD_FILM_COMMENTS',
  async (filmId, {dispatch, extra: api}) => {
    const {data} = await api.get<TComment[]>(APIRoute.FilmComments.replace(':id', filmId));
    return data;
  }
);

export const sendFilmCommentAction = createAsyncThunk<TComment[], { id: number, comment: string, rating: number }, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'SEND_FILM_COMMENT',
  async ({id, comment, rating}, {dispatch, extra: api}) => {
    const {status} = await api.post(APIRoute.SendComment.replace(':id', id.toString()), {comment, rating});
    const {data} = await api.get<TComment[]>(APIRoute.FilmComments.replace(':id', id.toString()));
    if (status === HTTP_POSITIVE_RESPONSE_CODE) {
      const route = AppRoute.Film.replace(':id', id.toString());
      dispatch(redirectToRoute(route));
    }
    return data;
  }
);

export const loadPromoFilmAction = createAsyncThunk<TFilm, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'LOAD_PROMO',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<TFilm>(APIRoute.PromoFilm);
    return data;
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'REQUIRE_AUTHORIZATION',
  async (_arg, {dispatch, extra: api}) => {
    await api.get(APIRoute.Login);
  }
);

export const loginAction = createAsyncThunk<void, TAuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'USER_LOGIN',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: user} = await api.post<TUserData>(APIRoute.Login, {email, password});
    if (!user) {
      return;
    }
    await dispatch(loadFavoritesAction());
    saveUser(user);
  }
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'USER_LOGOUT',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    await dispatch(loadFavoritesAction());
    dropUser();
  },
);
