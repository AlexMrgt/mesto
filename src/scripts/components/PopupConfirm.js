import Popup from "./Popup";

export default class PopupConfirm extends Popup {

  constructor({

    selectors: {
      popupSelector, closeButtonSelector, formSelector
    }
  }) {

    super({selectors:{ popupSelector, closeButtonSelector }});

    this._form = this._popup.querySelector(formSelector);
  }

  setEventListeners() {

    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {

      evt.preventDefault();

      this._handleSubmitCallback();
    })
  }

  setSubmitAction(submitAction) {

    this._handleSubmitCallback = submitAction;
  }
}
