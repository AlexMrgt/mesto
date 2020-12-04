
import { cardsContainer, renderNoCards } from '../utils/render-utils.js';
import { openModal, setCardPopupContent } from '../utils/popup-utils.js'

export default class Card {

  constructor({ cardContent: { url, caption, alt = caption }, templateSelector, modalSelector }) {

    this._image = url;
    this._title = caption;
    this._altText = alt;

    this._templateSelector = templateSelector;
    this._popup = document.querySelector(modalSelector);
  }

  _getTemplate() {

    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content
      .cloneNode(true);

    return cardTemplate;
  }

  _handleLikeClick(evt) {

    evt.target.classList.toggle('card__like_active');
  }

  _handleDeleteClick(evt) {

    evt.target.closest(".card").remove();

    if (!cardsContainer.querySelector(".card")) {
      renderNoCards();
    }

  }

  _handleImageClick() {

    openModal(this._popup);
    setCardPopupContent(this._popup, this._image, this._title);
  }

  _setEventListeners(cardElement) {

    cardElement.querySelector(".card__like").addEventListener('click', evt => {

      this._handleLikeClick(evt);
    });

    cardElement.querySelector(".card__delete-card").addEventListener('click', evt => {

      this._handleDeleteClick(evt);
    });

    cardElement.querySelector(".card__picture").addEventListener("click", () => {

      this._handleImageClick()
    });

  }

  generateCard() {

    const cardElement = this._getTemplate();

    this._setEventListeners(cardElement);

    cardElement.querySelector('.card__picture').src = this._image;
    cardElement.querySelector('.card__picture').alt = this._altText;
    cardElement.querySelector('.card__title').textContent = this._title;

    return cardElement;
  }
}
