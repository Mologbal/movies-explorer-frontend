import './signup.css';
import Logo from '../../components/Logo/Logo';
import Button from '../../components/Button/Button';
import { useEffect } from 'react';
import { Inputs } from '../../components/Inputs/Inputs';
import { Link } from 'react-router-dom';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';

export function SignUpPage() {
    const {
        values,
        errors,
        handleChange,
        setValues,
    } = useFormAndValidation();

    useEffect(() => {
        setValues({name: 'Виталий', email: 'pochta@yandex.ru', password: 'password'});
    }, [setValues]);

    function handleSubmit(event) {
        event.preventDefault();
    }

    return (
        <form name="signup" method="post" className="signup" onSubmit={handleSubmit}>
            <Logo secondClass="signup__logo"></Logo>
            <h2 className="signup__hello">Добро пожаловать!</h2>
            <div className="signup__inputs">
                <Inputs
                    name="name"
                    placeholder="Имя"
                    value={values.name}
                    handler={handleChange}
                    min="2"
                    max="30"
                    errorText={errors.name}></Inputs>
                <Inputs
                    name="email"
                    placeholder="E-mail"
                    value={values.email}
                    handler={handleChange}
                    min="2"
                    max="30"
                    errorText={errors.email}></Inputs>
                <Inputs
                    name="password"
                    type="password"
                    value={values.password}
                    placeholder="Пароль"
                    min="8"
                    handler={handleChange}
                    errorText={errors.password}></Inputs>
            </div>
            <div className="signup__buttons">
                <Button className="signup__button" type="submit">
                    Зарегистрироваться
                </Button>
                <div className="signup__text">
                    Уже зарегистрированы?
                    <Link to={'/signin'} className="signup__link"> Войти</Link>
                </div>
            </div>
        </form>
    );
};
