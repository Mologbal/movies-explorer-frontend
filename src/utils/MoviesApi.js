import {Api} from './Api';
import {API_MOVIES_URL, MOVIES_API_OPTIONS} from '../constants';

class MoviesApi extends Api {
  constructor({ baseUrl, options }) {
    super({ baseUrl, options });
  }

  _request(url, reqOptions) {
    return super._request(url, reqOptions);
  }

  getMovies() {
    return this._request(
      this._baseUrl,
      MOVIES_API_OPTIONS,
    )
  }
}

export const moviesApi = new MoviesApi({
    baseUrl: API_MOVIES_URL,
    options: MOVIES_API_OPTIONS
  }
)