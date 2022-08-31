import React from 'react';
import {AppRoute} from '../../consts';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {TFilm} from '../../types/types';
import {changeFavoriteAction, loadFavoritesAction} from '../../store/api-actions';
import {checkUserAuthorization} from '../../store/user-process/selectors';
import {getFavorites} from '../../store/films-process/selectors';
import {redirectToRoute} from '../../store/action';

type MyListButtonProps = {
  film: TFilm
};

function MyListButton({film}: MyListButtonProps): JSX.Element {
  const isAutorized = useAppSelector(checkUserAuthorization);
  const favorites = useAppSelector(getFavorites);

  const dispatch = useAppDispatch();

  let isInFavorites: boolean;
  try {
    isInFavorites = favorites.map(({id}: TFilm) => id).includes(film.id);
  } catch (e) {
    isInFavorites = false;
  }

  const sign = (isAutorized && isInFavorites) ? (
    <svg viewBox="0 0 19 20" width="25" height="25" fill="currentColor">
      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
    </svg>
  ) : (
    <svg viewBox="0 0 19 19" width="25" height="25" fill="currentColor">
      <path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"/>
    </svg>
  );

  const onClick = isAutorized ? () => {
    dispatch(changeFavoriteAction({filmId: film.id, favorite: !isInFavorites}));
    dispatch(loadFavoritesAction());
    dispatch(redirectToRoute(AppRoute.MyList));
  } : () => dispatch(redirectToRoute(AppRoute.SignIn));

  return (
    <button onClick={onClick} className="btn btn--list film-card__button" type="button">
      {sign}
      <span>My list</span>
      <span className={favorites && favorites.length ? 'film-card__count' : 'visually-hidden'}>{favorites?.length.toString()}</span>
    </button>
  );
}

export default MyListButton;
