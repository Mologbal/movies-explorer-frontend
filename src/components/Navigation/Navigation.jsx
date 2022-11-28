import './Navigation.css';
import {NavLink} from 'react-router-dom';

export default function Navigation() {
    return (
        <div className="navigation">
            <div className="navigation__links">
                <div>
                    {/* Проверка нужна ли кнопка "Главная" в конкретном случае и далее */}
                    <NavLink
                        to={'/'}
                        className={(
                            settings) => settings.isActive
                            ? "navigation__link navigation__link_main navigation__link_show"
                            : "navigation__link navigation__link_main"}
                        end="end">
                        Главная
                    </NavLink>
                </div>
                <div>
                    <NavLink
                        to={'/movies'}
                        className={(
                            settings) => settings.isActive
                            ? "navigation__link navigation__link_show"
                            : "navigation__link"}
                        end="end">
                        Фильмы
                    </NavLink>
                </div>
                <div>
                    <NavLink
                        to={'/saved-movies'}
                        className={(
                            settings) => settings.isActive
                            ? "navigation__link navigation__link_show"
                            : "navigation__link"}
                        end="end">
                        Сохраненные фильмы
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

