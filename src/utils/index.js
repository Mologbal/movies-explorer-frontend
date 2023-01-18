import {MAX_SHORT_MOVIE_LENGTH} from '../constants';

//TODO общая логика подойдет если фильтр без надобности в сохраненных фильмах. Уточнить.
export function getFilteredMovies(data, query, short) {
    const searchValue = query.toLowerCase();
  
    if (!short) data = data.filter((item) => {
      return item.duration > MAX_SHORT_MOVIE_LENGTH;
    });
  
    return data.filter((item) => {
      return (
          item.nameRU.toLowerCase().includes(searchValue) ||
          item.nameEN.toLowerCase().includes(searchValue) ||
          item.country.toLowerCase().includes(searchValue) ||
          item.description.toLowerCase().includes(searchValue) ||
          item.director.toLowerCase().includes(searchValue)
      );
    })
  }

  export const getTime = (time) => {
    const hours = Math.floor(time/60);
    const minutes = time - hours*60;
  
    return `${hours}ч ${String(minutes).padStart(2, '0')}м`;
  }