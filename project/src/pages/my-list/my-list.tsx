import Logo from '../../components/logo/logo';
import UserBlock from '../../components/user-block/user-block';
import SmallFilmsList from '../../components/small-films-list/small-films-list';
import Copyright from '../../components/copyright/copyright';
import {TFilm} from '../../types/types';

type MyListProps = { films: TFilm[] };

function MyList({films}: MyListProps): JSX.Element {

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo/>
        <h1 className="page-title user-page__title">My list <span className="user-page__film-count">{films.length}</span></h1>
        <UserBlock />
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <SmallFilmsList films={films}/>
      </section>

      <footer className="page-footer">
        <Logo light/>
        <Copyright/>
      </footer>
    </div>
  );
}

MyList.defaultProps = {myFilms: []};

export default MyList;
