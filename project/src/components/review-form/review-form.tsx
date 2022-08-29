import React, {SyntheticEvent, useState} from 'react';
import StarRating from '../star-rating/star-rating';
import {TFilm} from '../../types/types';
import {store} from '../../store';
import {sendFilmCommentAction} from '../../store/api-actions';

const MIN_REVIEW_LENGTH = 50;
const MAX_REVIEW_LENGTH = 400;
const MIN_RATING = 1;

type ReviewFormProps = {
  film: TFilm
};

function ReviewForm({film}: ReviewFormProps): JSX.Element {
  const [comment, setComment] = React.useState('');
  const [rating, setRating] = React.useState(0);
  const [isTextLengthCorrect, setIsTextLengthCorrect] = React.useState(false);
  const [error, setError] = useState(false);

  const ratingChangeListener = (ratingScore: number) => setRating(ratingScore);

  const textChangeListener = (ev: SyntheticEvent) => {
    const text = ev.target as HTMLTextAreaElement;
    setComment(text.value);
    text.value.length < MIN_REVIEW_LENGTH || text.value.length > MAX_REVIEW_LENGTH ? setIsTextLengthCorrect(false) : setIsTextLengthCorrect(true);
  };

  const onSubmitListener = function (ev: SyntheticEvent) {
    ev.preventDefault();
    if (!isTextLengthCorrect && rating < MIN_RATING) {return;}
    const body = {comment, rating, id: film.id};
    store.dispatch(sendFilmCommentAction(body));
    setError(true);
  };

  return (
    <div className="add-review">
      <div className="visually-hidden">{rating}</div>
      <form action="#" className="add-review__form" onSubmit={onSubmitListener}>
        <StarRating onRatingChange={ratingChangeListener}/>
        <div className="add-review__text">
          <textarea onChange={textChangeListener} value={comment} className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text"/>
          <div className="add-review__submit">
            <button className="add-review__btn" style={{opacity: isTextLengthCorrect && rating >= MIN_RATING ? '100%' : '50%'}} type="submit">Post</button>
          </div>
        </div>
      </form>
      <h3 className={error ? 'sign-in__field--error' : 'visually-hidden'}>Error, try again later</h3>
    </div>
  );
}

ReviewForm.defaultProps = {};

export default ReviewForm;
