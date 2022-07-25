import React from 'react';
import {TFilm} from '../../types/types';

type VideoplayerProps = {
  film: TFilm,
  width: number,
  height: number,
  autoPlay: boolean,
  mute: boolean,
  delay?: number
};

function Videoplayer({film, width, height, autoPlay, delay = 0, mute}: VideoplayerProps): JSX.Element {
  const [isLoading, setIsLoading] = React.useState(true);

  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  React.useEffect(() => {
    if (videoRef.current === null && isLoading) {
      return;
    }

    videoRef.current?.addEventListener('loadeddata', () => setIsLoading(false));

    setTimeout(() => {
      videoRef.current?.play();
    }, delay);

    videoRef.current?.pause();
  }, [isLoading]);

  return (
    <video src={film.videoLink} ref={videoRef} poster={film.previewImage} height={height} width={width} autoPlay={autoPlay} muted={mute} />
  );
}

Videoplayer.defaultProps = {delay: 0, muted: true};

export default Videoplayer;
