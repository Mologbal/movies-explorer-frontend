import './profile.css';
import { Header } from '../../components/Header/Header';
import { Inputs } from '../../components/Inputs/Inputs';
import { useEffect, useState } from 'react';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { switchLogin } from '../../store/userSlice';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';

//На следующих этапах разработки доработать установку введённых данных
export function Profile() {
    const history = useNavigate();
    const dispatch = useDispatch();
    const [isEditable, setIsEditable] = useState(false);
    const {values, handleChange, errors, isValid, setValues} = useFormAndValidation();

    function handleSubmit(event) {
        event.preventDefault();
        if (isValid) {
            setIsEditable(false);
        }
    }

    function handleSignOut(event) {
        event.preventDefault();
        dispatch(switchLogin());
        history('/');
    }

    function handleEdit(event) {
        event.preventDefault();
        setIsEditable(true);
    }

    useEffect(() => {
        setValues({name: 'Виталий', email: 'pochta@yandex.ru'});
    }, [setValues]);

    const user = {
        name: 'Виталий',
        email: 'pochta@yandex.ru'
    }

    return (
        <div className="profile">
            <Header></Header>
            <form className="profile__box" onSubmit={handleSubmit}>
                <h2 className="profile__hello">Привет, {user.name}!</h2>
                {
                    isEditable
                        ? (
                            <div className="profile__inputs">
                                <Inputs
                                    name="name"
                                    handler={handleChange}
                                    min="2"
                                    max="30"
                                    value={values.name}
                                    errorText={errors.name}></Inputs>
                                <Inputs
                                    name="email"
                                    handler={handleChange}
                                    min="2"
                                    max="30"
                                    value={values.email}
                                    errorText={errors.email}></Inputs>
                            </div>
                        )
                        : (
                            <div className="profile__here">
                                <div className="profile__here-item">
                                    <span>Имя</span>
                                    <span>{user.name}</span>
                                </div>
                                <div className="profile__here-item">
                                    <span>E-mail</span>
                                    <span>{user.email}</span>
                                </div>
                            </div>
                        )
                }
                <div className="profile__buttons">
                    {
                        isEditable
                            ? <Button className="profile__button" type="submit">Сохранить</Button>
                            : <Button className="profile__button" onClick={handleEdit}>Редактировать</Button>
                    }
                    <Button className="profile__button-signout" onClick={handleSignOut}>Выйти из аккаунта</Button>
                </div>
            </form>
        </div>
    );
}
