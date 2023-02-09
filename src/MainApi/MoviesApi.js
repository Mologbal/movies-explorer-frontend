import { ANOTHER_URL } from '../constants/constants';
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