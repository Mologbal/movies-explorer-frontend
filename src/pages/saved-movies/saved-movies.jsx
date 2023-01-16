import './saved-movies.css';
import { Header } from '../../components/Header/Header';
import { SearchForm } from '../../components/SearchForm/SearchForm';
import { MoviesCardList } from '../../components/MoviesCardList/MoviesCardList';
import { Footer } from '../../components/Footer/Footer';

export function SavedMoviesPage() {
    return (
        <div className="saved-movies">
            <Header></Header>
            <main className="saved-movies__box">
                <SearchForm></SearchForm>
                <MoviesCardList savedMovies={true}></MoviesCardList>
            </main>
            <Footer></Footer>
        </div>
    );
}
