import Logo from '../../components/logo/logo';
import UserBlock from '../../components/user-block/user-block';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import {useParams} from 'react-router-dom';
import React from 'react';
import ReviewForm from '../../components/review-form/review-form';
import {useAppSelector} from '../../hooks';
import {store} from '../../store';
import {loadFilmAction} from '../../store/api-actions';
import LoadingScreen from '../loading/loading';
import {getSelectedFilm} from '../../store/films-process/selectors';
import {AppRoute} from '../../consts';

function AddReview(): JSX.Element {
  const {id} = useParams();
  const selectedFilm = useAppSelector(getSelectedFilm);
  const filmId = id ? id.replace(':', '') : '';

  if (!selectedFilm || selectedFilm.id.toString() !== filmId) {
    store.dispatch(loadFilmAction(filmId));
    return (
      <LoadingScreen/>
    );
  }

  const breadcrumbsItems = [
    {
      title: 'Home',
      path: AppRoute.Main
    },
    {
      title: 'Film',
      path: AppRoute.Film.replace(':id', filmId)
    },
    {
      title: 'Add review',
      path: ''
    }
  ];

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={selectedFilm.backgroundImage} alt={selectedFilm.name}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <Logo/>
          <Breadcrumbs pathItems={breadcrumbsItems}/>
          <UserBlock/>
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={selectedFilm.posterImage} alt={selectedFilm.name} width="218" height="327"/>
        </div>
      </div>
      <ReviewForm film={selectedFilm}/>
    </section>
  );
}

AddReview.defaultProps = {};

export default AddReview;
