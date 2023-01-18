export class Api {
  constructor({ baseUrl, options }) {
    this._baseUrl = baseUrl;
    this._options = options;
  }
  _request(url, reqOptions) {
    return fetch(url, reqOptions).then((res) => {
      return res.ok ? res.json() : Promise.reject({
        status: res.status,
        text: res.statusText,
      });
    });
  };
}