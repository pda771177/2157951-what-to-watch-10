import React from 'react';
import Logo from '../../components/logo/logo';
import Copyright from '../../components/copyright/copyright';
import UserBlock from '../../components/user-block/user-block';
import FilmCardDescription from '../../components/film-card-description/film-card-description';
import SmallFilmsList from '../../components/small-films-list/small-films-list';
import FilmRating from '../../components/film-rating/film-rating';
import {useParams} from 'react-router-dom';
import films from '../../mocks/films';
import similar from '../../mocks/similar';
import FilmNavigation from '../../components/film-nav/film-nav';


function Film(): JSX.Element {

  const {id} = useParams();
  const [film] = films.filter((item) => item.id.toString() === id?.replace(':', ''));

  return (
    <React.Fragment>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={film.backgroundImage} alt={film.name}/>
          </div>

          <h1 className="visually-hidden">WTW</h1>
          <h1 className="visually-hidden">{film.id}</h1>

          <header className="page-header film-card__head">
            <Logo/>
            <UserBlock/>
          </header>

          <div className="film-card__wrap">
            <FilmCardDescription film={film} review/>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={film.posterImage} alt={`${film.name} poster`} width="218" height="327"/>
            </div>

            <div className="film-card__desc">
              <FilmNavigation film={film} />
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <div className="catalog__films-list">
            <SmallFilmsList films={similar(film.genre)}/>
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
