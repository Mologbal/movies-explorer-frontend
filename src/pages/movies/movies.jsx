import './movies.css';
import {Button} from '../../components/Button/Button';
import {Header} from '../../components/Header/Header';
import {Footer} from '../../components/Footer/Footer';
import {SearchForm} from '../../components/SearchForm/SearchForm';
import {MoviesCardList} from '../../components/MoviesCardList/MoviesCardList';
import {useEffect, useState} from 'react';
import Preloader from '../../components/Preloader/Preloader';
import useMoviesSizeOptions from '../../utils/MoviesSizeOptions/MoviesSizeOptions';
import {getFilteredMovies} from '../../utils/FilterOptions/FilterOptions';
import * as ProjectApi from '../../projectApi/ProjectApi';
import {SearchErrors} from '../../components/SearchErrors/SearchErrors';
import useListId from '.././../utils/ListId/ListId'
import {useSearchError} from '../../errors/errors';
import {
    SERVER_ERROR,
    NO_USER_SEARCH_DATA,
    NOT_FOUND_THIS_FILM,
  } from '../../constants/constants'

export function Movies() {
    const {films, isMore, startSearch, wantMore} = useMoviesSizeOptions();
    const {error, errorMessage} = useSearchError();
    const {idList, myId, updateListId} = useListId();
    const [user, setUser] = useState(false);
    const [isPreloader, setisPreloader] = useState(false);
    const [letsSearch, setLetsSearch] = useState(false);
    
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
        ProjectApi
            .getSavedMovies()
            .then((res) => {
                updateListId(res);
            })
            . finally(() => {
                setUser(true);
            })
    }, [films])

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
                errorMessage(NOT_FOUND_THIS_FILM);
            } else {
                startSearch(result);
                errorMessage('');
            }
            return true;
        }
    }
    
    //метка
    function searchFilms(event) {
        event.preventDefault();
        if (!searchInStorage) {
            errorMessage(NO_USER_SEARCH_DATA);
            return;
          } else {
          sessionStorage.setItem('searchValue', searchInStorage)}
          if (!getMyFilms()) {
            setisPreloader(true);
            ProjectApi.getAllMovies()
              .then((movies) => {
                const query = getFilteredMovies(movies, searchInStorage, letsSearch);
                if (query.length < 1) {
                    errorMessage(NOT_FOUND_THIS_FILM);
                } else {
                  sessionStorage.setItem('movies', JSON.stringify(movies));
                  startSearch(query);
                  errorMessage('');
                }
                }).catch(() => {
                    errorMessage(SERVER_ERROR);
                }).finally(() => {
                    setisPreloader(false);
                })
        }}

    function useCheckBox() {
        setLetsSearch(!letsSearch);
    }

    const [searchInStorage, setSearchInStorage] = useState(sessionStorage.getItem('searchValue') || '');
    function writeInput(event) {
        setSearchInStorage(event.target.value);
    }

    return (
        <div className="movies">
            <Header></Header>
            <main className="moviesBox">
                <SearchForm searchFilms={searchFilms} letsSearch={letsSearch} writeInput={writeInput} useCheckBox={useCheckBox} searchInStorage={searchInStorage}/> 
                {error
                        ? <SearchErrors>{error}</SearchErrors>
                        : user && <MoviesCardList movies={films} myId={myId} idList={idList}></MoviesCardList>
                }
                <div className="moviesMore">
                    {isPreloader && <Preloader/>}
                    {(isMore && !error) && <Button className="moviesMore-button" type="button" onClick={wantMore}>Ещё</Button>
                    }
                </div>
            </main>
            <Footer></Footer>
        </div>
    );
}

