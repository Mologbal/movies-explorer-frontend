import './movies.css';
import Button from '../../components/Button/Button';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { SearchForm } from '../../components/SearchForm/SearchForm';
import { MoviesCardList } from '../../components/MoviesCardList/MoviesCardList';
import {useEffect, useState} from 'react';
import Preloader from '../../components/Preloader/Preloader';
import {moviesApi} from '../../utils/MoviesApi';
import {useMovies} from '../../hooks/useMovies';
import {getFilteredMovies} from '../../utils';
import {mainApi} from '../../utils/MainApi';
import {useCheckbox} from '../../hooks/useCheckbox';
import {useMoviesList} from '../../hooks/useMoviesList';
import {SearchErrors} from '../../components/SearchErrors/SearchErrors';

export function MoviesPage() {
    const { movies, isMore, getFirst, getNext } = useMovies();
    const [ searchValue, setSearchValue ] = useState(sessionStorage.getItem('searchValue') || '');
    const [ searchAll, setSearchAll ] = useState(false);
    const [ error, setError ] = useState('');
    const { idList, getDbId, updateList } = useMoviesList();
    const [ idChecked, setIdChecked ] = useState(false);
    const [ isPending, setIsPending ] = useState(false);
    useCheckbox(searchAll, setSearchAll);



  useEffect(() => {
    mainApi.getMovies()
      .then((res) => {
        updateList(res);
      })
      .finally(() => {
        setIdChecked(true);
      })
  }, [movies])

  useEffect(() => {
    recoverFromStore();
  }, [searchAll])

  useEffect(() => {
    recoverFromStore();
  }, [])



  function handleCheckbox(e) {
    setSearchAll(!searchAll);
  }

  function handleChange(e) {
    setSearchValue(e.target.value);
  }

  const recoverFromStore = () => {
    if (sessionStorage.getItem('movies')) {
      const result = getFilteredMovies(JSON.parse(sessionStorage.getItem('movies')), searchValue, searchAll);
      if (result.length === 0) {
        setError('По вашему запросу ничего не найдено');
      } else {
        getFirst(result);
        setError('');
      }
      return true;
    } else {
      return false;
    }
  }

  function handleSubmmit(e) {
    e.preventDefault();
    if (!searchValue) {
      setError('Необходимо ввести ключевое слово.');
      return;
    }

    sessionStorage.setItem('searchValue', searchValue);

    if (!recoverFromStore()) {
      setIsPending(true);
      moviesApi.getMovies()
        .then((movies) => {
          const result = getFilteredMovies(movies, searchValue, searchAll);
          if (result.length === 0) {
            setError('По вашему запросу ничего не найдено');
          } else {
            sessionStorage.setItem('movies', JSON.stringify(movies));
            getFirst(result);
            setError('');
          }
        })
        .catch(() => {
          setError(`Во время запроса произошла ошибка. Возможна
          проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.`);
        })
        .finally(() => {
          setIsPending(false);
        })
    }
  }

    
    return (
        <div className="movies">
            <Header></Header>
            <main className="moviesBox">
            <SearchForm
          handler={handleSubmmit}
          checked={searchAll}
          handleChange={handleChange}
          handleCheckbox={handleCheckbox}
          value={searchValue}
        />
                {error
          ? <SearchErrors>{ error }</SearchErrors>
          : idChecked && <MoviesCardList movies={movies} getDbId={getDbId} idList={idList}></MoviesCardList>}
                <div className="moviesMore">
                {isPending && <Preloader />}
                {(isMore && !error) && <Button
            className="moviesMore-button"
            type="button"
            title="Загрузить еще"
            onClick={getNext}
          >
            Ещё
          </Button>}
                </div>
            </main>
            <Footer></Footer>
        </div>
    );
}
