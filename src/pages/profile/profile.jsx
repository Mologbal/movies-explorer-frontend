import './profile.css';
import {Header} from '../../components/Header/Header';
import {useContext, useEffect, useState} from 'react';
import Button from '../../components/Button/Button';
import {useNavigate} from 'react-router-dom';
import {useFormAndValidation} from '../../hooks/useFormAndValidation';
import {useFormError} from '../../hooks/useFormError';
import {mainApi} from '../../utils/MainApi';
import {CurrentUserContext} from '../../context/currentUserContext';
import {ErrorMessage} from '../../components/Error/ErrorMessage';

//На следующих этапах разработки доработать установку введённых данных
export function Profile() {
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
    const history = useNavigate();
    const [isEditable, setIsEditable] = useState(false);
    const {values, handleChange, isValid, errors, setValues} = useFormAndValidation();
    const [isPending, setIsPending] = useState(false);
    const [focus, setFocus] = useState({
      name: false,
      email: false,
    });
    const {error, showError} = useFormError();
  
    function handleFocus(e) {
      setFocus({
        ...focus,
        [e.target.name]: !focus[e.target.name],
      });
    }

    function handleSubmit(event) {
        event.preventDefault();
        mainApi.updateUser(values)
        .then((user) => {
        setCurrentUser({
          ...currentUser,
          name: user.name,
          email: user.email,
        })
        showError('Данные успешно обновлены.');
        setIsEditable(false)
      })
      .catch((err) => {
        if (err.status === 409) {
          showError('Такой пользователь уже существует');
        } else if (err.status === 500) {
          showError('На сервере произошла ошибка.');
        } else if (err.status === 404) {
          showError('Страница не найдена.');
        } else {
          showError('При обновлении профиля произошла ошибка.');
        }
      })
    }

    function handleSignOut(event) {
        event.preventDefault();
        mainApi.signOut()
        .then(() => {
          sessionStorage.removeItem('searchValue');
          sessionStorage.removeItem('checkbox');
          sessionStorage.removeItem('movies');
        setCurrentUser({
          isLoggedIn: false,
        })
        history('/');
      })
      .catch((err) => console.log(err.text));
    }

    function handleEdit(event) {
        event.preventDefault();
        setIsEditable(true);
    }

    useEffect(() => {
      setValues({
        email: currentUser.email,
        name: currentUser.name,
      });
    }, [setValues]);

    return (
        <div className="profile">
            <Header></Header>
            <form className="profile__box" onSubmit={handleSubmit}>
                <h2 className="profile__hello">Привет, {currentUser.name}!</h2>
                {
                    isEditable
                        ? (<div className="profile__here-wrap">
                        <ul className="profile__here">
                          <li className="profile__here-item">
                            <span className={`${focus.name && 'profile__here-item-focused'}`}>Имя</span>
                            <span>
                              <input
                                name="name"
                                type="name"
                                onInput={handleChange}
                                onFocus={handleFocus}
                                minLength="2"
                                maxLength="30"
                                pattern="[A-Za-z А-Яа-яёЁ]{2,30}"
                                value={values.name}
                                className="profile__here-input"
                                onBlur={handleFocus}
                              />
                            </span>
                          </li>
                          <li className="profile__here-item">
                            <span className={`${focus.email && 'profile__here-item-focused'}`}>E-mail</span>
                            <span>
                              <input
                                name="email"
                                type="email"
                                onInput={handleChange}
                                onFocus={handleFocus}
                                pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$"
                                value={values.email}
                                className="profile__here-input"
                                onBlur={handleFocus}
                              />
                            </span>
                          </li>
                        </ul>
                        <ErrorMessage>{errors.name || errors.email} </ErrorMessage>
                      </div>)
                        : (
                            <div className="profile__here">
                                <div className="profile__here-item">
                                    <span>Имя</span>
                                    <span>{currentUser.name}</span>
                                </div>
                                <div className="profile__here-item">
                                    <span>E-mail</span>
                                    <span>{currentUser.email}</span>
                                </div>
                            </div>
                        )
                }
                <div className="profile__buttons">
                {isEditable ? <Button
                          className="profile__button-save"
                          type="submit"
                          disabled={!(isValid
                            && !isPending
                            && (currentUser.email !== values.email
                            || currentUser.name !== values.name))}
                        >
                          <ErrorMessage>{ error }</ErrorMessage>
                          Сохранить</Button>
                      : <>
                          <Button className="profile__button" onClick={handleEdit}>
                            <ErrorMessage>{ error }</ErrorMessage>
                            Редактировать</Button>
                          <Button
                            className="profile__button-signout"
                            onClick={handleSignOut}
                          >
                            Выйти из аккаунта</Button>
                        </>
          }
                </div>
            </form>
        </div>
    );
}
