import React from 'react';
import {TFilm} from '../../types/types';
import FilmRating from '../film-rating/film-rating';

type OverviewProps = {
  film: TFilm
};

function Overview({film}: OverviewProps): JSX.Element {
  return (
    <React.Fragment>
      <FilmRating ratingScore={film.rating} voted={film.scoresCount}/>
      <div className="film-card__text">
        <p>{film.description}</p>
        <p className="film-card__director"><strong>Director: {film.director}</strong></p>
        <p className="film-card__starring"><strong>Starring: {film.starring.toString().replace(',', ', ')} and other</strong></p>
      </div>
    </React.Fragment>
  );
}

Overview.defaultProps = {};

export default Overview;
