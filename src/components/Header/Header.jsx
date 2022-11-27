import './Header.css';
import React from 'react';
import {useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import Logo from '../Logo/Logo';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import Navigation from '../Navigation/Navigation';
import Button from '../Button/Button';
import {useSelector} from "react-redux";

export function Header() {
    const history = useNavigate();
    function handleSignInClick() {
        history('/signin');
    }
    function handleButtonUserClick() {
        history('/profile');
    }

    const [isOpen, setIsOpen] = useState(false);
    function handleBurgerMenuClick() {
        setIsOpen(!isOpen);
    }

    //Используется store redux, если не разрешено - исправить
    const {isUserLogged} = useSelector(state => state.user);
    return (
        <header className="header">
            <div className={`header__box ${isUserLogged && 'header__box_logged'}`}>
                <Logo></Logo>
                {
                    isUserLogged
                        ? (
                            <> < div className = {
                                `header__menu ${isOpen && 'header__menu_open'}`
                            } > <Navigation></Navigation>
                            <Button onClick={handleButtonUserClick} className="header__button-user">
                                <span>Аккаунт</span>
                            </Button>
                        </div>
                        <div
                            onClick={handleBurgerMenuClick}
                            className={`header__menu-wrap ${isOpen && 'header__menu-wrap_open'}`}></div>
                        <BurgerMenu onClick={handleBurgerMenuClick} isActive={isOpen}></BurgerMenu>
                    </>
                        )
                        : (
                            <> < div className = "header__user-group" > <Link to={'/signup'} className='header__link'>Регистрация</Link>
                            <Button onClick={handleSignInClick} className="header__button-login">
                                Войти
                            </Button>
                        </div>
                    </>
                        )
                }
            </div>
        </header>
    );
}

