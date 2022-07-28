import {useParams, useNavigate} from 'react-router-dom';
import {TFilm} from '../../types/types';
import {useAppSelector} from '../../hooks';

type PlayerProps = {
  film?: TFilm
};

function Player({film}: PlayerProps): JSX.Element {
  const {id} = useParams();
  const allFilms = useAppSelector((state) => state.allFilmsList);
  const [filmFromParams] = allFilms.filter((item) => item.id.toString() === id?.replace(':', ''));
  const filmToPlay = film ? film : filmFromParams;
  const getTimeFromMins = (mins: number): string => `${(Math.trunc(mins / 60))}:${(mins % 60)}:00`;
  const navigate = useNavigate();
  return (
    <div className="player">
      <div className="visually-hidden">{id}</div>
      <video src={filmToPlay.videoLink} className="player__video" poster={filmToPlay.previewImage}></video>

      <button type="button" className="player__exit" onClick={()=>navigate('/')}>Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value="30" max="100"></progress>
            <div className="player__toggler" style={{left: '30%'}}>Toggler</div>
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
