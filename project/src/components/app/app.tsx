import Main from '../../pages/main/main';
//import Film from '../../pages/film/film';
//import MyList from '../../pages/my-list/my-list';
//import Player from '../../pages/player/player';
//import AddReview from '../../pages/add-review/add-review';
//import SignIn from '../../pages/sign-in/sign-in';

type AppProps = {title: string, genre: string, year: number}

function App({title, genre, year}: AppProps): JSX.Element {
  return (
    <Main title={title} genre={genre} year={year}/>
  );
}

export default App;
/*

<AddReview title={title} imgBackgroundSrc="img/bg-the-grand-budapest-hotel.jpg" imgPosterSrc="img/the-grand-budapest-hotel-poster.jpg"/>
<Player videoSrc='#'/>
<SignIn/>
<MyList myFilms={myFilms}/>
<Film title={title} genre={genre} year={year} />
* */

//const myFilms = [{title: 'Fantastic Beasts: The Crimes of Grindelwald', imgSrc: 'img/fantastic-beasts-the-crimes-of-grindelwald.jpg'}, {title: 'Bohemian Rhapsody', imgSrc: 'img/bohemian-rhapsody.jpg'}, {title: 'Macbeth', imgSrc: 'img/macbeth.jpg'}, {title: 'Aviator', imgSrc: 'img/aviator.jpg'}, {title: 'We need to talk about Kevin', imgSrc: 'img/we-need-to-talk-about-kevin.jpg'}, {title: 'What We Do in the Shadows', imgSrc: 'img/what-we-do-in-the-shadows.jpg'}, {title: 'Revenant', imgSrc: 'img/revenant.jpg'}, {title: 'Johnny English', imgSrc: 'img/johnny-english.jpg'}, {title: 'Shutter Island', imgSrc: 'img/shutter-island.jpg'}];
