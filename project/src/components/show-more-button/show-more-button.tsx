import React from 'react';

type ShowMoreButtonProps = {
  onClick: ()=>void,
  visible: boolean
};

function ShowMoreButton({onClick, visible}: ShowMoreButtonProps): JSX.Element {

  const className = visible ? 'catalog__more' : 'catalog__more visually-hidden';

  return (
    <div className={className}>
      <button onClick={onClick} className="catalog__button" type="button">Show more</button>
    </div>
  );
}
ShowMoreButton.defaultProps = {};

export default ShowMoreButton;
