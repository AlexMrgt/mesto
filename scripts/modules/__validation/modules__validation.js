
export function setSubmitButtonState(submitElement, formElement, config){

  if (formElement.checkValidity()){
    submitElement.classList.remove(config.buttonInvalidClass);
    submitElement.removeAttribute('disabled', true);
  }
  else{
    submitElement.classList.add(config.buttonInvalidClass);
    submitElement.setAttribute('disabled', true);
  }
}

export function showErrorMessage(formElement, inputElement, errorMessage, config) {

  inputElement.classList.add(config.inputInvalidClass);

  const errorEllement = formElement.querySelector(`#${inputElement.id}-error`);
  errorEllement.textContent = errorMessage;
  errorEllement.classList.add(config.inputErrorVisibleClass);
}

export function hideErrorMessage(formElement, inputElement, config){

  inputElement.classList.remove(config.inputInvalidClass);

  const errorEllement = formElement.querySelector(`#${inputElement.id}-error`);
  errorEllement.textContent = '';
  errorEllement.classList.remove(config.inputErrorVisibleClass);
}

export function checkIsValid(formElement, inputElement, config){

  (!inputElement.validity.valid)? showErrorMessage(formElement, inputElement, inputElement.validationMessage, config) : hideErrorMessage(formElement, inputElement, config);
}

export function setInputEventListemers(formElement, config){

  const sumbitElement = formElement.querySelector(config.submitButtonSelector);
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));

  setSubmitButtonState(sumbitElement, formElement, config);

  inputList.forEach( inputElement => {

    inputElement.addEventListener('input', () => {

      checkIsValid(formElement, inputElement, config);
      setSubmitButtonState(sumbitElement, formElement, config);
    })
  });
}

export function enableValidation(config){

  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach(formElement =>{

    formElement.addEventListener('submit', evt => {

      evt.preventDefault();
    });

    setInputEventListemers(formElement, config);
  })
}

export function resetValidation(formElement, config){

  const submitElement = formElement.querySelector(config.submitButtonSelector);
  setSubmitButtonState(submitElement, formElement, config);

  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  inputList.forEach( inputElement =>{
    hideErrorMessage(formElement, inputElement, config);
  })

}
