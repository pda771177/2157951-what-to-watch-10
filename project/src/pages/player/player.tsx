import {useNavigate, useParams} from 'react-router-dom';
import {TFilm} from '../../types/types';
import {useAppSelector} from '../../hooks';
import {store} from '../../store';
import LoadingScreen from '../loading/loading';
import React, {SyntheticEvent, useRef, useState} from 'react';
import {AppRoute} from '../../consts';
import {loadFilmAction} from '../../store/api-actions';
import {getAllFilms, getSelectedFilm} from '../../store/films-process/selectors';


function Player(): JSX.Element {
  const {id} = useParams();
  const navigate = useNavigate();
  const allFilmsList = useAppSelector(getAllFilms);
  const selectedFilm = useAppSelector(getSelectedFilm);

  const unknownFilm = !id ? false : !allFilmsList.map((film: TFilm) => film.id.toString()).includes(id.toString());

  if (unknownFilm) {
    navigate(AppRoute.Unknown);
  }

  const video = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const playClickListener = function (event: SyntheticEvent) {
    event.preventDefault();
    setIsPlaying(!isPlaying);
    isPlaying ? video.current?.pause() : video.current?.play();
  };

  const exitClickListener = (event: React.SyntheticEvent) => {
    event.preventDefault();
    navigate(AppRoute.Main);
  };

  const [watchProgressProcent, setWatchProgressProcent] = useState(0);

  if (id && (!selectedFilm || selectedFilm.id.toString() !== id)) {
    store.dispatch(loadFilmAction(id));
    return (
      <LoadingScreen/>
    );
  }

  const filmToPlay: TFilm = selectedFilm ? selectedFilm : allFilmsList.filter((film: TFilm) => id === film.id.toString())[0];

  const getTimeFromMins = (mins: number): string => `${(Math.trunc(mins / 60))}:${(mins % 60)}:00`;

  const timeUpdateListener = () => {
    if (video.current) {
      const {currentTime, duration} = video.current;
      setWatchProgressProcent((currentTime / duration) * 100);
    }
  };

  return (
    <div className="player">

      <video className="player__video" src={filmToPlay.videoLink} ref={video} poster={filmToPlay.previewImage} onTimeUpdate={timeUpdateListener} autoPlay={isPlaying}></video>

      <button type="button" className="player__exit" onClick={exitClickListener}>Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={watchProgressProcent} max="100"></progress>
            <div className="player__toggler" style={{left: `${watchProgressProcent}%`}}>Toggler</div>
          </div>
          <div className="player__time-value">{getTimeFromMins(filmToPlay.runTime)}</div>
        </div>

        <div className="player__controls-row">
          <button onClick={playClickListener} type="button" className="player__play">
            {isPlaying ? (
              <svg viewBox="0 0 14 21" width="14" height="21">
                <use xlinkHref="#pause"></use>
              </svg>
            ) : (
              <svg viewBox="0 0 19 19" width="19" height="19">
                <use xlinkHref="#play-s"></use>
              </svg>
            )}
            <span>Play</span>
          </button>
          <div className="player__name">{filmToPlay.name}</div>

          <button onClick={() => {video.current?.requestFullscreen();}} type="button" className="player__full-screen">
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
