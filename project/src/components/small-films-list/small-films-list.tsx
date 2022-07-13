import SmallFilmCard from '../small-film-card/small-film-card';

type SmallFilmCardProps = {
  imgSrc: string,
  imgWidth?: string,
  imgHeight?: string,
  title: string
};

type SmallFilmsListProps = {
  filmsList: SmallFilmCardProps[]
};

function SmallFilmsList({filmsList}: SmallFilmsListProps): JSX.Element {
  const out = [];
  const result: JSX.Element[] = [];

  const generateKey = (prefix?: string): string => Math.random().toString(36).replace('0.', prefix ?? '');

  filmsList.forEach(({title, imgSrc, imgHeight, imgWidth}) => {
    try {
      result.push(<SmallFilmCard title={title} imgSrc={imgSrc} imgWidth={imgWidth} imgHeight={imgHeight} key={generateKey(title)}/>);
    } catch (error) {
      out.push({title, imgSrc, imgHeight, imgWidth, error});
    }
  });

  return (
    <div className='catalog__films-list'>
      {result}
    </div>
  );
}

export default SmallFilmsList;
