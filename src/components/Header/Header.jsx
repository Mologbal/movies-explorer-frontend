import './Header.css';
import React from 'react';
import {useState, useContext} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import Logo from '../Logo/Logo';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import Navigation from '../Navigation/Navigation';
import {Button} from '../Button/Button';
import myContext from '../../constants/myContext';

export function Header() {
    const [check, setcheck] = useState(false);
    const {thisuser} = useContext(myContext);
    const navigate = useNavigate();

    function sentToProfile() {
        navigate('/profile');
    }
    function sentToLogin() {
        navigate('/signin');
    }

    function openMenu() {
        setcheck(!check);
    }

    return (
        <header className="header">
            <div className={`header__box ${thisuser.isLoggedIn && 'header__box_logged'}`}>
                <Logo></Logo>
                {thisuser.isLoggedIn 
                ? 
                (<> 
                <div className = {`header__menu ${check && 'header__menu_open'}`}>
                    <Navigation></Navigation>
                            <Button onClick={sentToProfile} className="header__button-user">
                                <span>Профиль</span>
                            </Button>
                        </div>
                        <div className={`header__menu-wrap ${check && 'header__menu-wrap_open'}`}>
                        </div>
                        <BurgerMenu onClick={openMenu} isActive={check}>
                        </BurgerMenu>
                    </>)
                        : 
                        (
                            <> < div className = "header__user-group" > <Link to={'/signup'} className='header__link'>Регистрация</Link>
                            <Button onClick={sentToLogin} className="header__button-login">
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

