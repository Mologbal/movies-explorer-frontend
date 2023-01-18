import {useState} from 'react';

export const useMoviesList = () => {
  const [idList, setIdList] = useState([]);
  const [dbIdList, setDbIdList] = useState({});

  function updateList(movies) {
    const list = [];
    const ids = {};
    movies.forEach((item) => {
      list.push(item.movieId);
      ids[item.movieId] = item._id;
    });

    setIdList([
      ...list,
    ])

    setDbIdList({
      ...ids,
    });

  }

  function getDbId(movieId) {
    return dbIdList[movieId];
  }

  return {idList, updateList, getDbId};
}