import React from 'react';
import {TComment, TFilm} from '../../types/types';
import Review from '../review/review';

type ReviewsProps = {
  film: TFilm,
  reviews: TComment[]
};

function Reviews({film, reviews}: ReviewsProps): JSX.Element {
  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        <Review review={reviews[0]}/>
        <Review review={reviews[1]}/>
        <Review review={reviews[2]}/>
      </div>
      <div className="film-card__reviews-col">
        <Review review={reviews[3]}/>
        <Review review={reviews[4]}/>
        <Review review={reviews[5]}/>
      </div>
    </div>
  );
}

Reviews.defaultProps = {};

export default Reviews;
