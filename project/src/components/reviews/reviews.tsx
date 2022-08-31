import React from 'react';
import {TComment} from '../../types/types';
import Review from '../review/review';

type ReviewsProps = {
  comments: TComment[]
};

function Reviews({comments}: ReviewsProps): JSX.Element {
  if (!comments.length) {
    return (
      <p className="film-card__details-name">There are no comments yet</p>
    );
  }

  const middle = Math.floor(comments.length / 2);
  const leftComments = comments.slice(0, middle);
  const rightComments = comments.slice(middle, comments.length);

  const leftColumn = leftComments.map((comment) => (<Review key={comment.id} review={comment}/>));
  const rightColumn = rightComments.map((comment) => (<Review key={comment.id} review={comment}/>));

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {leftColumn}
      </div>
      <div className="film-card__reviews-col">
        {rightColumn}
      </div>
    </div>
  );
}

export default Reviews;
