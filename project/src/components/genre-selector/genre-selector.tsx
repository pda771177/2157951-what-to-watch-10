import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import SmallFilmListSizer from '../small-film-list-sizer/small-film-list-sizer';
import {TFilm} from '../../types/types';
import {getAllFilms} from '../../store/films-process/selectors';
import {MAX_GENRES_LENGTH} from '../../consts';

const filterByGenre = (filmsList: TFilm[], genre: string): TFilm[] => {
  const resultFilms = filmsList.filter((film) => film.genre === genre);
  return resultFilms.length ? resultFilms : filmsList;
};

function GenreSelector(): JSX.Element {
  const [genre, changeGenre] = useState('All genres');
  const allFilmsList = useAppSelector(getAllFilms);
  const allGenres = [...new Set(allFilmsList.map((film) => film.genre))];
  const genres = allGenres.slice(0, allGenres[MAX_GENRES_LENGTH] ? MAX_GENRES_LENGTH : allGenres.length).sort();
  const out = [];
  const result: JSX.Element[] = [];
  useAppDispatch();
  const getSelectedClass = (genreStr: string, currentGenre: string) => currentGenre === genreStr ? 'catalog__genres-item catalog__genres-item--active' : 'catalog__genres-item';

  genres.forEach((genreStr: string) => {
    try {
      result.push(
        <li onClick={() => changeGenre(genreStr)} className={getSelectedClass(genreStr, genre)} key={genreStr}>
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
        <li onClick={() => changeGenre('All genres')} className={getSelectedClass('All genres', genre)} key={'All genres'}>
          <a href="#" className="catalog__genres-link">All genres</a>
        </li>
        {result}
      </ul>
      <SmallFilmListSizer films={filterByGenre(allFilmsList, genre)}/>
    </React.Fragment>
  );
}

export default GenreSelector;
