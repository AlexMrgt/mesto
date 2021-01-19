
export default class Card {

  constructor(

    userId, {

      cardContent: { link, name, alt = `Фотография '${name}'`, likes, _id, owner },

      selectors: { templateSelector, modalSelector },

      handlers: { handleCardClick, handleLikeClick, handleDeleteClick },

      pushDeleteEvent
    }) {

    this._userId = userId;

    this._imageUrl = link;
    this._altText = alt;
    this._title = name;
    this._likes = likes;
    this._cardId = _id;
    this._cardOwnerId = owner._id;

    this._templateSelector = templateSelector;
    this._popup = document.querySelector(modalSelector);

    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;

    this._pushDeleteEvent = pushDeleteEvent;
  }

  _getTemplate() {

    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardTemplate;
  }

  _toggleLikeStatus(evt) {

    evt.target.classList.toggle('card__like_active');
  }

  _isLiked() {

    return this._element.querySelector('.card__like').classList.contains('card__like_active'); // по-хорошему, мне кажется, для проверки нужен запрос на сервер, есть ли в лайкнувших наш ID
  }

  _setEventListeners(cardElement) {

    cardElement.querySelector(".card__like").addEventListener('click', evt => {

      this._handleLikeClick(this._cardId, this._isLiked(), evt);
    });

    // эта конструкция вообще вызывает вопросы, может как-то поизящнее можно
    const deleteButton = cardElement.querySelector(".card__delete-card");
    if (deleteButton) {

      deleteButton.addEventListener('click', evt => {

        this._handleDeleteClick(this._cardId, evt);
      });
    };

    cardElement.querySelector(".card__picture").addEventListener("click", () => {

      this._handleCardClick( this._imageUrl, this._title,  );
    }
    );

  }

  _setDefaultLikeStatus(card) {

    this._likes.forEach(person => {

      if (person._id == this._userId)
        card.querySelector('.card__like').classList.add('card__like_active');
    })
  }

  setLikes(likes, evt) {

    this._element.querySelector(".card__like-counter").textContent = likes;
    this._toggleLikeStatus(evt);
  }

  removeCard(evt) {

    evt.target.closest(".card").remove();
    this._pushDeleteEvent();
  }

  generateCard() {

    this._element = this._getTemplate();

    // вроде нет необходимости выносить это в метод ?
    if (this._userId !== this._cardOwnerId) {

      this._element.querySelector('.card__delete-card').remove();
    }

    this._setEventListeners(this._element);

    this._element.querySelector('.card__picture').src = this._imageUrl;
    this._element.querySelector('.card__picture').alt = this._altText;
    this._element.querySelector('.card__title').textContent = this._title;
    this._element.querySelector('.card__like-counter').textContent = this._likes.length;

    this._setDefaultLikeStatus(this._element);

    return this._element;
  }

}
