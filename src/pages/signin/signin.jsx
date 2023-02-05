import './signin.css';
import Logo from '../../components/Logo/Logo';
import {Inputs} from '../../components/Inputs/Inputs';
import {Button} from '../../components/Button/Button';
import {Link, useNavigate} from 'react-router-dom';
import {useContext, useEffect, useState} from 'react';
import myContext from '../../constants/myContext';
import {useFormAndValidation} from '../../validation/validation';
import {useErrorProfileMessage} from '../../errors/errors';
import * as ProjectApi from '../../MainApi/MainApi';
import {ErrorMessage} from '../../components/Error/ErrorMessage';
import {
  SERVER_ERROR,
  NOT_FOUND_PAGE,
  BASIC_ERROR,
  WRONG_DATA,
} from '../../constants/constants'

export function SignIn() {
    const navigate = useNavigate();
    const {values, handleChange, errors, isValid, setValues } = useFormAndValidation();
    const [isPending, setIsPending] = useState(false);
    const { thisuser, setUser } = useContext(myContext);
    const {error, errorMessage} = useErrorProfileMessage();

    useEffect(() => {
      if (thisuser.isLoggedIn) {
        navigate('/');
      }
    }, [thisuser])

    function handleSubmit(event) {
        event.preventDefault();
        setIsPending(true);
        ProjectApi.authorise(values)
          .then((user) => {
            setUser({
              name: user.name,
              email: user.email,
              id: user._id,
              isLoggedIn: true,
            });
            navigate('/movies');
          })
          .catch(err => {
             if (err.status = 500) {
              errorMessage(WRONG_DATA);
            } 
            else if (err.status = 404) {
              errorMessage(NOT_FOUND_PAGE);
            }
            else if (err.status = 401) {
              errorMessage(SERVER_ERROR);
            }
            else {
              errorMessage(BASIC_ERROR);
            }
          })
          .finally(() => setIsPending(false));
    }

    useEffect(() => {
        setValues({email: '', password: ''});
    }, [setValues]);

    return (
        <form className="signin" name="signin" onSubmit={handleSubmit} method="post">
            <Logo className="signin__logo"></Logo>
            <h1 className="signin__hello">Рады видеть!</h1>
            <div className="signin__inputs">
                <Inputs
                    type='email'
                    name="email"
                    pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$"
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
                <Button className="signin__button" type="submit" disabled={!(isValid && !isPending)}>
                <ErrorMessage>{ error }</ErrorMessage>
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
