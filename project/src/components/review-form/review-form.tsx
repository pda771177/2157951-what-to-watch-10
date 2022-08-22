import React, {SyntheticEvent} from 'react';
import StarRating from '../star-rating/star-rating';
import {TFilm} from '../../types/types';
import {store} from '../../store';
import {sendFilmCommentAction} from '../../store/api-actions';

type ReviewFormProps = {
  film: TFilm
};

function ReviewForm({film}: ReviewFormProps): JSX.Element {
  const [comment, setComment] = React.useState('');
  const [rating, setRating] = React.useState(0);

  const ratingChangeListener = (ratingScore: number) => setRating(ratingScore);

  const textChangeListener = (ev: SyntheticEvent) => {
    setComment((ev.target as HTMLTextAreaElement).value);
  };

  const onSubmitListener = function (ev: SyntheticEvent) {
    ev.preventDefault();
    const body = {comment, rating, id: film.id};
    store.dispatch(sendFilmCommentAction(body));
  };

  return (
    <div className="add-review">
      <div className="visually-hidden">{rating}</div>
      <form action="#" className="add-review__form" onSubmit={onSubmitListener}>
        <StarRating onRatingChange={ratingChangeListener}/>
        <div className="add-review__text">
          <textarea onChange={textChangeListener} value={comment} className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text"></textarea>
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit">Post</button>
          </div>
        </div>
      </form>
    </div>
  );
}

ReviewForm.defaultProps = {};

export default ReviewForm;
