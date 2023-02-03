import './signup.css';
import Logo from '../../components/Logo/Logo';
import {Button} from '../../components/Button/Button';
import { Inputs } from '../../components/Inputs/Inputs';
import { useFormAndValidation } from '../../validation/validation';
import {Link, useNavigate} from 'react-router-dom';
import {useContext, useEffect, useState} from 'react';
import myContext from '../../constants/myContext';
import {ErrorMessage} from '../../components/Error/ErrorMessage';
import * as ProjectApi from '../../projectApi/ProjectApi';
import {useErrorProfileMessage} from '../../errors/errors';
import {
  ALREADY_USED_EMAIL,
  SERVER_ERROR,
  NOT_FOUND_PAGE,
  BASIC_ERROR
} from '../../constants/constants'


export const SignUp = () => {
  const {values, handleChange, errors, isValid, setValues } = useFormAndValidation();
  const {error, errorMessage} = useErrorProfileMessage();
  const [isPending, setIsPending] = useState(false);
  const { thisuser, setUser } = useContext(myContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (thisuser.isLoggedIn) {
      navigate('/');
    }
  }, [thisuser])

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
    ProjectApi.regiser(values)
      .then(() => {
        ProjectApi.authorise({
          email: values.email,
          password: values.password,
        })
          .then((user) => {
            setUser({
              name: user.name,
              email: user.email,
              id: user._id,
              isLoggedIn: true,
            });
            navigate('/movies');
          })
          .catch((err) => {
            errorMessage(err.text);
          })
      })
      .catch((err) => {
         if (err.status === 409) {
          errorMessage(SERVER_ERROR);
        }
         else if (err.status === 500) {
          errorMessage(BASIC_ERROR);
        } 
        else if (err.status === 404) {
          errorMessage(NOT_FOUND_PAGE);
        }
        else {
          errorMessage(ALREADY_USED_EMAIL);
        };
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
