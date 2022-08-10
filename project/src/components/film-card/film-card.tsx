import UserBlock from '../user-block/user-block';
import {TFilm} from '../../types/types';
import Logo from '../logo/logo';
import FilmCardDescription from '../film-card-description/film-card-description';

type FilmCardProps = { film?: TFilm | null | undefined, imgPosterWidth?: string, imgPosterHeight?: string };

function FilmCard({film, imgPosterWidth = '0', imgPosterHeight = '0'}: FilmCardProps): JSX.Element {
  if(!film) {
    return (
      <header className="page-header film-card__head">
        <Logo/>
        <UserBlock/>
      </header>
    );
  }

  const {id, posterImage, backgroundImage, name} = film;


  return (
    <section className="film-card">
      <div className="film-card__bg">
        <img src={backgroundImage} alt={name}/>
      </div>

      <h1 className="visually-hidden">WTW</h1>
      <div className="visually-hidden">{id}</div>

      <header className="page-header film-card__head">
        <Logo/>
        <UserBlock/>
      </header>

      <div className="film-card__wrap">
        <div className="film-card__info">
          <div className="film-card__poster">
            <img src={posterImage} alt={`${name} poster`} width={imgPosterWidth} height={imgPosterHeight}/>
          </div>
          <FilmCardDescription film={film}/>
        </div>
      </div>
    </section>
  );
}

FilmCard.defaultProps = {imgPosterWidth: '218', imgPosterHeight: '327'};

export default FilmCard;
