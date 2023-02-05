import {
    FILM_DURATION,
    TIME_ARGUMENT,
    PAD_START
} from '../../constants/constants'

export function getFilteredMovies(item, answer, duration) {
    const searchValue = answer.toLowerCase();
    if (!duration) 
        item = item.filter((item) => {
            return item.duration > FILM_DURATION;
        });
    
    return item.filter((item) => {
        return (
            item.country.toLowerCase().includes(searchValue) || item.director.toLowerCase().includes(searchValue) || item.nameRU.toLowerCase().includes(searchValue) || item.nameEN.toLowerCase().includes(searchValue) || item.description.toLowerCase().includes(searchValue)
        );
    })
}

export const getMoviesTime = (item) => {
    const hours = Math.floor(item / TIME_ARGUMENT);
    const minutes = item - (hours * TIME_ARGUMENT);
    return `${hours}ч ${String(minutes).padStart(PAD_START, '0')}м`;
}