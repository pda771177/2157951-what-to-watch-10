import {TFilm} from '../../types/types';
import {AppRoute} from '../../consts';
import MyListButton from '../my-list-button/my-list-button';
import {useAppDispatch} from '../../hooks';
import {redirectToRoute} from '../../store/action';
import React from 'react';

type FilmCardDescriptionProps = {
  film: TFilm
  review?: boolean
};

function FilmCardDescription({film, review}: FilmCardDescriptionProps): JSX.Element {
  const {id, name, genre, released} = film;
  const dispatch = useAppDispatch();

  const reviewClassName = review === true ? 'btn film-card__button' : 'btn film-card__button visually-hidden';

  const onPlayClick = () => {
    dispatch(redirectToRoute(AppRoute.Player.replace(':id', film.id.toString())));
  };

  const onAddReviewClick = () => {
    dispatch(redirectToRoute(AppRoute.AddReview.replace(':id', film.id.toString())));
  };

  return (
    <div className="film-card__desc">
      <div className="visually-hidden">{id}</div>
      <h2 className="film-card__title">{name}</h2>
      <p className="film-card__meta">
        <span className="film-card__genre">{genre}</span>
        <span className="film-card__year">{released ? released.toString() : ''}</span>
      </p>

      <div className="film-card__buttons">
        <button onClick={onPlayClick} className="btn btn--play film-card__button" type="button">
          <svg viewBox="0 0 19 19" width="19" height="19">
            <use xlinkHref="#play-s"/>
          </svg>
          <span>Play</span>
        </button>
        <MyListButton film={film}/>
        <a onClick={onAddReviewClick} className={reviewClassName}>Add review</a>
      </div>
    </div>
  );
}

export default FilmCardDescription;
