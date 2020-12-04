

export default class FormValidator {

  constructor(config, form) {

    this._formElement = form;

    this._submitElement = this._formElement.querySelector(config.submitButtonSelector);
    this._inputList = Array.from(this._formElement.querySelectorAll(config.inputSelector));

    this._inputInvalidClass = config.inputInvalidClass;
    this._inputErrorVisibleClass = config.inputErrorVisibleClass;
    this._buttonInvalidClass = config.buttonInvalidClass;
  }

  _setInputEventListemers() {

    this._inputList.forEach(inputElement => {

      inputElement.addEventListener('input', () => {

        this._checkIsValid(inputElement);
        this._setSubmitButtonState();
      })
    });

  }

  _showErrorMessage(inputElement, errorMessage) {

    inputElement.classList.add(this._inputInvalidClass);

    const errorEllement = this._formElement.querySelector(`#${inputElement.id}-error`);
    errorEllement.textContent = errorMessage;
    errorEllement.classList.add(this._inputErrorVisibleClass);
  }

  _hideErrorMessage(inputElement) {

    inputElement.classList.remove(this._inputInvalidClass);

    const errorEllement = this._formElement.querySelector(`#${inputElement.id}-error`);
    errorEllement.textContent = '';
    errorEllement.classList.remove(this._inputErrorVisibleClass);

  }

  _checkIsValid(inputElement) {

    if (!inputElement.validity.valid) {
      this._showErrorMessage(inputElement, inputElement.validationMessage);
    }
    else {
      this._hideErrorMessage(inputElement);
    }
  }

  _setSubmitButtonState() {

    if (this._formElement.checkValidity()) {
      this._submitElement.classList.remove(this._buttonInvalidClass);
      this._submitElement.removeAttribute('disabled', true);
    }
    else {
      this._submitElement.classList.add(this._buttonInvalidClass);
      this._submitElement.setAttribute('disabled', true);
    }
  }

  enableValidation() {

    this._formElement.addEventListener('submit', evt => {

      evt.preventDefault();
    });

    this._setSubmitButtonState();
    this._setInputEventListemers();
  }

  resetValidation() {

    this._setSubmitButtonState();

    this._inputList.forEach(inputElement => {
      this._hideErrorMessage(inputElement);
    })
  }

}
