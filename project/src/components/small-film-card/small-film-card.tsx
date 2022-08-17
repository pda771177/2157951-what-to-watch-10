import {TFilm} from '../../types/types';
import {Link} from 'react-router-dom';
import React, {useState} from 'react';
import Videoplayer from '../videoplayer/videoplayer';

type SmallFilmCardProps = {
  film: TFilm,
  onMouseOver: ()=>void,
  play?: boolean,
  imgWidth?: string,
  imgHeight?: string
};

function SmallFilmCard({film, play, onMouseOver, imgWidth, imgHeight}: SmallFilmCardProps): JSX.Element {
  const {previewImage, name, id} = film;
  const [haveFocus, setHaveFocus] = useState(false);

  const changeFocus = () => {
    setHaveFocus(!haveFocus);
  };

  return (
    <article onMouseOver={onMouseOver} className='small-film-card catalog__films-card'>
      <div onMouseOver={changeFocus} onMouseLeave={changeFocus} className='small-film-card__image'>
        {haveFocus ? <Videoplayer film={film} width={Number(imgWidth)} height={Number(imgHeight)} delay={1000} autoPlay mute/> : <img src={previewImage} alt={name} width={imgWidth} height={imgHeight}/>}
      </div>
      <h3 className='small-film-card__title'>
        <Link className='small-film-card__link' to={`/films/:${id}`}>{name}</Link>
      </h3>
    </article>
  );
}

SmallFilmCard.defaultProps = {imgWidth: '280', imgHeight: '175'};

export default React.memo(SmallFilmCard, (prevProps, nextProps) => prevProps.film === nextProps.film && prevProps.play === nextProps.play && prevProps.imgWidth === nextProps.imgWidth && prevProps.imgHeight === nextProps.imgHeight);
