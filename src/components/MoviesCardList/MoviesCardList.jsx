import './MoviesCardList.css';
import {MoviesCard} from '../MoviesCard/MoviesCard';


export function MoviesCardList({idList, myId, savedPage = false, movies = [], instantDeletion}) {
    return (
        <ul className="moviesСardList">
            {movies.map((data) => {
              return <MoviesCard
              movie={data}
              savedPage={savedPage}
              isSaved={idList.includes(data.id)}
              myId={myId}
              key={data.id || data.movieId}
              instantDeletion={instantDeletion}></MoviesCard>;
                })
            }
        </ul>
    )
}