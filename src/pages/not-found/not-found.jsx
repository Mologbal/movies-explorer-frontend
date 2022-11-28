import './not-found.css';
import { useNavigate } from 'react-router-dom';

export function NotFoundPage() {
    const history = useNavigate();

    return (
        <main className="not-found">
            <h2 className="not-found__404">404</h2>
            <p className="not-found__text">Страница не найдена</p>
            <button type="button" className="not-found__button" onClick={() => history(-1)}>
                Назад
            </button>
        </main>
    );
};
