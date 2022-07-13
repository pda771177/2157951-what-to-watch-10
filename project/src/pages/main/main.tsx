import React from 'react';
import SmallFilmsList from '../../components/small-films-list/small-films-list';
import FilmCard from '../../components/film-card/film-card';
import Logo from '../../components/logo/logo';
import Copyright from '../../components/copyright/copyright';

type WelcomeScreenProps = {
  title: string,
  genre: string,
  year: number
};

function Main({title, genre, year}: WelcomeScreenProps): JSX.Element {

  const filmCards = [
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

  return (
    <React.Fragment>
      <FilmCard title={title} genre={genre} year={year} imgBackgroundSrc="img/bg-the-grand-budapest-hotel.jpg" imgPosterSrc="img/the-grand-budapest-hotel-poster.jpg"/>
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <ul className="catalog__genres-list">
            <li className="catalog__genres-item catalog__genres-item--active">
              <a href="#" className="catalog__genres-link">All genres</a>
            </li>
            <li className="catalog__genres-item">
              <a href="#" className="catalog__genres-link">Comedies</a>
            </li>
            <li className="catalog__genres-item">
              <a href="#" className="catalog__genres-link">Crime</a>
            </li>
            <li className="catalog__genres-item">
              <a href="#" className="catalog__genres-link">Documentary</a>
            </li>
            <li className="catalog__genres-item">
              <a href="#" className="catalog__genres-link">Dramas</a>
            </li>
            <li className="catalog__genres-item">
              <a href="#" className="catalog__genres-link">Horror</a>
            </li>
            <li className="catalog__genres-item">
              <a href="#" className="catalog__genres-link">Kids & Family</a>
            </li>
            <li className="catalog__genres-item">
              <a href="#" className="catalog__genres-link">Romance</a>
            </li>
            <li className="catalog__genres-item">
              <a href="#" className="catalog__genres-link">Sci-Fi</a>
            </li>
            <li className="catalog__genres-item">
              <a href="#" className="catalog__genres-link">Thrillers</a>
            </li>
          </ul>

          <div className="catalog__films-list">

          </div>

          <SmallFilmsList filmsList={filmCards}/>

          <div className="catalog__more">
            <button className="catalog__button" type="button">Show more</button>
          </div>
        </section>

        <footer className="page-footer">
          <Logo light/>

          <Copyright/>
        </footer>
      </div>
    </React.Fragment>);
}

export default Main;
