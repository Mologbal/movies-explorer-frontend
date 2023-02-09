import './MoviesCard.css';
import {IMAGES_URL} from '../../constants/constants';
import {useState, useEffect} from 'react';
import * as ProjectApi from '../../MainApi/MainApi';
import { useLocation } from 'react-router-dom';
import {getMoviesTime} from '../../utils/FilterOptions/FilterOptions';
import useListId from '.././../utils/ListId/ListId'

export const MoviesCard = ({movie, savedPage = false, isSaved, instantDeletion, myId}) => {
    const [savedFilm, setIsSavedFilm] = useState(isSaved)

    const {pathname} = useLocation();
    const {idList, updateListId} = useListId();
    const [cardId, setCardId] = useState(movie._id || '')
    

    async function likeFilm() {
      setIsSavedFilm(true);
      
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
        const savedMovie = await ProjectApi.saveMovie(movieOptions)
          setCardId(savedMovie._id)
          setIsSavedFilm(true);
          
        }
       catch(err) {
        console.log(err)
    }
    }

    async function deleteMyLike() {
      try {
        const testId = myId(movie.id || movie.movieId );
        const thisId = movie.id || movie.movieId;
         await ProjectApi.deleteSavedMovie(cardId)
        .then((card) => {if (savedPage || savedFilm) {
          instantDeletion(thisId);
          console.log('я пришёл')
        } else {
          setIsSavedFilm(false);
          console.log('я ушёл')
        }})
        const newSaved = await ProjectApi.getSavedMovies();
        setIsSavedFilm(newSaved);
        
      } catch {
        console.log('Disliked');
        setIsSavedFilm(false)
        
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
