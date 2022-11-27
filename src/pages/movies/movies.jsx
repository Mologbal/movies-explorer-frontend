import './movies.css';
import Button from '../../components/Button/Button';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { SearchForm } from '../../components/SearchForm/SearchForm';
import { MoviesCardList } from '../../components/MoviesCardList/MoviesCardList';

export function MoviesPage() {
    return (
        <div className="movies">
            <Header></Header>
            <main className="movies__box">
                <SearchForm></SearchForm>
                <MoviesCardList></MoviesCardList>
                <div className="movies__more">
                    <Button type="button" className="movies__more-button" title="Загрузить еще">
                        Ещё
                    </Button>
                </div>
            </main>
            <Footer></Footer>
        </div>
    );
}
