import React from 'react';
import { TFilm } from '../../types/types';
import FilmCard from '../../components/film-card/film-card';
import Logo from '../../components/logo/logo';
import Copyright from '../../components/copyright/copyright';
import GenreSelector from '../../components/genre-selector/genre-selector';

type MainProps = {promo: TFilm, filmsList: TFilm[]}

function Main({promo, filmsList}: MainProps): JSX.Element {
  return (
    <React.Fragment>
      <FilmCard film={promo}/>
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenreSelector films={filmsList}/>
          <div className="catalog__more">
            <button className="catalog__button" type="button">Show more</button>
          </div>
        </section>

        <footer className="page-footer">
          <Logo light/>

          <Copyright/>
        </footer>
      </div>
    </React.Fragment>);
}

export default Main;
