import Popup from './Popup.js';

export default class PopupWithImage extends Popup {

  constructor({
    selectors: {
      popupSelector, closeButtonSelector, imageSelector, captionSelector
    }
  }
  ) {

    super({selectors:{ popupSelector, closeButtonSelector }});

    this._image = this._popup.querySelector(imageSelector);
    this._caption = this._popup.querySelector(captionSelector);
  }

  open(url, text) {

    super.open()

    this._image.src = url;
    this._caption.textContent = text;
  }
}
