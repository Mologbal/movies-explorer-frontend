import './SearchForm.css';
import { Filter } from '../Filter/Filter';
import icon from '../../images/search-icon.svg';
import Button from '../Button/Button';


export function SearchForm({handler, handleChange, value, handleCheckbox, checked}) {
    return (
        <div className="search-form-wrap">
            <form name="search" onSubmit={handler} required className="search-form" method="get"> 
                <div className="search-form__input-wrap">
                    <div className="search-form__film-box">
                        <img className="search-form__logo" src={icon} alt="Иконка поиска"></img>
                        <input
            type="text"
            name="query"
            placeholder="Фильм"
            className="search-form__input"
            onInput={handleChange}
            value={value}
          />
                    </div>
                    <div className="search-form__box">
                        <Button type="submit" className="search-form__button">Найти</Button>
                        <Filter name="small" handler={handleCheckbox} checked={checked} label="Короткометражки" />
                    </div>
                </div>
            </form>
        </div>
    );
};
