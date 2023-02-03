import { BASE_URL, ANOTHER_URL } from '../constants/constants';

  //Шаблон для краткости кода
  export const isRes = (res) => {
    if (res.ok) {
      return res.json();
    } else {
      return res.json().then((res) => {
        let err = new Error(`Ошибка ${res.status}`);
        err.res = res.message;
        throw err;
      });
    }
  };
  
  //Регистрация
  export const regiser = (data) => {
    return fetch(`${BASE_URL}/signup`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(isRes);
  };
  
  //Авторизация
  export const authorise = (data) => {
    return fetch(`${BASE_URL}/signin`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(isRes);
  };
  
  //Получить данные текущего пользователя
  export const getDataUser = () => {
    return fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
  
    }).then(isRes);
  };
  
  //Обновить данные текущего пользователя
  export const updateUser = (data) => {
    return fetch(`${BASE_URL}/users/me`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
  
    }).then(isRes);
  };
  
  //Выход из профиля
  export const exit = () => {
    return fetch(`${BASE_URL}/signout`, {
      method: "GET",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(isRes);
  }
  
  //Добавить фильм в сохраненные
  export const saveMovie = (data) => {
    return fetch(`${BASE_URL}/movies`, {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    })
    .then(isRes);
  }
  
  //Получить список сохраненных фильмов
  export const getSavedMovies = () => {
    return fetch(`${BASE_URL}/movies`, {
      method: "GET",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(isRes);
  }
  
  //Удалить фильм из сохраненных
  export const deleteSavedMovie = (id) => {
    return fetch(`${BASE_URL}/movies/${id}`, {
      method: "DELETE",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(isRes);
  }

  //Запрос к внешнему API за списком ВСЕХ фильмов
  export const getAllMovies = () => {
    return fetch (`${ANOTHER_URL}/beatfilm-movies`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(isRes)
  }