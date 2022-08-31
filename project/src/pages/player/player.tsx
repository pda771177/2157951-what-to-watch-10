import {useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks';
import Loading from '../loading/loading';
import React, {SyntheticEvent, useEffect, useRef, useState} from 'react';
import {AppRoute, UNKNOWN_FILM} from '../../consts';
import {loadFilmAction} from '../../store/api-actions';
import {getLoadingStatus, getSelectedFilm} from '../../store/films-process/selectors';
import {redirectToRoute} from '../../store/action';


function Player(): JSX.Element {
  const dispatch = useAppDispatch();
  const video = useRef<HTMLVideoElement>(null);
  const {id} = useParams();
  const filmId = id ? id.replace(':', '') : '';
  const selectedFilm = useAppSelector(getSelectedFilm);
  const isLoading = useAppSelector(getLoadingStatus);
  const [isPlaying, setIsPlaying] = useState(false);
  const [watchProgressPercent, setWatchProgressProcent] = useState(0);

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
  const playClickListener = function (event: SyntheticEvent) {
    event.preventDefault();
    setIsPlaying(!isPlaying);
    isPlaying ? video.current?.pause() : video.current?.play();
  };

  const exitClickListener = (event: React.SyntheticEvent) => {
    event.preventDefault();
    dispatch(redirectToRoute(AppRoute.Main));
  };

  const getTimeFromMins = (mins: number): string => `${(Math.trunc(mins / 60))}:${(mins % 60)}:00`;

  const timeUpdateListener = () => {
    if (video.current) {
      const {currentTime, duration} = video.current;
      setWatchProgressProcent((currentTime / duration) * 100);
    }
  };

  return (
    <div className="player">

      <video className="player__video" src={selectedFilm.videoLink} ref={video} poster={selectedFilm.previewImage} onTimeUpdate={timeUpdateListener} autoPlay={isPlaying}/>

      <button type="button" className="player__exit" onClick={exitClickListener}>Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={watchProgressPercent} max="100"/>
            <div className="player__toggler" style={{left: `${watchProgressPercent}%`}}>Toggler</div>
          </div>
          <div className="player__time-value">{getTimeFromMins(selectedFilm.runTime)}</div>
        </div>

        <div className="player__controls-row">
          <button onClick={playClickListener} type="button" className="player__play">
            {isPlaying ? (
              <svg viewBox="0 0 14 21" width="14" height="21">
                <use xlinkHref="#pause"/>
              </svg>
            ) : (
              <svg viewBox="0 0 19 19" width="19" height="19">
                <use xlinkHref="#play-s"/>
              </svg>
            )}
            <span>Play</span>
          </button>
          <div className="player__name">{selectedFilm.name}</div>

          <button onClick={() => {video.current?.requestFullscreen();}} type="button" className="player__full-screen">
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"/>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Player;
