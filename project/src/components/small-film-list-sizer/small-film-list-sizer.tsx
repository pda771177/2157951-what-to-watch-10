import React from 'react';
import {TFilm} from '../../types/types';
import SmallFilmsList from '../small-films-list/small-films-list';
import ShowMoreButton from '../show-more-button/show-more-button';

type SmallFilmListSizerProps = {
  films: TFilm[],
};

function SmallFilmListSizer({films}: SmallFilmListSizerProps): JSX.Element {
  const [size, setSize] = React.useState<number>(8);

  let filmsToShow: TFilm[];
  try {
    filmsToShow = films.slice(0, size);
  } catch (e) {
    filmsToShow = films;
  }

  return (
    <React.Fragment>
      <SmallFilmsList films={filmsToShow}/>
      <ShowMoreButton visible={filmsToShow.length < films.length} onClick={() => {setSize(size + 8);}}/>
    </React.Fragment>
  );
}

SmallFilmListSizer.defaultProps = {};

export default SmallFilmListSizer;
