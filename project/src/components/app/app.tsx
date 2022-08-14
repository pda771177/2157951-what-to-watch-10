import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Main from '../../pages/main/main';
import Film from '../../pages/film/film';
import Player from '../../pages/player/player';
import AddReview from '../../pages/add-review/add-review';
import SignIn from '../../pages/sign-in/sign-in';
import PrivateRoute from '../private-route/private-route';
import {AppRoute} from '../../consts';
import MyList from '../../pages/my-list/my-list';
import NotFound404 from '../../pages/404-not-found/404-not-found';
import {useAppSelector} from '../../hooks';
import Loading from '../../pages/loading/loading';
import HistoryRouter from '../history-router/history-router';
import browserHistory from '../../browser-history';

function App(): JSX.Element {
  const {isDataLoaded, allFilmsList, authorizationStatus} = useAppSelector((state) => state);

  if (isDataLoaded) {
    return (
      <Loading/>
    );
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path='/'>
          <Route index element={<Main/>}/>
          <Route path={AppRoute.SignIn} element={<SignIn/>}/>
          <Route path={AppRoute.MyList} element={<PrivateRoute authorizationStatus={authorizationStatus}><MyList films={allFilmsList.slice(0, 9)}/></PrivateRoute>}/>
          <Route path={AppRoute.Film} element={<Film/>}/>
          <Route path={AppRoute.AddReview} element={<AddReview/>}/>
          <Route path={AppRoute.Player} element={<Player/>}/>
        </Route>
        <Route path='*' element={<NotFound404 films={allFilmsList.slice(0, 4)}/>}/>
      </Routes>
    </HistoryRouter>
  );
}

export default App;
