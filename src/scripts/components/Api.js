export default class Api {

  //.then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))

  constructor(
    {
      baseUrl, cohort,
      headers: {
        authorization
      }
    }) {

    this._baseUrl = baseUrl;
    this._cohort = cohort;
    this._token = authorization;

  }

  _checkResponce(responce){

    return responce.ok ?  responce.json() : Promise.reject(`Ошибка: ${responce.status}`)
  }

  getUserInfo(){

    return fetch(`${this._baseUrl}/${this._cohort}/users/me`, {
      headers: {
        authorization: this._token
      }
    })
      .then(res => this._checkResponce(res))
  }

  editTextUserInfo({name, description}){

    return fetch(`${this._baseUrl}/${this._cohort}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: description
      })
    })
    .then(res => this._checkResponce(res))
  }

  editUserPhoto({avatar}){

    return fetch(`${this._baseUrl}/${this._cohort}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatar
      })
    })
      .then(res => this._checkResponce(res))
  }

  getDefaultCards(){

    return fetch(`${this._baseUrl}/${this._cohort}/cards`, {
      headers: {

        authorization: this._token
      }
    })
        .then(res => this._checkResponce(res))

  }

  addNewCard({url, place}){

    return fetch(`${this._baseUrl}/${this._cohort}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: place,
        link: url
      })
    })
      .then(res => this._checkResponce(res))
  }

  setLike(cardId){

    return fetch(`${this._baseUrl}/${this._cohort}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
      .then(res => this._checkResponce(res))
  }

  deleteLike(cardId){

    return fetch(`${this._baseUrl}/${this._cohort}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
      .then(res => this._checkResponce(res))
  }

  deleteCard(cardId){

    return fetch(`${this._baseUrl}/${this._cohort}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
      .then(res => this._checkResponce(res))

  }
}
