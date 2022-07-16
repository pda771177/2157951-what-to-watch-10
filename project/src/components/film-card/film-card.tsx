import UserBlock from '../user-block/user-block';
import {TTitleGenreYear} from "../../types/types";
import Logo from '../logo/logo';
import FilmCardDescription from '../film-card-description/film-card-description';

type FilmCardProps = {
  filmId: string,
  imgBackgroundSrc: string,
  imgPosterSrc: string,
  imgPosterWidth?: string,
  imgPosterHeight?: string
} & TTitleGenreYear;

function FilmCard({filmId, title, genre, year, imgBackgroundSrc, imgPosterSrc, imgPosterWidth = '0', imgPosterHeight = '0'}: FilmCardProps): JSX.Element {

  return (
    <section className="film-card">
      <div className="film-card__bg">
        <img src={imgBackgroundSrc} alt={title}/>
      </div>

      <h1 className="visually-hidden">WTW</h1>
      <div className="visually-hidden">{filmId}</div>

      <header className="page-header film-card__head">
        <Logo />
        <UserBlock />
      </header>

      <div className="film-card__wrap">
        <div className="film-card__info">
          <div className="film-card__poster">
            <img src={imgPosterSrc} alt={`${title} poster`} width={imgPosterWidth} height={imgPosterHeight}/>
          </div>
          <FilmCardDescription filmId={filmId} title={title} genre={genre ?? ''} year={year} />
        </div>
      </div>
    </section>
  );
}
FilmCard.defaultProps = {imgBackgroundSrc: '', imgPosterSrc: '', imgPosterWidth: '218', imgPosterHeight: '327', title: '', genre: null, year: null};

export default FilmCard;
