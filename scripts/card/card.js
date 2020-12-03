
import { cardsContainer, renderNoCards } from '../utils/render-utils.js';
import { openModal, setCardPopupContent } from '../utils/popup-utils.js'

export class Card {

  // Конструктор выглядит тяжелым, не уверен, что надо было именно так
  constructor(data) {

    this._image = data.cardContent.url;
    this._title = data.cardContent.caption;
    this._altText = data.cardContent.alt || data.cardContent.caption;

    this._templateSelector = data.templateSelector;
    this._popup = document.querySelector(data.modalSelector);
  }

  _getTemplate() {

    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content
      .cloneNode(true);

    return cardTemplate;
  }

  _setEventListeners() {

    this._cardElement.querySelector(".card__like").addEventListener('click', evt => {

      evt.target.classList.toggle('card__like_active');
    });

    this._cardElement.querySelector(".card__delete-card").addEventListener('click', evt => {

      evt.target.closest(".card").remove();

      if (!cardsContainer.querySelector(".card")) {
        renderNoCards();
      }

    });

    this._cardElement.querySelector(".card__picture").addEventListener("click", () => {

      openModal(this._popup);
      setCardPopupContent(this._popup, this._image, this._title);
    });

  }

  generateCard() {

    this._cardElement = this._getTemplate();
    this._setEventListeners();

    this._cardElement.querySelector('.card__picture').src = this._image;
    this._cardElement.querySelector('.card__picture').alt = this._altText;
    this._cardElement.querySelector('.card__title').textContent = this._title;

    return this._cardElement;
  }
}
