import UserBlock from '../user-block/user-block';
import Logo from '../logo/logo';
import FilmCardDescription from "../film-card-description/film-card-description";

type FilmCardProps = {
  imgBackgroundSrc: string,
  imgPosterSrc: string,
  imgPosterWidth?: string,
  imgPosterHeight?: string,
  title: string,
  genre?: string,
  year?: number
};

function FilmCard({title, genre, year, imgBackgroundSrc, imgPosterSrc, imgPosterWidth = '0', imgPosterHeight = '0'}: FilmCardProps): JSX.Element {

  return (
    <section className="film-card">
      <div className="film-card__bg">
        <img src={imgBackgroundSrc} alt={title}/>
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <header className="page-header film-card__head">
        <Logo />
        <UserBlock />
      </header>

      <div className="film-card__wrap">
        <div className="film-card__info">
          <div className="film-card__poster">
            <img src={imgPosterSrc} alt={`${title} poster`} width={imgPosterWidth} height={imgPosterHeight}/>
          </div>
          <FilmCardDescription title={title} genre={genre ?? ''} year={year} />
        </div>
      </div>
    </section>
  );
}
FilmCard.defaultProps = {imgBackgroundSrc: '', imgPosterSrc: '', imgPosterWidth: '218', imgPosterHeight: '327', title: '', genre: null, year: null};

export default FilmCard;
