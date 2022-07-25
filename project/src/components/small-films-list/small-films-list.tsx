import React from 'react';
import {TFilm} from '../../types/types';
import SmallFilmCard from '../small-film-card/small-film-card';

type SmallFilmsListProps = {
  films: TFilm[]
};

function SmallFilmsList({films}: SmallFilmsListProps): JSX.Element {
  const out = [];
  const result: JSX.Element[] = [];
  const [hoveredFilm, setHoveredFilm] = React.useState<TFilm>();

  const generateKey = (prefix?: string): string => Math.random().toString(36).replace('0.', prefix ?? '');

  films.forEach((film: TFilm) => {
    try {
      if (hoveredFilm?.id === film.id) {
        result.push(<SmallFilmCard play onMouseOver={() => setHoveredFilm(film)} film={film} key={generateKey(film.name)}/>);
      } else {
        result.push(<SmallFilmCard onMouseOver={() => setHoveredFilm(film)} film={film} key={generateKey(film.name)}/>);
      }
    } catch (error) {
      out.push({...film, error});
    }
  });

  return (
    <div className='catalog__films-list'>
      {result}
    </div>
  );
}

SmallFilmsList.defaultProps = {};

export default SmallFilmsList;
