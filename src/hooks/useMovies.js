import {useEffect, useState} from 'react';
import {useMedia} from './useMedia';
import {
  DESKTOP_NUM_OF_ADDED_MOVIES,
  MOBILE_NUM_OF_ADDED_MOVIES,
  TABLET_NUM_OF_ADDED_MOVIES,
} from '../constants';

export const useMovies = () => {
  const [movies, setMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [count, setCount] = useState(0);
  const {pageSize} = useMedia();
  const [numOfMovies, setNumOfMovies] = useState(DESKTOP_NUM_OF_ADDED_MOVIES);
  const [isMore, setIsMore] = useState(false);

  useEffect(() => {
    if (pageSize.desktop) setNumOfMovies(DESKTOP_NUM_OF_ADDED_MOVIES);
    else if (pageSize.tablet) setNumOfMovies(TABLET_NUM_OF_ADDED_MOVIES);
    else if (pageSize.mobile) setNumOfMovies(MOBILE_NUM_OF_ADDED_MOVIES);
  }, [pageSize])

  useEffect(() => {
    setIsMore(count < allMovies.length);
  }, [setIsMore, count, allMovies]);

  const getFirst = (data) => {
    setCount(numOfMovies);
    setAllMovies([
      ...data
    ]);
    setMovies([
      ...data.slice(0, numOfMovies),
    ]);
  };

  const getNext = () => {
    setMovies([
      ...movies,
      ...allMovies.slice(count, count + numOfMovies)
    ]);
    setCount(count + numOfMovies);
  }

  return { movies, isMore, getFirst, getNext };
};