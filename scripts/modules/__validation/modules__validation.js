export class Validation{

  static config = {

    formSelector: '.popup__form',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__save-button',

    inputInvalidClass: 'popup__field_invalid',
    inputErrorVisibleClass: 'popup__input-error_active',
    buttonInvalidClass: 'popup__save-button_disabled'
  };

  static setButtonState(submitElement, inputList, config){

    if(this.isGenerallyInvalide(inputList)){
      submitElement.classList.add(config.buttonInvalidClass);
      submitElement.setAttribute('disabled', true);
    }
    else{
      submitElement.classList.remove(config.buttonInvalidClass);
      submitElement.removeAttribute('disabled', true);
    }
  }

  static isGenerallyInvalide(inputList){

    return inputList.some( inputElement => {
      return !inputElement.validity.valid;
    } )
  }

  static clearErrorsOnClose(modal, config){

    const formElement = modal.querySelector(config.formSelector);
    const inputList = formElement.querySelectorAll(config.inputSelector);

    inputList.forEach( inputElement => {
      this.hideErrorMessage(formElement, inputElement, config)
    })
  }

  static showErrorMessage(formElement, inputElement, errorMessage, config) {

    inputElement.classList.add(config.inputInvalidClass);

    const errorEllement = formElement.querySelector(`#${inputElement.id}-error`);

    errorEllement.textContent = errorMessage;
    errorEllement.classList.add(config.inputErrorVisibleClass);
  }

  static hideErrorMessage(formElement, inputElement, config){

    inputElement.classList.remove(config.inputInvalidClass);

    const errorEllement = formElement.querySelector(`#${inputElement.id}-error`);

    errorEllement.textContent = '';
    errorEllement.classList.remove(config.inputErrorVisibleClass);
  }

  static checkValidity(formElement, inputElement, config){

    (!inputElement.validity.valid)? this.showErrorMessage(formElement, inputElement, inputElement.validationMessage, config) : this.hideErrorMessage(formElement, inputElement, config);
  }

  static setInputEventListemers(formElement, config){

    const sumbitElement = formElement.querySelector(config.submitButtonSelector);

    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    this.setButtonState(sumbitElement, inputList, config);

    inputList.forEach( inputElement => {

      inputElement.addEventListener('input', () => {

        this.checkValidity(formElement, inputElement, config);
        this.setButtonState(sumbitElement, inputList, config);
      })
    });
  }

  static enableValidation(config){

    const formElements = Array.from(document.querySelectorAll(config.formSelector));

    formElements.forEach(formElement =>{

      formElement.addEventListener('submit', evt => {
        evt.preventDefault();
      });

      this.setInputEventListemers(formElement, config);
    })
  }

}
