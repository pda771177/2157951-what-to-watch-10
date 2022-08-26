import React from 'react';
import {TFilm} from '../../types/types';
import SmallFilmCard from '../small-film-card/small-film-card';

type SmallFilmsListProps = {
  films: TFilm[]
};

function SmallFilmsList({films}: SmallFilmsListProps): JSX.Element {
  const out = [];
  const result: JSX.Element[] = [];

  films.forEach((film: TFilm) => {
    try {
      result.push(<SmallFilmCard film={film} key={film.id}/>);
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
