import './not-found.css';
import { useNavigate } from 'react-router-dom';

export function NotFound() {
    const navigate = useNavigate();

    return (
        <main className="not-found">
            <h2 className="not-found__404">404</h2>
            <p className="not-found__text">Такой страницы не найдено</p>
            <button type="button" className="not-found__button" onClick={() => navigate(-1)}>
                Назад
            </button>
        </main>
    );
};
