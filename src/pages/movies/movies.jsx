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
import * as ProjectApi from '../../MainApi/MainApi';
import * as MoviesApi from '../../MainApi/MoviesApi';
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
    const [letsSearch, setLetsSearch] = useState((localStorage.getItem('checkbox') === 'true'));
    const [searchInStorage, setSearchInStorage] = useState(localStorage.getItem('searchValue') || '');

     function useMemory(memory, setMemory) {
        useEffect(() => {
                setMemory((localStorage.getItem('checkbox') === 'true'))
          }, [setMemory]);
        
          useEffect(() => {
            if (memory) {
              localStorage.setItem('checkbox', 'false');
            } else {
                localStorage.setItem('checkbox', 'true');
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


    const getMyFilms = () => {
        if (!localStorage.getItem('movies')) {
            return false
        } else {
            const result = getFilteredMovies(
                JSON.parse(localStorage.getItem('movies')),
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
    

    function searchFilms(event) {
        event.preventDefault();
        if (!searchInStorage) {
            errorMessage(NO_USER_SEARCH_DATA);
            return;
          } else {
          localStorage.setItem('searchValue', searchInStorage)}
          if (!getMyFilms()) {
            event.preventDefault();
            setisPreloader(true);
            MoviesApi.getAllMovies()
              .then((movies) => {
                const query = getFilteredMovies(movies, searchInStorage, letsSearch);
                if (query.length < 1) {
                    errorMessage(NOT_FOUND_THIS_FILM);
                } else {
                  localStorage.setItem('movies', JSON.stringify(movies));
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

    
    function writeInput(event) {
        setSearchInStorage(event.target.value);
    }

    return (
        <div className="movies">
            <Header></Header>
            <main className="moviesBox">
                <SearchForm searchFilms={searchFilms} updateListId={updateListId} letsSearch={letsSearch} writeInput={writeInput} useCheckBox={useCheckBox} searchInStorage={searchInStorage}/> 
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

