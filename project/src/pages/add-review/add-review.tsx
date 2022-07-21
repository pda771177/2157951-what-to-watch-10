import Logo from '../../components/logo/logo';
import UserBlock from '../../components/user-block/user-block';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import {useParams} from 'react-router-dom';
import {TFilm} from '../../types/types';
import films from '../../mocks/films';
import React, {SyntheticEvent} from 'react';
import StarRating from '../../components/star-rating/star-rating';
import ReviewForm from "../../components/review-form/review-form";

type AddReviewProps = {
  film?: TFilm
};

function AddReview({film}: AddReviewProps): JSX.Element {
  const {id} = useParams();
  const [filmFromParams] = films.filter((item) => item.id.toString() === id?.replace(':', ''));
  const filmToReview = film ? film : filmFromParams;

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={filmToReview.backgroundImage} alt={filmToReview.name}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <Logo/>
          <Breadcrumbs pathItems={breadcrumbsItems}/>
          <UserBlock/>
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={filmToReview.posterImage} alt={filmToReview.name} width="218" height="327"/>
        </div>
      </div>
      <ReviewForm film={filmToReview}/>
    </section>
  );
}

AddReview.defaultProps = {};

export default AddReview;

const breadcrumbsItems = [
  {
    title: 'Home',
    path: '/'
  },
  {
    title: 'Add review',
    path: ''
  }
];
