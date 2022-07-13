type FilmRatingProps = {
  ratingScore: number,
  voted: number
};

function FilmRating({ratingScore, voted}: FilmRatingProps): JSX.Element {

  const rating = new Rating(ratingScore);
  return (
    <div className="film-rating">
      <div className="film-rating__score">{rating.numRating}</div>
      <p className="film-rating__meta">
        <span className="film-rating__level">{rating.textRating}</span>
        <span className="film-rating__count">{`${voted} ratings`}</span>
      </p>
    </div>
  );
}

FilmRating.defaultProps = {};

export default FilmRating;

class Rating {
  get textRating(): string {
    return this._textRating;
  }

  get numRating(): string {
    return this._numRating.toString().replace('.', ',');
  }

  private readonly _textRating: string;
  private readonly _numRating: number;
  private scores = {
    'Bad': new ScoreDiapazon(0, 3),
    'Normal': new ScoreDiapazon(3, 5),
    'Good': new ScoreDiapazon(5, 8),
    'Very good': new ScoreDiapazon(8, 10),
    'Awesome': new ScoreDiapazon(10, 10.01)
  };

  constructor(score: number) {
    this._numRating = score;
    this._textRating = this.getTextRating();
  }

  public getTextRating(): string {
    try {
      const [[textRating]] = (Object.entries(this.scores).filter(([text, diapazon]) => diapazon.includes(this._numRating)));
      return textRating;
    } catch (e) {
      return 'Unknown';
    }
  }
}

class ScoreDiapazon {
  private readonly from: number;
  private readonly to: number;

  constructor(from: number, to: number) {
    this.from = from;
    this.to = to;
  }

  public includes(num: number): boolean {
    return this.from <= num && num < this.to;
  }
}
