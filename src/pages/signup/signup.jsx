import './signup.css';
import Logo from '../../components/Logo/Logo';
import Button from '../../components/Button/Button';
import { Inputs } from '../../components/Inputs/Inputs';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import {Link, useNavigate} from 'react-router-dom';
import {useContext, useEffect, useState} from 'react';
import {CurrentUserContext} from '../../context/currentUserContext';
import {ErrorMessage} from '../../components/Error/ErrorMessage';
import {mainApi} from '../../utils/MainApi';
import {useFormError} from '../../hooks/useFormError';


export const SignUpPage = () => {
  const {values, handleChange, errors, isValid, setValues } = useFormAndValidation();
  const {error, showError} = useFormError();
  const [isPending, setIsPending] = useState(false);
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser.isLoggedIn) {
      navigate('/');
    }
  }, [currentUser])

  useEffect(() => {
    setValues({
      name: '',
      email: '',
      password: '',
    });
  }, [setValues]);

  function handleSubmit(e) {
    e.preventDefault();
    setIsPending(true);
    mainApi.signUp(values)
      .then(() => {
        mainApi.signIn({
          email: values.email,
          password: values.password,
        })
          .then((user) => {
            setCurrentUser({
              name: user.name,
              email: user.email,
              id: user._id,
              isLoggedIn: true,
            });
            navigate('/movies');
          })
          .catch((err) => {
            showError(err.text);
          })
      })
      .catch((err) => {
        if (err.status === 409) {
          showError('Такой пользователь уже существует.');
        } else if (err.status === 500) {
          showError('На сервере произошла ошибка.');
        } else if (err.status === 404) {
          showError('Страница не найдена.');
        }  else {
          showError('При регистрации пользователя произошла ошибка.');
        }
      })
      .finally(() => setIsPending(false));
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
                    pattern="[A-Za-z А-Яа-яёЁ]{2,30}"
                    min="2"
                    max="30"
                    errorText={errors.name}></Inputs>
                <Inputs
                    name="email"
                    type="email"
                    placeholder="E-mail"
                    pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$"
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
                <Button className="signup__button" type="submit" disabled={!(isValid && !isPending)}>
                <ErrorMessage>{ error }</ErrorMessage>
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
