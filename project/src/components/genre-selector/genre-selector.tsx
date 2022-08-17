import React from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {changeGenre} from '../../store/action';
import SmallFilmListSizer from '../small-film-list-sizer/small-film-list-sizer';

function GenreSelector(): JSX.Element {
  const {genre, allFilmsList, genredFilmsList} = useAppSelector((state) => state);
  const genres: Set<string> = new Set(allFilmsList.map((film) => film.genre));
  const out = [];
  const result: JSX.Element[] = [];

  const dispatch = useAppDispatch();

  const getSelectedClass = (genreStr: string, currentGenre: string) => currentGenre === genreStr ? 'catalog__genres-item catalog__genres-item--active' : 'catalog__genres-item';

  genres.forEach((genreStr: string) => {
    try {
      result.push(
        <li onClick={() => dispatch(changeGenre(genreStr))} className={getSelectedClass(genreStr, genre)} key={genreStr}>
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
        <li onClick={() => dispatch(changeGenre('All genres'))} className={getSelectedClass('All genres', genre)} key={'All genres'}>
          <a href="#" className="catalog__genres-link">All genres</a>
        </li>
        {result}
      </ul>
      <SmallFilmListSizer films={genredFilmsList}/>
    </React.Fragment>
  );
}

GenreSelector.defaultProps = {};

export default GenreSelector;
