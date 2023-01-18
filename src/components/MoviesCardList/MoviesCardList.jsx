import './MoviesCardList.css';
import {MoviesCard} from '../MoviesCard/MoviesCard';


export function MoviesCardList({
    movies = [],
    idList,
    getDbId,
    isSavedMovies = false,
    handleRemove,
 }) {

    return (
        <ul className="moviesСardList">
            {movies.map((item, index) => {
          return <MoviesCard
            card={item}
            key={item.id || item.movieId}
            isSavedMovies={isSavedMovies}
            isSaved={idList.includes(item.id)}
            getDbId={getDbId}
            handleRemove={handleRemove}
          />;
                })
            }
        </ul>
    );
};