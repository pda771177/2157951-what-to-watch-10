import {TFilmCard} from '../../types/types';

type SmallFilmCardProps = TFilmCard;

function SmallFilmCard({title, imgSrc, imgWidth = '0', imgHeight = '0'}: SmallFilmCardProps): JSX.Element {

  return (
    <article className='small-film-card catalog__films-card'>
      <div className='small-film-card__image'>
        <img src={imgSrc} alt={title} width={imgWidth} height={imgHeight}/>
      </div>
      <h3 className='small-film-card__title'>
        <a className='small-film-card__link' href='film-page.html'>{title}</a>
      </h3>
    </article>
  );
}
SmallFilmCard.defaultProps = {imgSrc: '', imgWidth: '280', imgHeight: '175', title: ''};

export default SmallFilmCard;
