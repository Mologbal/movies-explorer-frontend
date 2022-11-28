import './signin.css';
import Logo from '../../components/Logo/Logo';
import Button from '../../components/Button/Button';
import { useEffect } from 'react';
import { Inputs } from '../../components/Inputs/Inputs';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
//redux
import {switchLogin} from '../../store/userSlice';

export function SignInPage() {
    const history = useNavigate();
    const dispatch = useDispatch();
    const {values, isValid, errors, setValues, handleChange} = useFormAndValidation();

    function handleSubmit(event) {
        event.preventDefault();
        if (isValid) {
            dispatch(switchLogin());
            history('/movies');
        }
    }

    useEffect(() => {
        setValues({email: 'pochta@yandex.ru', password: 'password'});
    }, [setValues]);

    return (
        <form className="signin" name="signin" onSubmit={handleSubmit} method="post">
            <Logo className="signin__logo"></Logo>
            <h1 className="signin__hello">Рады видеть!</h1>
            <div className="signin__inputs">
                <Inputs
                    name="email"
                    value={values.email}
                    handler={handleChange}
                    min="2"
                    max="30"
                    errorText={errors.email}
                    placeholder="E-mail"></Inputs>
                <Inputs
                    name="password"
                    type="password"
                    value={values.password}
                    handler={handleChange}
                    min="8"
                    errorText={errors.password}
                    placeholder="Пароль"></Inputs>
            </div>
            <div className="signin__buttons">
                <Button className="signin__button" type="submit">
                    Войти
                </Button>
                <div className="signin__text">
                    Ещё не зарегистрированы?
                    <Link to={'/signup'} className="signin__link"> Регистрация</Link>
                </div>
            </div>
        </form>
    );
};
