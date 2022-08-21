import Logo from '../../components/logo/logo';
import UserBlock from '../../components/user-block/user-block';
import SmallFilmsList from '../../components/small-films-list/small-films-list';
import Copyright from '../../components/copyright/copyright';
import {useAppSelector} from '../../hooks';
import {store} from "../../store";

function MyList(): JSX.Element {
  const {favorites} = useAppSelector((state) => state.FILMS);

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo/>
        <h1 className="page-title user-page__title">My list <span className="user-page__film-count">{favorites.length}</span></h1>
        <UserBlock />
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <SmallFilmsList films={favorites}/>
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
