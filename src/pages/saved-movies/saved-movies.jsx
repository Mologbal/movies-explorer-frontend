import './saved-movies.css';
import { Header } from '../../components/Header/Header';
import { SearchForm } from '../../components/SearchForm/SearchForm';
import { MoviesCardList } from '../../components/MoviesCardList/MoviesCardList';
import { Footer } from '../../components/Footer/Footer';
import {useEffect, useState} from 'react';
import * as ProjectApi from '../../projectApi/ProjectApi';
import {SearchErrors} from '../../components/SearchErrors/SearchErrors';
import {getFilteredMovies} from '../../utils/FilterOptions/FilterOptions';
import Preloader from '../../components/Preloader/Preloader';
import useListId from '.././../utils/ListId/ListId'
import {
  SERVER_ERROR,
  NO_USER_SEARCH_DATA,
  NOT_FOUND_THIS_FILM_SAVED
} from '../../constants/constants'

export function SavedMovies() {
  const [ films, setFilms ] = useState();
  const [ letsSearch, setLetsSearch ] = useState(false);
  const [ searchInStorage, setSearchInStorage ] = useState('');
  const [ user, setUser ] = useState(false);
  const [ isPreloader, setIsPreloader ] = useState(false);
  const { idList, myId, updateListId } = useListId();
  const [ error, setError ] = useState('');

  function useMemory(memory, setMemory) {
    useEffect(() => {
      if (localStorage.getItem('memory')) {
        setMemory(Boolean(localStorage.getItem('memory')))
      }
    }, [setMemory]);
  
    useEffect(() => {
      if (memory) {
        localStorage.setItem('memory', 'false');
      } else {
        localStorage.removeItem('memory');
      }
    }, [memory]);
  }
  useMemory(letsSearch, setLetsSearch)
  

  useEffect(() => {
    setIsPreloader(true)
    ProjectApi.getSavedMovies()
      .then((res) => {
        updateListId(res);
        setFilms(res);
        setError('');
      })
      .catch(() => {
        setError(SERVER_ERROR);
      })
      .finally(() => {
        setIsPreloader(false);
        setUser(true);
      })
  }, [])

  function searchFilms(e) {
    e.preventDefault();
    if (!searchInStorage) {
      setError(NO_USER_SEARCH_DATA);
      return;
    }
    setIsPreloader(true)
    ProjectApi.getSavedMovies()
      .then((query) => {
        if (query.length < 1) {
          setError(NOT_FOUND_THIS_FILM_SAVED);
        } else {
          setFilms(getFilteredMovies(query, searchInStorage, letsSearch));
          setError('');
        }
      })
      .catch(() => {
        setError(SERVER_ERROR);
      })
      .finally(() => {
        setIsPreloader(false)
      })
  }

  function instantDeletion(id) {
    setFilms([
      ...films.filter(item => id !== item.movieId)
    ])
  }

  function writeInput(e) {
    setSearchInStorage(e.target.value);
  }

  function useCheckBox() {
    setLetsSearch(!letsSearch);
  }
    return (
        <div className="saved-movies">
            <Header></Header>
            <main className="saved-movies__box">
            <SearchForm searchFilms={searchFilms} letsSearch={letsSearch} writeInput={writeInput} useCheckBox={useCheckBox} searchInStorage={searchInStorage}/>
        {error
          ? <SearchErrors>{ error }</SearchErrors>
          : user && <MoviesCardList instantDeletion={instantDeletion} movies={films} savedPage={true} idList={idList} myId={myId}/>
          }
          <div className="movies__more-wrap">
          {isPreloader && <Preloader />}
        </div>
            </main>
            <Footer></Footer>
        </div>
    );
}
