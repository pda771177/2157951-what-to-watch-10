import Logo from '../../components/logo/logo';
import UserBlock from '../../components/user-block/user-block';
import SmallFilmsList from '../../components/small-films-list/small-films-list';
import Copyright from '../../components/copyright/copyright';

type SmallFilmCardProps = {
  imgSrc: string,
  imgWidth?: string,
  imgHeight?: string,
  title: string
};

type MyListProps = {
  myFilms: SmallFilmCardProps[]
};

function MyList({myFilms}: MyListProps): JSX.Element {

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo/>

        <h1 className="page-title user-page__title">My list <span className="user-page__film-count">{myFilms.length}</span></h1>
        <UserBlock imgAvatarSrc='img/avatar.jpg'/>
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <SmallFilmsList filmsList={myFilms}/>
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
