import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';

import HistoryRouter from "./components/history-router/history-router";
import App from "./components/app/app";
import {AppRoute, AuthorizationStatus} from "./consts";

const mockStore = configureMockStore();

const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.Auth},
  FILMS: {
    allFilmsList: [],
    promoFilm: null,
    error: null,
    isDataLoaded: false,
    selectedFilm: null,
    similarFilms: [],
    filmComments: [],
    favorites: []
  }
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <App/>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "WelcomeScreen" when user navigate to "/"', () => {
    history.push(AppRoute.Main);

    render(fakeApp);
    expect(screen.getByText('Catalog')).toBeInTheDocument();
  });
});