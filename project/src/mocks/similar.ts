import films from './films';

const similar = function (genre: string) {
  return films.filter((film) => film.genre === genre);
};
export default similar;
