import {useParams, useNavigate} from 'react-router-dom';
import {TFilm} from '../../types/types';
import {useAppSelector} from '../../hooks';
import {store} from '../../store';

import LoadingScreen from '../loading/loading';
import React from 'react';
import {AppRoute} from '../../consts';
import {loadFilmAction} from '../../store/api-actions';

function Player(): JSX.Element {
  const {id} = useParams();
  const navigate = useNavigate();
  const {allFilmsList, selectedFilm} = useAppSelector((state) => state.FILMS);

  const unknownFilm = !id ? false : !allFilmsList.map((film: TFilm) => film.id.toString()).includes(id.toString());

  if(unknownFilm) {
    navigate(AppRoute.Unknown);
  }

  if (id && (!selectedFilm || selectedFilm.id.toString() !== id)) {
    store.dispatch(loadFilmAction(id));
    return (
      <LoadingScreen/>
    );
  }

  const filmToPlay: TFilm = selectedFilm ? selectedFilm : allFilmsList.filter((film: TFilm) => id === film.id.toString())[0];

  const getTimeFromMins = (mins: number): string => `${(Math.trunc(mins / 60))}:${(mins % 60)}:00`;
  return (
    <div className="player">
      <div className="visually-hidden">{id}</div>
      <video src={filmToPlay.videoLink} className="player__video" poster={filmToPlay.previewImage}></video>

      <button type="button" className="player__exit" onClick={() => navigate('/')}>Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value="30" max="100"></progress>
            <div className="player__toggler" style={{left: '0%'}}>Toggler</div>
          </div>
          <div className="player__time-value">{getTimeFromMins(filmToPlay.runTime)}</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play">
            <svg viewBox="0 0 19 19" width="19" height="19">
              <use xlinkHref="#play-s"></use>
            </svg>
            <span>Play</span>
          </button>
          <div className="player__name">{filmToPlay.name}</div>

          <button type="button" className="player__full-screen">
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}

Player.defaultProps = {};

export default Player;
