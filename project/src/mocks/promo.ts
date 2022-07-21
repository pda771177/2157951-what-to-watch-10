import {TFilm} from '../types/types';
import films from './films';

const promo: TFilm = films[Math.floor(Math.random() * films.length - 1)];
export default promo;
