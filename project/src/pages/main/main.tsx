import React from 'react';
import FilmCard from '../../components/film-card/film-card';
import Logo from '../../components/logo/logo';
import Copyright from '../../components/copyright/copyright';
import GenreSelector from '../../components/genre-selector/genre-selector';
import {useAppSelector} from '../../hooks';

function Main(): JSX.Element {
  const {promoFilm} = useAppSelector((state) => state);
  return (
    <React.Fragment>
      <FilmCard film={promoFilm}/>
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenreSelector />
        </section>

        <footer className="page-footer">
          <Logo light/>

          <Copyright/>
        </footer>
      </div>
    </React.Fragment>);
}

export default Main;
