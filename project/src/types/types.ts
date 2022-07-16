export type TFilmCard = {
  imgSrc: string,
  imgWidth?: string,
  imgHeight?: string,
  title: string
};

export type TFilmsList = {
  filmsList: TFilmCard[]
};

export type TTitleGenreYear = {
  title: string,
  genre: string,
  year?: number
}
