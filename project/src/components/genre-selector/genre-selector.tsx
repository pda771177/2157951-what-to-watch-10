import React from 'react';
import {TFilm} from '../../types/types';
import SmallFilmsList from '../small-films-list/small-films-list';

type GenreSelectorProps = {
  films: TFilm[]
};

function GenreSelector({films}: GenreSelectorProps): JSX.Element {
  const genres: Set<string> = new Set(films.map((film) => film.genre));
  const out = [];
  const result: JSX.Element[] = [];

  const [genre, setGenre] = React.useState('All genres');

  const selectFilmsByGenre = (genreStr: string, filmsArr: TFilm[]): TFilm[] => {
    const resultFilms = filmsArr.filter((film) => film.genre === genreStr);
    return resultFilms.length ? resultFilms : films;
  };

  const getSelectedClass = (genreStr: string) => genre === genreStr ? 'catalog__genres-item catalog__genres-item--active' : 'catalog__genres-item';

  genres.forEach((genreStr: string) => {
    try {
      result.push(
        <li onClick={() => setGenre(genreStr)} className={getSelectedClass(genreStr)}>
          <a href="#" className="catalog__genres-link">{genreStr}</a>
        </li>
      );
    } catch (e) {
      out.push({genreStr, e});
    }
  });


  return (
    <React.Fragment>
      <ul className="catalog__genres-list">
        <li onClick={() => setGenre('All genres')} className={getSelectedClass('All genres')}>
          <a href="#" className="catalog__genres-link">All genres</a>
        </li>
        {result}
      </ul>
      <SmallFilmsList films={selectFilmsByGenre(genre, films)}/>
    </React.Fragment>
  );
}

GenreSelector.defaultProps = {};

export default GenreSelector;
