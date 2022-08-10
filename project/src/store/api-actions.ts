import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state';
import {AxiosInstance} from 'axios';
import {APIRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR} from '../consts';
import {requireAuthorization, loadFilms, loadPromo, setError, setDataLoadedStatus} from './action';
import {AuthData} from '../types/auth-data';
import {UserData} from '../types/user-data';
import {dropToken, saveToken} from '../services/token';
import {store} from './index';
import {TFilm} from '../types/types';

export const loadFilmsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'LOAD_FILMS',
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

export const loadPromoFilmsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'LOAD_PROMO',
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
  'REQUIRE_AUTHORIZATION',
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
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);
