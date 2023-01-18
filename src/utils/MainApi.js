import {Api} from './Api';
import { API_MAIN_URL, MAIN_API_OPTIONS } from '../constants';

class MainApi extends Api {
  constructor({ baseUrl, options }) {
    super({ baseUrl, options });
  }

  _request(url, reqOptions) {
    return super._request(url, reqOptions);
  }

  signUp(data) {
    return this._request(
      `${this._baseUrl}/signup`,
      {
        ...this._options,
        method: 'POST',
        body: JSON.stringify(data),
      }
    );
  }

  signIn(data) {
    return this._request(
      `${this._baseUrl}/signin`,
      {
        ...this._options,
        method: 'POST',
        body: JSON.stringify(data),
      }
    );
  }

  getCurrentUser() {
    return this._request(
      `${this._baseUrl}/users/me`,
      {
        ...this._options,
        method: 'GET',
      }
    );
  }

  updateUser(data) {
    return this._request(
      `${this._baseUrl}/users/me`,
      {
        ...this._options,
        method: 'PATCH',
        body: JSON.stringify(data),
      }
    );
  }

  signOut() {
    return this._request(
      `${this._baseUrl}/signout`,
      {
        ...this._options,
        method: 'GET',
      }
    );
  }

  deleteMovie(id) {
    return this._request(
      `${this._baseUrl}/movies/${id}`,
      {
        ...this._options,
        method: 'DELETE',
      }
    );
  }

  addMovie(data) {
    return this._request(
      `${this._baseUrl}/movies`,
      {
        ...this._options,
        method: 'POST',
        body: JSON.stringify(data),
      }
    );
  }

  getMovies() {
    return this._request(
      `${this._baseUrl}/movies`,
      {
        ...this._options,
        method: 'GET',
      }
    );
  }

};

export const mainApi = new MainApi({
  baseUrl: API_MAIN_URL,
  options: MAIN_API_OPTIONS,
});