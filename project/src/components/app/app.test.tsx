import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import App from "./app";
import {AppRoute, AuthorizationStatus} from "../../consts";
import browserHistory from "../../browser-history";
import {Route, Routes} from "react-router-dom";
import Main from "../../pages/main/main";
import SignInRoute from "../sign-in-route/sign-in-route";
import SignIn from "../../pages/sign-in/sign-in";
import PrivateRoute from "../private-route/private-route";
import MyList from "../../pages/my-list/my-list";
import Film from "../../pages/film/film";
import AddReview from "../../pages/add-review/add-review";
import Player from "../../pages/player/player";
import NotFound404 from "../../pages/not-found-404/not-found-404";
import HistoryRouter from "../history-router/history-router";
import React from "react";

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
    <HistoryRouter history={history}>
      <Routes>
        <Route path={AppRoute.Main}>
          <Route index element={<Main/>}/>
          <Route path={AppRoute.SignIn} element={<SignInRoute><SignIn/></SignInRoute>}/>
          <Route path={AppRoute.MyList} element={<PrivateRoute><MyList/></PrivateRoute>}/>
          <Route path={AppRoute.Film} element={<Film/>}/>
          <Route path={AppRoute.AddReview} element={<PrivateRoute><AddReview/></PrivateRoute>}/>
          <Route path={AppRoute.Player} element={<PrivateRoute><Player/></PrivateRoute>}/>
        </Route>
        <Route path='*' element={<NotFound404 films={[]}/>}/>
      </Routes>
    </HistoryRouter>
  </Provider>

);

describe('Application Routing', () => {
  it('should render "WelcomeScreen" when user navigate to "/"', () => {
    history.push(AppRoute.Main);

    render(fakeApp);
    expect(screen.getByText('Catalog')).toBeInTheDocument();
  });

  it('should render "NotFoundScreen" when user navigate to non-existent route', () => {
    history.push('/404');

    render(fakeApp);

    expect(screen.getByText('Page not found')).toBeInTheDocument();
  });
});