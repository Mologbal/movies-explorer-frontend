import './MoviesCard.css';
import {IMAGES_URL} from '../../constants';
import {useState} from 'react';
import {mainApi} from '../../utils/MainApi';
import {getTime} from '../../utils';

export const MoviesCard = ({
                             card,
                             isSavedMovies = false,
                             isSaved,
                             handleRemove,
                             getDbId,
                          }) => {
  const [isSavedCard, setIsSavedCard] = useState(isSaved)

  function handleClick(e) {
    if (isSavedMovies || isSavedCard) {
      const id = card.id || card.movieId;
      const dbId = getDbId(card.movieId || card.id );
      mainApi.deleteMovie(dbId)
        .then((card) => {
          if (isSavedMovies) {
            handleRemove(id);
          } else {
            setIsSavedCard(false);
          }
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      mainApi.addMovie({
        country: card.country,
        director: card.director,
        duration: card.duration,
        year: card.year,
        description: card.description,
        trailerLink: card.trailerLink,
        nameRU: card.nameRU,
        nameEN: card.nameEN,
        movieId: card.id,
        image: IMAGES_URL + card.image.url,
        thumbnail: IMAGES_URL + card.image.formats.thumbnail.url,
      })
        .then((card) => {
          setIsSavedCard(true);
        })
        .catch((error) => {
          console.log(error)
        })
    }
  } //TODO логика не идеальна(двойное нажатие - баг, но переход со страниц - не баг) доработать

  //TODO уточнить после проверки, стоит ли делать название фильма ссылкой или нет.
return (
  <li className="moviesCard">
    <a href={ card.trailerLink } target="_blank" className="movies-card__content">
    <img className="moviesCard__img" src={ isSavedMovies ? card.thumbnail : IMAGES_URL + card.image.formats.thumbnail.url } alt={ card.nameRUS } /> </a>
    <p className="moviesCard__name">{ card.nameRU }
    <button
        className={`
          moviesCard__icon
          ${isSavedMovies ? 'moviesCard__icon-delete' 
                          : isSavedCard
                          ? 'moviesCard__icon-liked moviesCard__icon-liked_saved'
                          : 'moviesCard__icon-liked'}
        `}
        type="button"
        onClick={handleClick}
      ></button>
    </p>
    <time className="moviesCard__time">{ getTime(card.duration) }</time>
    <div className="moviesCard__icon-wrap">
    </div>
  </li>
);
};
