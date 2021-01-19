export default class Api {

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

  getUserInfo(){

    return fetch(`${this._baseUrl}/${this._cohort}/users/me`, {
      headers: {
        authorization: this._token
      }
    })
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
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
    .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
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
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
  }

  getDefaultCards(){

    return fetch(`${this._baseUrl}/${this._cohort}/cards`, {
      headers: {

        authorization: this._token
      }
    })
        .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))

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
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
  }

  setLike(cardId){

    return fetch(`${this._baseUrl}/${this._cohort}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
  }

  deleteLike(cardId){

    return fetch(`${this._baseUrl}/${this._cohort}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
  }

  deleteCard(cardId){

    return fetch(`${this._baseUrl}/${this._cohort}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))

  }
}
