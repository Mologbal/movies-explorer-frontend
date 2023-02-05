import './profile.css';
import {Header} from '../../components/Header/Header';
import {useContext, useEffect, useState} from 'react';
import {Button} from '../../components/Button/Button';
import {useNavigate} from 'react-router-dom';
import {useFormAndValidation} from '../../validation/validation';
import {useErrorProfileMessage} from '../../errors/errors';
import * as ProjectApi from '../../MainApi/MainApi';
import myContext from '../../constants/myContext';
import {ErrorMessage, SuccessMessage} from '../../components/Error/ErrorMessage';
import {
  ALREADY_USED_EMAIL,
  SERVER_ERROR,
  NOT_FOUND_PAGE,
  BASIC_ERROR
} from '../../constants/constants'

export function Profile() {
    const { thisuser, setUser } = useContext(myContext);
    const navigate = useNavigate();
    const [writeHere, setWriteHere] = useState(false);
    const {values, handleChange, isValid, errors, setValues} = useFormAndValidation();
    const [isPreloader] = useState(false);
    const [checked] = useState(true);
    const {error, errorMessage} = useErrorProfileMessage();
    const {success, successMessage} = useErrorProfileMessage();
  
    function handleSubmit(event) {
        event.preventDefault();
        ProjectApi.updateUser(values).then((profile) => {
          setUser({
          ...thisuser,
          name: profile.name, email: profile.email,
        })
        errorMessage('Ваши данные обновлены');
        setWriteHere(false)
      })
      .catch((err) => {
        if (err.status === 409) {
          errorMessage(ALREADY_USED_EMAIL)
        } else if (err.status === 500) {
          errorMessage(SERVER_ERROR)
        } else if (err.status === 404) {
          errorMessage(NOT_FOUND_PAGE)
        } else {
          errorMessage(BASIC_ERROR);
        }
      })
    }

    function handleSignOut(event) {
        event.preventDefault();
        ProjectApi.exit()
        .then(() => {
          sessionStorage.removeItem('searchValue');
          sessionStorage.removeItem('movies');
          sessionStorage.removeItem('checkbox');
          sessionStorage.removeItem('jwt');
          setUser({
            isLoggedIn: false,
        })
        navigate('/');
      })
      .catch((error) => console.log(error.text));
    }

    function handleEdit(event) {
        event.preventDefault();
        setWriteHere(true);
    }

    useEffect(() => {
      setValues({
        email: thisuser.email,
        name: thisuser.name,
      });
    }, [setValues]);

    return (
        <div className="profile">
            <Header></Header>
            <form className="profile__box" onSubmit={handleSubmit}>
                <h2 className="profile__hello">Привет, {thisuser.name}!</h2>
                {
                    writeHere
                        ? (<div className="profile__here-wrap">
                        <ul className="profile__here">
                          <li className="profile__here-item">
                          <div className='profile__here-placeholder'>Имя -➤</div>
                              <input
                                name="name"
                                type="name"
                                onInput={handleChange}
                                placeholder="Имя"
                                minLength="2"
                                maxLength="30"
                                pattern="[A-Za-z А-Яа-яёЁ]{2,30}"
                                value={values.name}
                                className="profile__here-input"
                                
                              />
                            
                          </li>
                          <li className="profile__here-item">
                          <div className='profile__here-placeholder'>E-mail -➤</div>
                              <input
                                name="email"
                                type="email"
                                onInput={handleChange}
                                placeholder="Email"
                                pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$"
                                value={values.email}
                                className="profile__here-input"
                                
                              />
                            
                          </li>
                        </ul>
                        {checked? 
                        <ErrorMessage>{errors.name || errors.email} </ErrorMessage> : <SuccessMessage>{success.name || success.email}</SuccessMessage>
}
                      </div>)
                        : (
                            <div className="profile__here">
                                <div className="profile__here-item">
                                    <div className='profile__here-placeholder-static'>Имя</div>
                                    <div className='profile__here-user-text'>{thisuser.name}</div>
                                </div>
                                <div className="profile__here-item">
                                <div className='profile__here-placeholder-static'>E-mail</div>
                                <div className='profile__here-user-text'>{thisuser.email}</div>
                                </div>
                            </div>
                        )
                }
                <div className="profile__buttons">
                {writeHere ? <Button
                          className="profile__button-save"
                          type="submit"
                          disabled={!(isValid
                            && !isPreloader
                            && (thisuser.email !== values.email
                            || thisuser.name !== values.name))}
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
