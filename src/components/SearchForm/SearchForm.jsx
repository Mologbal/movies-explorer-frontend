import './SearchForm.css';
import { Filter } from '../Filter/Filter';
import icon from '../../images/search-icon.svg';
import {Button} from '../Button/Button';


export function SearchForm({
    searchFilms, 
    writeInput, 
    searchInStorage, 
    useCheckBox, 
    letsSearch}) {
    return (
        <div className="search-form-wrap">
            <form name="search" onSubmit={searchFilms} required className="search-form" method="get"> 
                <div className="search-form__input-wrap">
                    <div className="search-form__film-box">
                        <img className="search-form__logo" src={icon} alt="Иконка поиска"></img>
                        <input
            type="text"
            value={searchInStorage}
            placeholder="фильм"
            className="search-form__input"
            onInput={writeInput}
          ></input>
                    </div>
                    <div className="search-form__box">
                        <Button type="submit" className="search-form__button">Найти</Button>
                        <Filter checked={letsSearch} handler={useCheckBox} label="Короткометражки"></Filter>
                    </div>
                </div>
            </form>
        </div>
    );
};
