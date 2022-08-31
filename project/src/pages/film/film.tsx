import React, {useEffect} from 'react';
import Copyright from '../../components/copyright/copyright';
import Logo from '../../components/logo/logo';
import SmallFilmsList from '../../components/small-films-list/small-films-list';
import FilmNavigation from '../../components/film-navigation/film-navigation';
import FilmCardDescription from '../../components/film-card-description/film-card-description';
import UserBlock from '../../components/user-block/user-block';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {useParams} from 'react-router-dom';
import {getFilmComments, getLoadingStatus, getSelectedFilm, getSimilarFilms} from '../../store/films-process/selectors';
import {checkUserAuthorization} from '../../store/user-process/selectors';
import {loadFilmAction} from '../../store/api-actions';
import Loading from '../loading/loading';
import {redirectToRoute} from '../../store/action';
import {AppRoute, UNKNOWN_FILM} from '../../consts';

function Film(): JSX.Element {
  const dispatch = useAppDispatch();
  const {id} = useParams();
  const filmId = id ? id.replace(':', '') : '';
  const selectedFilm = useAppSelector(getSelectedFilm);
  const isAutorized = useAppSelector(checkUserAuthorization);
  const similarFilms = useAppSelector(getSimilarFilms);
  const filmComments = useAppSelector(getFilmComments);
  const isLoading = useAppSelector(getLoadingStatus);

  useEffect(() => {
    if (!selectedFilm || selectedFilm?.id.toString() !== filmId){
      (async () => {
        await dispatch(loadFilmAction(filmId));
        if (selectedFilm?.id === UNKNOWN_FILM.id){
          dispatch(redirectToRoute(AppRoute.Unknown));
        }
      })();
    }
  }, [dispatch, id]);

  const similar = similarFilms.filter((flm) => flm.id.toString() !== filmId);
  if (isLoading || !selectedFilm || selectedFilm?.id === UNKNOWN_FILM.id) {
    return (
      <Loading/>
    );
  }
  return (
    <React.Fragment>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={selectedFilm?.backgroundImage} alt={selectedFilm?.name}/>
          </div>

          <h1 className="visually-hidden">WTW</h1>
          <h1 className="visually-hidden">{selectedFilm?.id}</h1>

          <header className="page-header film-card__head">
            <Logo/>
            <UserBlock/>
          </header>

          <div className="film-card__wrap">
            <FilmCardDescription film={selectedFilm} review={isAutorized}/>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={selectedFilm?.posterImage} alt={`${selectedFilm?.name} poster`} width="218" height="327"/>
            </div>

            <div className="film-card__desc">
              <FilmNavigation film={selectedFilm} comments={filmComments}/>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <div className="catalog__films-list">
            <SmallFilmsList films={similar}/>
          </div>
        </section>

        <footer className="page-footer">

          <Logo light/>
          <Copyright/>
        </footer>
      </div>
    </React.Fragment>
  );
}

export default Film;
