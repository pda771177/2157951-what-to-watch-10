import {TFilm} from '../../types/types';
import {useNavigate} from 'react-router-dom';

type FilmCardDescriptionProps = {
  film: TFilm
  review?: boolean
};

function FilmCardDescription({film, review}: FilmCardDescriptionProps): JSX.Element {
  const {id, name, genre, released} = film;
  const navigate = useNavigate();

  const reviewClassName = review ? 'btn film-card__button' : 'btn film-card__button visually-hidden';

  const onPlayClick = () => {
    navigate(`/player/:${film.id.toString()}`);
  };
  return (
    <div className="film-card__desc">
      <div className="visually-hidden">{id}</div>
      <h2 className="film-card__title">{name}</h2>
      <p className="film-card__meta">
        <span className="film-card__genre">{genre}</span>
        <span className="film-card__year">{released ? released.toString() : ''}</span>
      </p>

      <div className="film-card__buttons">
        <button onClick={onPlayClick} className="btn btn--play film-card__button" type="button">
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
