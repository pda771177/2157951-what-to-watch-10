import React from 'react';

type StarRatingProps = {
  maxLevel: number,
  checked?: number,
  onRatingChange: any
};

function StarRating({maxLevel, checked, onRatingChange}: StarRatingProps): JSX.Element {
  const out = [];
  const stars: JSX.Element[] = [];
  const [rating, setRating] = React.useState(checked);

  for (let i = maxLevel; i > 0; i--) {
    try {
      stars.push(
        <React.Fragment key={i}>
          <input className="rating__input" id={`star-${i}`} type="radio" name="rating" value={i} checked={i === rating} onChange={()=> {setRating(i); onRatingChange(i);}}/>
          <label className="rating__label" htmlFor={`star-${i}`}>Rating {i}</label>
        </React.Fragment>
      );
    } catch (error) {
      out.push({i, error});
    }
  }

  return (
    <div className="rating">
      <div className="rating__stars">
        {stars}
      </div>
    </div>
  );
}
StarRating.defaultProps = {maxLevel: 10, checked: 0};

export default StarRating;
