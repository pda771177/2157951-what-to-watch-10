import React from 'react';
import {TComment, TFilm} from '../../types/types';
import Overview from '../overview/overview';
import Details from '../details/details';
import Reviews from '../reviews/reviews';

type FilmNavigationProps = {
  film: TFilm,
  comments: TComment[]
};

function FilmNavigation({film, comments}: FilmNavigationProps): JSX.Element {
  const [selectedTab, setSelectedTab] = React.useState('Overview');
  const tabs: string[] = ['Overview', 'Details', 'Reviews'];

  const tabsContent: {[index: string]:JSX.Element} = {
    Overview: <Overview film={film}/>,
    Details: <Details film={film}/>,
    Reviews: <Reviews comments={comments}/>
  };

  const result: JSX.Element[] = tabs.map((tab) => {
    const className = tab === selectedTab ? 'film-nav__item film-nav__item--active' : 'film-nav__item';
    return (
      <li key={tab} className={className}>
        <div onClick={()=>setSelectedTab(tab)} className="film-nav__link">{tab}</div>
      </li>
    );
  });

  return (
    <>
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          {result}
        </ul>
      </nav>
      {tabsContent[selectedTab]}
    </>
  );
}
FilmNavigation.defaultProps = {};

export default FilmNavigation;
