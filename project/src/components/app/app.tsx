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

type AppProps = { title: string, genre: string, year: number }

function App({title, genre, year}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element={<Main filmId="1" title={title} genre={genre} year={year} filmsList={allFilms}/>}/>
          <Route path='login' element={<SignIn/>}/>
          <Route path='mylist' element={<PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}><MyList filmsList={myFilms}/></PrivateRoute>}/>
          <Route path='films/:id' element={<Film title={title} genre={genre} year={year}/>}/>
          <Route path='films/:id/review' element={<AddReview title={title} imgBackgroundSrc="img/bg-the-grand-budapest-hotel.jpg" imgPosterSrc="img/the-grand-budapest-hotel-poster.jpg"/>}/>
          <Route path='player/:id' element={<Player videoSrc='#'/>}/>
        </Route>
        <Route path='*' element={<NotFound404 filmsList={myFilms.slice(0, 4)}/>}/>
      </Routes>
    </BrowserRouter>

  );
}

export default App;

const allFilms = [
  {title: 'Fantastic Beasts: The Crimes of Grindelwald', imgSrc: 'img/fantastic-beasts-the-crimes-of-grindelwald.jpg'},
  {title: 'Bohemian Rhapsody', imgSrc: 'img/bohemian-rhapsody.jpg'},
  {title: 'Macbeth', imgSrc: 'img/macbeth.jpg'},
  {title: 'Aviator', imgSrc: 'img/aviator.jpg'},
  {title: 'We need to talk about Kevin', imgSrc: 'img/we-need-to-talk-about-kevin.jpg'},
  {title: 'What We Do in the Shadows', imgSrc: 'img/what-we-do-in-the-shadows.jpg'},
  {title: 'Revenant', imgSrc: 'img/revenant.jpg'},
  {title: 'Johnny English', imgSrc: 'img/johnny-english.jpg'},
  {title: 'Shutter Island', imgSrc: 'img/shutter-island.jpg'},
  {title: 'Pulp Fiction', imgSrc: 'img/pulp-fiction.jpg'},
  {title: 'No Country for Old Men', imgSrc: 'img/no-country-for-old-men.jpg'},
  {title: 'Snatch', imgSrc: 'img/snatch.jpg'},
  {title: 'Moonrise Kingdom', imgSrc: 'img/moonrise-kingdom.jpg'},
  {title: 'Seven Years in Tibet', imgSrc: 'img/seven-years-in-tibet.jpg'},
  {title: 'Midnight Special', imgSrc: 'img/midnight-special.jpg'},
  {title: 'War of the Worlds', imgSrc: 'img/war-of-the-worlds.jpg'},
  {title: 'Dardjeeling Limited', imgSrc: 'img/dardjeeling-limited.jpg'},
  {title: 'Orlando', imgSrc: 'img/orlando.jpg'},
  {title: 'Mindhunter', imgSrc: 'img/mindhunter.jpg'},
  {title: 'Midnight Special', imgSrc: 'img/midnight-special.jpg'}
];
const myFilms = allFilms.slice(0, 9);
