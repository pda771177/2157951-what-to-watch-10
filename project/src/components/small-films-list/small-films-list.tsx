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

  films.forEach((film: TFilm) => {
    try {
      if (hoveredFilm?.id === film.id) {
        result.push(<SmallFilmCard play onMouseOver={() => setHoveredFilm(film)} film={film} key={film.id}/>);
      } else {
        result.push(<SmallFilmCard onMouseOver={() => setHoveredFilm(film)} film={film} key={film.id}/>);
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

export default SmallFilmsList;
