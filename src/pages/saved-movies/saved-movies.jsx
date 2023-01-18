import './saved-movies.css';
import { Header } from '../../components/Header/Header';
import { SearchForm } from '../../components/SearchForm/SearchForm';
import { MoviesCardList } from '../../components/MoviesCardList/MoviesCardList';
import { Footer } from '../../components/Footer/Footer';
import {useEffect, useState} from 'react';
import {mainApi} from '../../utils/MainApi';
import {SearchErrors} from '../../components/SearchErrors/SearchErrors';
import {getFilteredMovies} from '../../utils';
import {useCheckbox} from '../../hooks/useCheckbox';
import Preloader from '../../components/Preloader/Preloader';
import {useMoviesList} from '../../hooks/useMoviesList';

export function SavedMoviesPage() {
  const [ movies, setMovies ] = useState();
  const [ searchAll, setSearchAll ] = useState(false);
  const [ searchValue, setSearchValue ] = useState('');
  const [ idChecked, setIdChecked ] = useState(false);
  const [ isPending, setIsPending ] = useState(false);
  const { idList, getDbId, updateList } = useMoviesList();
  const [ error, setError ] = useState('');
  useCheckbox(searchAll, setSearchAll);

  useEffect(() => {
    setIsPending(true)
    mainApi.getMovies()
      .then((res) => {
        updateList(res);
        setMovies(res);
        setError('');
      })
      .catch(() => {
        setError(`Во время запроса произошла ошибка. Возможна
        проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.`);
      })
      .finally(() => {
        setIsPending(false);
        setIdChecked(true);
      })
  }, [])

  function handleRemove(id) {
    setMovies([
      ...movies.filter(item => id !== item.movieId)
    ])
  }

  function handleChange(e) {
    setSearchValue(e.target.value);
  }

  function handleCheckbox(e) {
    setSearchAll(!searchAll);
  }

  function handleSubmmit(e) {
    e.preventDefault();
    if (!searchValue) {
      setError('Необходимо ввести ключевое слово.');
      return;
    }
    setIsPending(true)
    mainApi.getMovies()
      .then((res) => {
        if (res.length === 0) {
          setError('Ничего не найдено.');
        } else {
          setMovies(getFilteredMovies(res, searchValue, searchAll));
          setError('');
        }
      })
      .catch((err) => {
        setError(`Во время запроса произошла ошибка. Возможна
        проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.`);
      })
      .finally(() => {
        setIsPending(false)
      })
  }
    return (
        <div className="saved-movies">
            <Header></Header>
            <main className="saved-movies__box">
            <SearchForm
          handler={handleSubmmit}
          checked={searchAll}
          handleCheckbox={handleCheckbox}
          handleChange={handleChange}
          value={searchValue}
        />
        {error
          ? <SearchErrors>{ error }</SearchErrors>
          : idChecked && <MoviesCardList
          movies={movies}
          isSavedMovies={true}
          idList={idList}
          getDbId={getDbId}
          handleRemove={handleRemove}
      />}
          <div className="movies__more-wrap">
          {isPending && <Preloader />}
        </div>
            </main>
            <Footer></Footer>
        </div>
    );
}
