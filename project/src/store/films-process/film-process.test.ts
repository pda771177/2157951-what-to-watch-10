import {TFilmProcess} from '../../types/state';
import {TComment, TFilm} from "../../types/types";
import faker from 'faker';

import {filmsProcess} from './films-process';
import {
  loadFilmsAction,
  loadPromoFilmAction,
  loadFilmAction,
  loadFavoritesAction,
  loadSimilarFilmsAction, changeFavoriteAction, loadFilmCommentsAction, sendFilmCommentAction
} from '../api-actions';

describe('Reducer: films', () => {
  let state: TFilmProcess;

  beforeEach(() => {
    state = {
      allFilmsList: [],
      promoFilm: null,
      error: null,
      isDataLoaded: false,
      selectedFilm: null,
      similarFilms: [],
      filmComments: [],
      favorites: []
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(filmsProcess.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual(state);
  });

  it('should set isDataLoaded=true if pending', () => {
    expect(filmsProcess.reducer(state, {type: loadFilmsAction.pending.type}))
      .toEqual(Object.assign(state, {isDataLoaded: true}));
  });
  it('should update allFilmsList if fulfilled', () => {
    const films = generateMockFilms();
    expect(filmsProcess.reducer(state, {type: loadFilmsAction.fulfilled.type, payload: films}))
      .toEqual(Object.assign(state, {allFilmsList: films}));
  });
  it('should update allFilmsList to [] if rejected', () => {
    expect(filmsProcess.reducer(state, { type: loadFilmsAction.rejected.type }))
      .toEqual(state);
  });

  it('should set isDataLoaded=true if pending', () => {
    expect(filmsProcess.reducer(state, {type: loadPromoFilmAction.pending.type}))
      .toEqual(Object.assign(state, {isDataLoaded: true}));
  });
  it('should update promoFilm if fulfilled', () => {
    const film = generateMockFilms();
    expect(filmsProcess.reducer(state, {type: loadPromoFilmAction.fulfilled.type, payload: film}))
      .toEqual(Object.assign(state, {promoFilm: film}));
  });
  it('should update promoFilm to null if rejected', () => {
    expect(filmsProcess.reducer(state, { type: loadPromoFilmAction.rejected.type }))
      .toEqual(state);
  });

  it('should set isDataLoaded=true if pending', () => {
    expect(filmsProcess.reducer(state, {type: loadFilmAction.pending.type}))
      .toEqual(Object.assign(state, {isDataLoaded: true}));
  });
  it('should update selectedFilm if fulfilled', () => {
    const film = generateMockFilm();
    expect(filmsProcess.reducer(state, {type: loadFilmAction.fulfilled.type, payload: film}))
      .toEqual(Object.assign(state, {selectedFilm: film}));
  });
  it('should update selectedFilm to null if rejected', () => {
    expect(filmsProcess.reducer(state, { type: loadFilmAction.rejected.type }))
      .toEqual(state);
  });

  it('should set isDataLoaded=true if pending', () => {
    expect(filmsProcess.reducer(state, {type: loadFavoritesAction.pending.type}))
      .toEqual(Object.assign(state, {isDataLoaded: true}));
  });
  it('should update favorites if fulfilled', () => {
    const films = generateMockFilms();
    expect(filmsProcess.reducer(state, {type: loadFavoritesAction.fulfilled.type, payload: films}))
      .toEqual(Object.assign(state, {favorites: films}));
  });
  it('should update favorites to [] if rejected', () => {
    expect(filmsProcess.reducer(state, { type: loadFavoritesAction.rejected.type }))
      .toEqual(state);
  });

  it('should set isDataLoaded=true if pending', () => {
    expect(filmsProcess.reducer(state, {type: loadSimilarFilmsAction.pending.type}))
      .toEqual(Object.assign(state, {isDataLoaded: true}));
  });
  it('should update similarFilms if fulfilled', () => {
    const films = generateMockFilms();
    expect(filmsProcess.reducer(state, {type: loadSimilarFilmsAction.fulfilled.type, payload: films}))
      .toEqual(Object.assign(state, {similarFilms: films}));
  });
  it('should update similarFilms to [] if rejected', () => {
    expect(filmsProcess.reducer(state, { type: loadSimilarFilmsAction.rejected.type }))
      .toEqual(state);
  });

  it('should set isDataLoaded=true if pending', () => {
    expect(filmsProcess.reducer(state, {type: changeFavoriteAction.pending.type}))
      .toEqual(Object.assign(state, {isDataLoaded: true}));
  });
  it('should update favorites if fulfilled', () => {
    const films = generateMockFilms();
    const stateWithFavs = Object.assign(state, {favorites: films})
    expect(filmsProcess.reducer(Object.assign(stateWithFavs, {favorites: films}), {type: changeFavoriteAction.fulfilled.type, payload: films}))
      .toEqual(stateWithFavs);
  });
  it('should do nothing if rejected', () => {
    const films = generateMockFilms();
    const stateWithFavs = Object.assign(state, {favorites: films})
    expect(filmsProcess.reducer(stateWithFavs, { type: changeFavoriteAction.rejected.type }))
      .toEqual(stateWithFavs);
  });

  it('should set isDataLoaded=true if pending', () => {
    expect(filmsProcess.reducer(state, {type: loadFilmCommentsAction.pending.type}))
      .toEqual(Object.assign(state, {isDataLoaded: true}));
  });
  it('should update filmComments if fulfilled', () => {
    const comments = generateMockComment(faker.datatype.number(999999));
    expect(filmsProcess.reducer(state, {type: loadFilmCommentsAction.fulfilled.type, payload: comments}))
      .toEqual(Object.assign(state, {filmComments: comments}));
  });
  it('should update do nothing if rejected', () => {
    expect(filmsProcess.reducer(state, { type: loadFilmCommentsAction.rejected.type }))
      .toEqual(state);
  });

  it('should set isDataLoaded=true if pending', () => {
    expect(filmsProcess.reducer(state, {type: sendFilmCommentAction.pending.type}))
      .toEqual(Object.assign(state, {isDataLoaded: true}));
  });
  it('should update filmComments if fulfilled', () => {
    const comments = [generateMockComment(1), generateMockComment(2)]
    expect(filmsProcess.reducer(state, {type: sendFilmCommentAction.fulfilled.type, payload: comments}))
      .toEqual(Object.assign(state, {filmComments: comments}));
  });
  it('should do nothing if rejected', () => {
    expect(filmsProcess.reducer(state, { type: sendFilmCommentAction.rejected.type }))
      .toEqual(state);
  });
})

function generateMockFilm(): TFilm{
  const randomMan = () => `${(faker.name.firstName())} ${(faker.name.lastName())}`
  return {
    id: faker.datatype.number(9999999),
    name: faker.name.title(),
    posterImage: faker.image.imageUrl(),
    previewImage: faker.image.imageUrl(),
    backgroundImage: faker.image.imageUrl(),
    backgroundColor: faker.internet.color(),
    videoLink: faker.internet.url(),
    previewVideoLink: faker.internet.url(),
    description: faker.lorem.sentence(),
    rating: faker.datatype.number(10),
    scoresCount: faker.datatype.number(10000),
    director: randomMan(),
    starring: faker.datatype.array(10).map(() => randomMan()),
    runTime: faker.datatype.number(180),
    genre: faker.random.word(),
    released: faker.date.past(100).getFullYear(),
    isFavorite: faker.datatype.boolean()

  }
}

function generateMockFilms(){
  return faker.datatype.array(30).map(() => generateMockFilm());
}

const generateMockComment = (id: number): TComment => ({
  id: id ?? faker.datatype.number(999999999),
  comment: faker.lorem.sentences(faker.datatype.number(5)),
  date: faker.date.past().toString(),
  rating: faker.datatype.number(10),
  user: {
    id: id ?? faker.datatype.number(14000000000),
    name: `${(faker.name.firstName())} ${(faker.name.lastName())}`,
  },
});

