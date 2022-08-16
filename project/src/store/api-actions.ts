import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state';
import {AxiosInstance} from 'axios';
import {APIRoute, AppRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR} from '../consts';
import {
  loadFilm, loadFilmComments,
  loadFilms,
  loadPromo, loadSimilarFilms,
  redirectToRoute,
  requireAuthorization, sendFilmComment,
  setDataLoadedStatus,
  setError,
} from './action';
import {AuthData} from '../types/auth-data';
import {UserData} from '../types/user-data';
import {dropUser, getUserToken, saveUser} from '../services/localStorageUser';
import {store} from './index';
import {TComment, TFilm} from '../types/types';

export const loadFilmsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  loadFilms.toString(),
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<TFilm[]>(APIRoute.Films);
      dispatch(setDataLoadedStatus(true));
      dispatch(loadFilms(data));
    } catch (e) {
      //
    } finally {
      dispatch(setDataLoadedStatus(false));
    }
  }
);

export const loadFilmAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  loadFilm.toString(),
  async (filmId, {dispatch, extra: api}) => {
    try {
      const film = await api.get<TFilm>(APIRoute.Film.replace(':id', filmId));
      dispatch(setDataLoadedStatus(true));
      dispatch(loadFilm(film.data));
      const similarFilms = await api.get<TFilm[]>(APIRoute.SimilarFilms.replace(':id', filmId));
      dispatch(loadSimilarFilms(similarFilms.data));
      const filmComments = await api.get<TComment[]>(APIRoute.FilmComments.replace(':id', filmId));
      dispatch(loadFilmComments(filmComments.data));
    } catch (e) {
      dispatch(redirectToRoute(AppRoute.Unknown))
    } finally {
      dispatch(setDataLoadedStatus(false));
    }
  }
);

export const sendFilmCommentAction = createAsyncThunk<void, { id:number, comment: string, rating: number }, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  sendFilmComment.toString(),
  async ({id, comment, rating}, {dispatch, extra: api}) => {
    try {
      dispatch(setDataLoadedStatus(true));
      await api.post(APIRoute.SendComment.replace(':id', id.toString()), {comment, rating});
      const filmComments = await api.get<TComment[]>(APIRoute.FilmComments.replace(':id', id.toString()));
      dispatch(loadFilmComments(filmComments.data));
    } catch (e) {
      //
    } finally {
      dispatch(setDataLoadedStatus(false));
    }
  }
);

export const loadPromoFilmsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  loadPromo.toString(),
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<TFilm>(APIRoute.PromoFilm);
      dispatch(setDataLoadedStatus(true));
      dispatch(loadPromo(data));
    } catch (e) {
      //
    } finally {
      dispatch(setDataLoadedStatus(false));
    }
  }
);

export const clearErrorAction = createAsyncThunk(
  'CLEAR_ERROR',
  () => {
    setTimeout(
      () => {
        store.dispatch(setError(null));
      },
      TIMEOUT_SHOW_ERROR
    );
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  requireAuthorization.toString(),
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch (e) {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  }
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'USER_LOGIN',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: user} = await api.post<UserData>(APIRoute.Login, {email, password});
    if(!user) return;
    saveUser(user);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Main))
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
    dropUser();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);
