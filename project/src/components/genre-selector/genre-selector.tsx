import React from 'react';
import {TFilm} from '../../types/types';
import SmallFilmsList from '../small-films-list/small-films-list';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {changeGenre} from '../../store/action';

type GenreSelectorProps = {
  films: TFilm[]
};

function GenreSelector({films}: GenreSelectorProps): JSX.Element {
  const genres: Set<string> = new Set(films.map((film) => film.genre));
  const out = [];
  const result: JSX.Element[] = [];

  const genre = useAppSelector((state) => state.genre);
  const genredFilms = useAppSelector((state) => state.genredFilmsList);
  const dispatch = useAppDispatch();

  const getSelectedClass = (genreStr: string, currentGenre: string) => currentGenre === genreStr ? 'catalog__genres-item catalog__genres-item--active' : 'catalog__genres-item';

  genres.forEach((genreStr: string) => {
    try {
      result.push(
        <li onClick={() => dispatch(changeGenre(genreStr))} className={getSelectedClass(genreStr, genre)}>
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
        <li onClick={() => dispatch(changeGenre('All genres'))} className={getSelectedClass('All genres', genre)}>
          <a href="#" className="catalog__genres-link">All genres</a>
        </li>
        {result}
      </ul>
      <SmallFilmsList films={genredFilms}/>
    </React.Fragment>
  );
}

GenreSelector.defaultProps = {};

export default GenreSelector;
