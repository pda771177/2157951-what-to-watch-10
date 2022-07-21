import {TFilm} from '../../types/types';
import {Link} from 'react-router-dom';
import React from 'react';

type SmallFilmCardProps = { film: TFilm, onMouseOver: ()=>void} & { imgWidth?: string, imgHeight?: string };

function SmallFilmCard({film, onMouseOver, imgWidth = '0', imgHeight = '0'}: SmallFilmCardProps): JSX.Element {
  const {previewImage, name, id} = film;

  return (
    <article onMouseOver={onMouseOver} className='small-film-card catalog__films-card'>
      <div className='small-film-card__image'>
        <img src={previewImage} alt={name} width={imgWidth} height={imgHeight}/>
      </div>
      <h3 className='small-film-card__title'>
        <Link className='small-film-card__link' to={`/films/:${id}`}>{name}</Link>
      </h3>
    </article>
  );
}

SmallFilmCard.defaultProps = {imgSrc: '', imgWidth: '280', imgHeight: '175', title: ''};

export default SmallFilmCard;
