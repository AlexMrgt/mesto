

export default class Popup {

  constructor({ popupSelector, closeButtonSelector }) {

    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector(closeButtonSelector)

    this._closeByEsc = this._closeByEsc.bind(this);
    this._closeByOverlay = this._closeByOverlay.bind(this);
  }

  _closeByEsc(evt) {

    if (evt.key === "Escape") {

      this.close();
    }
  }


  _closeByOverlay(evt) {

    if (evt.target.classList.contains("popup")) {

      this.close();
    }
  }


  setEventListeners() {

    this._closeButton.addEventListener('click', this.close.bind(this));
  }

  open() {

    this._popup.classList.add("popup_active");

    this._popup.addEventListener('mousedown', this._closeByOverlay);
    document.addEventListener('keydown', this._closeByEsc);
  }

  close() {

    this._popup.classList.remove("popup_active");

    this._popup.removeEventListener('mousedown', this._closeByOverlay);
    document.removeEventListener('keydown', this._closeByEsc);
  }

}
