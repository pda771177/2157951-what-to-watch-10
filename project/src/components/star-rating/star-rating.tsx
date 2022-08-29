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
      stars.push(<Star level={i} checked={i === rating} onClick={()=> {setRating(i); onRatingChange(i);}}/>);
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

type StarProps = {
  level: number,
  checked: boolean,
  onClick: any
};

function Star({level, checked, onClick}: StarProps): JSX.Element {
  return (
    <React.Fragment>
      <input className="rating__input" id={`star-${level}`} type="radio" name="rating" value={level} checked={checked} onClick={onClick}/>
      <label className="rating__label" htmlFor={`star-${level}`}>Rating {level}</label>
    </React.Fragment>
  );
}
