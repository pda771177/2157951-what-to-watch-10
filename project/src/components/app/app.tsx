import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Main from '../../pages/main/main';
import Film from '../../pages/film/film';
import Player from '../../pages/player/player';
import AddReview from '../../pages/add-review/add-review';
import PrivateRoute from '../private-route/private-route';
import {AppRoute} from '../../consts';
import MyList from '../../pages/my-list/my-list';
import NotFound404 from '../../pages/404-not-found/404-not-found';
import {useAppSelector} from '../../hooks';
import Loading from '../../pages/loading/loading';
import HistoryRouter from '../history-router/history-router';
import browserHistory from '../../browser-history';
import SignIn from '../../pages/sign-in/sign-in';
import {getAllFilms, getLoadingStatus} from '../../store/films-process/selectors';
import SignInRoute from '../sign-in-route/sign-in-route';

function App(): JSX.Element {
  const isDataLoading = useAppSelector(getLoadingStatus);
  const films = useAppSelector(getAllFilms);

  if (isDataLoading) {
    return (
      <Loading/>
    );
  }
  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path={AppRoute.Main}>
          <Route index element={<Main/>}/>
          <Route path={AppRoute.SignIn} element={<SignInRoute><SignIn/></SignInRoute>}/>
          <Route path={AppRoute.MyList} element={<PrivateRoute><MyList/></PrivateRoute>}/>
          <Route path={AppRoute.Film} element={<Film/>}/>
          <Route path={AppRoute.AddReview} element={<PrivateRoute><AddReview/></PrivateRoute>}/>
          <Route path={AppRoute.Player} element={<PrivateRoute><Player/></PrivateRoute>}/>
        </Route>
        <Route path='*' element={<NotFound404 films={films.slice(0, 4)}/>}/>
      </Routes>
    </HistoryRouter>
  );
}

export default App;
