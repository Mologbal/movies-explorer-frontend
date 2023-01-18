import './Header.css';
import React from 'react';
import {useState, useContext} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import Logo from '../Logo/Logo';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import Navigation from '../Navigation/Navigation';
import Button from '../Button/Button';
import {CurrentUserContext} from '../../context/currentUserContext';

export function Header() {
    const { currentUser } = useContext(CurrentUserContext);
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

    return (
        <header className="header">
            <div className={`header__box ${currentUser.isLoggedIn && 'header__box_logged'}`}>
                <Logo></Logo>
                {
                    currentUser.isLoggedIn ? (
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

