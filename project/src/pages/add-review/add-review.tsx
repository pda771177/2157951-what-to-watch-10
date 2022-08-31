import Logo from '../../components/logo/logo';
import UserBlock from '../../components/user-block/user-block';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import {useParams} from 'react-router-dom';
import React, {useEffect} from 'react';
import ReviewForm from '../../components/review-form/review-form';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {loadFilmAction} from '../../store/api-actions';
import Loading from '../loading/loading';
import {getLoadingStatus, getSelectedFilm} from '../../store/films-process/selectors';
import {AppRoute, UNKNOWN_FILM} from '../../consts';
import {redirectToRoute} from '../../store/action';

function AddReview(): JSX.Element {
  const {id} = useParams();
  const filmId = id ? id.replace(':', '') : '';
  const selectedFilm = useAppSelector(getSelectedFilm);
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(getLoadingStatus);

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

  useEffect(() => {
    if (!selectedFilm || selectedFilm?.id.toString() !== filmId){
      (async () => {
        await dispatch(loadFilmAction(filmId));
        if (selectedFilm?.id === UNKNOWN_FILM.id){
          dispatch(redirectToRoute(AppRoute.Unknown));
        }
      })();
    }
  }, [dispatch, id]);
  if (isLoading || !selectedFilm || selectedFilm?.id === UNKNOWN_FILM.id) {
    return (
      <Loading/>
    );
  }
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

export default AddReview;
