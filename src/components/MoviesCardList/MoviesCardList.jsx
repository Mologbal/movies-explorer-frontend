import './MoviesCardList.css';
import {MoviesCard} from '../MoviesCard/MoviesCard';


export function MoviesCardList({idList, myId, updateListId, savedPage = false, movies = [], instantDeletion}) {
    return (
        <ul className="moviesСardList">
            {movies.map((data) => {
              return <MoviesCard
              movie={data}
              savedPage={savedPage}
              isSaved={idList.includes(data.id)}
              myId={myId}
              updateListId={updateListId}
              key={data.id || data.movieId}
              instantDeletion={instantDeletion}></MoviesCard>;
                })
            }
        </ul>
    )
}