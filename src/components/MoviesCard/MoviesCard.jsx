import './MoviesCard.css';
import {IMAGES_URL} from '../../constants/constants';
import {useState, useEffect} from 'react';
import * as ProjectApi from '../../MainApi/MainApi';
import { useLocation } from 'react-router-dom';
import {getMoviesTime} from '../../utils/FilterOptions/FilterOptions';
import useListId from '.././../utils/ListId/ListId'

export const MoviesCard = ({movie, savedPage = false, isSaved, instantDeletion, myId}) => {
    const [savedFilm, setIsSavedFilm] = useState(isSaved)
    const [please, setPleace] = useState(2)
    const {pathname} = useLocation();
    const {idList, updateListId} = useListId();

  //24 часа пытался понять как сделать функционал "ловли на лету" ID для удаления сразу после лайка, так и не понял. Из-за этого сделал "костыль-защиту please" которая не даёт наспамить одинаковых карточек. Постарался исправить все остальные ошибки.
    async function likeFilm() {
      setIsSavedFilm(true);
      if (please === 2) {
      const movieOptions = {
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        trailerLink: movie.trailerLink,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        movieId: movie.id,
        image: IMAGES_URL + movie.image.url,
        thumbnail: IMAGES_URL + movie.image.url,
      };
      try {
        await ProjectApi.saveMovie(movieOptions)
          setIsSavedFilm(true);
          setPleace(1)
        }
       catch(err) {
        console.log(err)
    }}
    }

    async function deleteMyLike() {
      try {
        const testId = myId(movie.id || movie.movieId );
        const thisId = movie.id || movie.movieId;
         await ProjectApi.deleteSavedMovie(testId)
        .then((card) => {if (savedPage || savedFilm) {
          instantDeletion(thisId);
          console.log('я пришёл')
        } else {
          setIsSavedFilm(false);
          console.log('я ушёл')
        }})
        const newSaved = await ProjectApi.getSavedMovies();
        setIsSavedFilm(newSaved);
        setPleace(0)
      } catch {
        console.log('Disliked');
        setIsSavedFilm(false)
        setPleace(0)
      }
    }

    function delOrLike (movie) {
      savedPage || savedFilm ? deleteMyLike(movie.id) : likeFilm(movie.id)
    }


  

return (
  <li className="moviesCard">
    <a href={ movie.trailerLink } className="movies-card__content" target="_blank" rel='noreferrer'>
    <img className="moviesCard__img" src={ savedPage ? movie.thumbnail : IMAGES_URL + movie.image.formats.thumbnail.url } alt={ movie.nameRUS || movie.nameENG } /> </a>
    <p className="moviesCard__name">{ movie.nameRU }
    {pathname === '/saved-movies' ? (
            <button type="button" className="moviesCard__icon moviesCard__icon-delete" onClick={delOrLike} />) : (
              <button type="button"  className={`moviesCard__icon ${savedFilm ?  'moviesCard__icon-liked moviesCard__icon-liked_saved' : 'moviesCard__icon-liked'}`} onClick={delOrLike}  />
            )}
    </p>
    <time className="moviesCard__time">{ getMoviesTime(movie.duration) }</time>
    <div className="moviesCard__icon-wrap">
    </div>
  </li>
);
};
