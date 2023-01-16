import './MoviesCard.css';

export function MoviesCard({ isSaved, savedMovies = false, card }) {
  return (
    <li className="moviesCard">
      <img className="moviesCard__img" src={ card.img } alt={ card.nameRUS }></img>
      <p className="moviesCard__name">{ card.nameRUS }
      <button
          className={`
            moviesCard__icon
            ${savedMovies ? 'moviesCard__icon-delete' 
                            : isSaved 
                            ? 'moviesCard__icon-liked moviesCard__icon-liked_saved'
                            : 'moviesCard__icon-liked'}
          `}
          type="button"
        ></button>
      </p>
      <div className="moviesCard__time">{ card.time }</div>
      <div className="moviesCard__icon-wrap">
      </div>
    </li>
  );
};
