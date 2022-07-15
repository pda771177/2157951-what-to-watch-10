import {TTitleGenreYear} from '../../types/types';

type FilmCardDescriptionProps = {
  filmId?: string,
  review?: boolean
} & TTitleGenreYear;

function FilmCardDescription({filmId, title, genre, review, year}: FilmCardDescriptionProps): JSX.Element {

  const reviewClassName = review ? 'btn film-card__button' : 'btn film-card__button visually-hidden';

  return (
    <div className="film-card__desc">
      <div className="visually-hidden">{filmId}</div>
      <h2 className="film-card__title">{title}</h2>
      <p className="film-card__meta">
        <span className="film-card__genre">{genre}</span>
        <span className="film-card__year">{year ? year.toString() : ''}</span>
      </p>

      <div className="film-card__buttons">
        <button className="btn btn--play film-card__button" type="button">
          <svg viewBox="0 0 19 19" width="19" height="19">
            <use xlinkHref="#play-s"></use>
          </svg>
          <span>Play</span>
        </button>
        <button className="btn btn--list film-card__button" type="button">
          <svg viewBox="0 0 19 20" width="19" height="20">
            <use xlinkHref="#add"></use>
          </svg>
          <span>My list</span>
          <span className="film-card__count">9</span>
        </button>
        <a href="add-review.html" className={reviewClassName}>Add review</a>
      </div>
    </div>
  );
}

FilmCardDescription.defaultProps = {};

export default FilmCardDescription;
