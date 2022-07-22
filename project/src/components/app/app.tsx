import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Main from '../../pages/main/main';
import Film from '../../pages/film/film';
import Player from '../../pages/player/player';
import AddReview from '../../pages/add-review/add-review';
import SignIn from '../../pages/sign-in/sign-in';
import PrivateRoute from '../private-route/private-route';
import {AuthorizationStatus} from '../../consts';
import MyList from '../../pages/my-list/my-list';
import NotFound404 from '../../pages/404-not-found/404-not-found';
import {TFilm} from '../../types/types';

type AppProps = { promo: TFilm, films: TFilm[] }

function App({promo, films}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element={<Main promo={promo} filmsList={films} />}/>
          <Route path='login' element={<SignIn/>}/>
          <Route path='mylist' element={<PrivateRoute authorizationStatus={AuthorizationStatus.Auth}><MyList films={films.slice(0, 9)}/></PrivateRoute>}/>
          <Route path='films/:id' element={<Film />}/>
          <Route path='films/:id/review' element={<AddReview />}/>
          <Route path='films/review' element={<AddReview film={promo}/>}/>
          <Route path='player/:id' element={<Player />}/>
          <Route path='player' element={<Player film={promo}/>}/>
        </Route>
        <Route path='*' element={<NotFound404 films={films.slice(0, 4)}/>}/>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
