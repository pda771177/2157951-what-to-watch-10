import {TFilm} from '../../types/types';
import {useNavigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../consts';
import {useAppSelector} from '../../hooks';
import MyListButton from '../my-list-button/my-list-button';

type FilmCardDescriptionProps = {
  film: TFilm
  review?: boolean
};

function FilmCardDescription({film, review}: FilmCardDescriptionProps): JSX.Element {
  const {id, name, genre, released} = film;
  const {authorizationStatus} = useAppSelector((state) => state);
  const navigate = useNavigate();

  const reviewClassName = review === true ? 'btn film-card__button' : 'btn film-card__button visually-hidden';

  const onPlayClick = () => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      navigate(AppRoute.Player.replace(':id', film.id.toString()));
    } else {
      navigate(AppRoute.SignIn);
    }
  };

  const onAddReviewClick = () => {
    navigate(AppRoute.AddReview.replace(':id', film.id.toString()));
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
        <MyListButton promo={film}/>
        <a onClick={onAddReviewClick} className={reviewClassName}>Add review</a>
      </div>
    </div>
  );
}

FilmCardDescription.defaultProps = {};

export default FilmCardDescription;
