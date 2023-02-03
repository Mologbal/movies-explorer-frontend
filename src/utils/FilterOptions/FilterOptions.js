
export function getFilteredMovies(item, answer, duration) {
    const searchValue = answer.toLowerCase();
    if (!duration) 
        item = item.filter((item) => {
            return item.duration > 40;
        });
    
    return item.filter((item) => {
        return (
            item.country.toLowerCase().includes(searchValue) || item.director.toLowerCase().includes(searchValue) || item.nameRU.toLowerCase().includes(searchValue) || item.nameEN.toLowerCase().includes(searchValue) || item.description.toLowerCase().includes(searchValue)
        );
    })
}

export const getMoviesTime = (item) => {
    const hours = Math.floor(item / 60);
    const minutes = item - (hours * 60);
    return `${hours}ч ${String(minutes).padStart(1, '0')}м`;
}