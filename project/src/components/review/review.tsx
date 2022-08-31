import React from 'react';
import {TComment} from '../../types/types';

type ReviewProps = {
  review: TComment
};

function Review({review}: ReviewProps): JSX.Element {
  const {user, id, date, comment, rating} = review;
  const formatedData = new Date(date).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric' });
  const formatedRating = rating.toLocaleString(undefined, {minimumFractionDigits: 1}).replace('.', ',');
  return (
    <div className="review">
      <div className="visually-hidden">{id}</div>
      <blockquote className="review__quote">
        <p className="review__text">{comment}</p>

        <footer className="review__details">
          <cite className="review__author">{user.name}</cite>
          <time className="review__date" dateTime="2016-12-20">{formatedData}</time>
        </footer>
      </blockquote>

      <div className="review__rating">{formatedRating}</div>
    </div>
  );
}

export default Review;
