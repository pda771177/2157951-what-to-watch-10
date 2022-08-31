import {TFilm} from '../../types/types';
import {Link} from 'react-router-dom';
import React, {SyntheticEvent, useState} from 'react';
import Videoplayer from '../videoplayer/videoplayer';
import {AppRoute} from '../../consts';
import {useAppDispatch} from '../../hooks';
import {redirectToRoute} from '../../store/action';

type SmallFilmCardProps = {
  film: TFilm,
  onMouseOver: ()=>void,
  play?: boolean,
  imgWidth?: string,
  imgHeight?: string
};

function SmallFilmCard({film, play, onMouseOver, imgWidth, imgHeight}: SmallFilmCardProps): JSX.Element {
  const {previewImage, name, id} = film;
  const dispatch = useAppDispatch();
  const [haveFocus, setHaveFocus] = useState(false);

  const changeFocus = () => {
    setHaveFocus(!haveFocus);
  };

  const onLinkClick = function (event: SyntheticEvent) {
    event.preventDefault();
    dispatch(redirectToRoute(AppRoute.Film.replace(':id', id.toString())));
  };

  return (
    <article onClick={onLinkClick} onMouseOver={onMouseOver} className='small-film-card catalog__films-card'>
      <div className='visually-hidden'>{play}</div>
      <div onMouseOver={changeFocus} onMouseLeave={changeFocus} className='small-film-card__image'>
        {haveFocus ? <Videoplayer film={film} width={Number(imgWidth)} height={Number(imgHeight)} delay={1000} autoPlay mute/> : <img src={previewImage} alt={name} width={imgWidth} height={imgHeight}/>}
      </div>
      <h3 className='small-film-card__title'>
        <Link className='small-film-card__link' onClick={onLinkClick} to='#'>{name}</Link>
      </h3>
    </article>
  );
}
SmallFilmCard.defaultProps = {imgWidth: '280', imgHeight: '175'};

export default React.memo(SmallFilmCard, (prevProps, nextProps) => prevProps.film === nextProps.film && prevProps.play === nextProps.play && prevProps.imgWidth === nextProps.imgWidth && prevProps.imgHeight === nextProps.imgHeight);
