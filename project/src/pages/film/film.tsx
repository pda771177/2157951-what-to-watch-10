import React from 'react';
import Logo from '../../components/logo/logo';
import Copyright from '../../components/copyright/copyright';
import UserBlock from '../../components/user-block/user-block';
import FilmCardDescription from '../../components/film-card-description/film-card-description';
import SmallFilmsList from '../../components/small-films-list/small-films-list';
import {useParams} from 'react-router-dom';
import FilmNavigation from '../../components/film-nav/film-nav';
import {useAppSelector} from '../../hooks';
import {store} from '../../store';
import {loadFilmAction} from '../../store/api-actions';
import LoadingScreen from '../loading/loading';
import {AuthorizationStatus} from '../../consts';


function Film(): JSX.Element {

  const {id} = useParams();
  const {selectedFilm, similarFilms, filmComments, authorizationStatus} = useAppSelector((state) => state);
  const filmId = id ? id.replace(':', '') : '';

  if (!selectedFilm || selectedFilm.id.toString() !== filmId) {
    store.dispatch(loadFilmAction(filmId));
    return (
      <LoadingScreen/>
    );
  }

  const similar = similarFilms.filter((film) => film.id.toString() !== filmId);
  return (
    <React.Fragment>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={selectedFilm.backgroundImage} alt={selectedFilm.name}/>
          </div>

          <h1 className="visually-hidden">WTW</h1>
          <h1 className="visually-hidden">{selectedFilm.id}</h1>

          <header className="page-header film-card__head">
            <Logo/>
            <UserBlock/>
          </header>

          <div className="film-card__wrap">
            <FilmCardDescription film={selectedFilm} review={authorizationStatus === AuthorizationStatus.Auth}/>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={selectedFilm.posterImage} alt={`${selectedFilm.name} poster`} width="218" height="327"/>
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

Film.defaultProps = {};

export default Film;
