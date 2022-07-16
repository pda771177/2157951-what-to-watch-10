import React from 'react';
import {TFilmsList} from '../../types/types';
import Logo from '../../components/logo/logo';
import Copyright from '../../components/copyright/copyright';
import UserBlock from '../../components/user-block/user-block';
import SmallFilmsList from '../../components/small-films-list/small-films-list';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';

type NotFound404Props = TFilmsList & {text?: string};

function NotFound404({text, filmsList}: NotFound404Props): JSX.Element {

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo/>
        <Breadcrumbs pathItems={[{title: 'Home', path: '/'}, {title: '404', path: ''}]}/>
        <UserBlock/>
      </header>
      <div className="page-content">
        <section className="not-found-404-page__content">
          <div style={{float: 'left', marginRight: '1em'}}><Logo letters={['4', '0', '4']}/></div>
          <h1 style={{lineHeight: '0.5em', marginBottom: '3em'}} className="logo__letter logo__letter--2">{text}</h1>
          <img src="img/rbw.jpg" alt="404"/>
        </section>
        <section className="catalog">
          <h2 className="catalog__title">Trending Now</h2>
          <SmallFilmsList filmsList={filmsList}/>
        </section>

        <footer className="page-footer">
          <Logo light/>
          <Copyright/>
        </footer>
      </div>

    </div>
  );
}

NotFound404.defaultProps = {text: 'Page not found'};

export default NotFound404;
