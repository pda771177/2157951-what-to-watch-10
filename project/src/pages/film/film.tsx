import React from 'react';
import {TTitleGenreYear} from '../../types/types';
import Logo from '../../components/logo/logo';
import Copyright from '../../components/copyright/copyright';
import UserBlock from '../../components/user-block/user-block';
import FilmCardDescription from '../../components/film-card-description/film-card-description';
import SmallFilmsList from '../../components/small-films-list/small-films-list';
import FilmRating from '../../components/film-rating/film-rating';
import {useParams} from 'react-router-dom';

type FilmProps = TTitleGenreYear;

function Film({title, genre, year}: FilmProps): JSX.Element {
  const {id} = useParams();

  const filmsList = [{
    title: 'Fantastic Beasts: The Crimes of Grindelwald',
    imgSrc: 'img/fantastic-beasts-the-crimes-of-grindelwald.jpg'
  }, {title: 'Bohemian Rhapsody', imgSrc: 'img/bohemian-rhapsody.jpg'}, {
    title: 'Macbeth',
    imgSrc: 'img/macbeth.jpg'
  }, {title: 'Aviator', imgSrc: 'img/aviator.jpg'}];
  return (
    <React.Fragment>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src="img/bg-the-grand-budapest-hotel.jpg" alt={title}/>
          </div>

          <h1 className="visually-hidden">WTW</h1>
          <h1 className="visually-hidden">{id}</h1>

          <header className="page-header film-card__head">
            <Logo/>
            <UserBlock/>
          </header>

          <div className="film-card__wrap">
            <FilmCardDescription filmId={id} title={title} genre={genre} year={year} review/>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src="img/the-grand-budapest-hotel-poster.jpg" alt={`${title} poster`} width="218" height="327"/>
            </div>

            <div className="film-card__desc">
              <nav className="film-nav film-card__nav">
                <ul className="film-nav__list">
                  <li className="film-nav__item film-nav__item--active">
                    <a href="#" className="film-nav__link">Overview</a>
                  </li>
                  <li className="film-nav__item">
                    <a href="#" className="film-nav__link">Details</a>
                  </li>
                  <li className="film-nav__item">
                    <a href="#" className="film-nav__link">Reviews</a>
                  </li>
                </ul>
              </nav>

              <FilmRating ratingScore={8.9} voted={240}/>

              <div className="film-card__text">
                <p>In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave{'\''}s friend and protege.</p>
                <p>Gustave prides himself on providing first-class service to the hotel{'\''}s guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave{'\''}s lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.</p>

                <p className="film-card__director"><strong>Director: Wes Anderson</strong></p>

                <p className="film-card__starring"><strong>Starring: Bill Murray, Edward Norton, Jude Law, Willem Dafoe and other</strong></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <div className="catalog__films-list">
            <SmallFilmsList filmsList={filmsList}/>
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
