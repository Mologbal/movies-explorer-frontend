import './saved-movies.css';
import { Header } from '../../components/Header/Header';
import { SearchForm } from '../../components/SearchForm/SearchForm';
import { MoviesCardList } from '../../components/MoviesCardList/MoviesCardList';
import { Footer } from '../../components/Footer/Footer';
import {useEffect, useState} from 'react';
import * as ProjectApi from '../../MainApi/MainApi';
import {SearchErrors} from '../../components/SearchErrors/SearchErrors';
import {getFilteredMovies} from '../../utils/FilterOptions/FilterOptions';
import Preloader from '../../components/Preloader/Preloader';
import useListId from '.././../utils/ListId/ListId'
import {
  SERVER_ERROR,
  NO_USER_SEARCH_DATA,
  NOT_FOUND_THIS_FILM
} from '../../constants/constants'
import useMoviesSizeOptions from '../../utils/MoviesSizeOptions/MoviesSizeOptions';

export function SavedMovies() {
  const [ films, setFilms ] = useState();
  const [ letsSearch, setLetsSearch ] = useState(false);
  const [ searchInStorage, setSearchInStorage ] = useState('');
  const [ user, setUser ] = useState(false);
  const [ isPreloader, setIsPreloader ] = useState(false);
  const { idList, myId, updateListId } = useListId();
  const [ error, setError ] = useState('');
  const { isMore, startSearch, wantMore} = useMoviesSizeOptions();

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

  useEffect(() => {
    getMyFilms();
}, [letsSearch])

useEffect(() => {
    getMyFilms();
}, [])

//метка
const getMyFilms = () => {
    if (!sessionStorage.getItem('movies')) {
        return false
    } else {
        const result = getFilteredMovies(
            JSON.parse(sessionStorage.getItem('movies')),
            searchInStorage,
            letsSearch
        );
        if (result.length < 1) {
          setError(NOT_FOUND_THIS_FILM);
        } else {
            startSearch(result);
            setError('');
        }
        return true;
    }
}

//метка
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
        setError(NOT_FOUND_THIS_FILM);
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
