import Popup from './Popup.js';

export default class PopupWithForm extends Popup{

  constructor({popupSelector, closeButtonSelector}, {formSelector,submitHandle}){

    super({popupSelector, closeButtonSelector});

    this._form = this._popup.querySelector(formSelector);
    this._submitHandle = submitHandle;
  }

  _getInputValues(){

    this._inputList = this._form.querySelectorAll('.popup__field');
    this._inputValues = {};


    this._inputList.forEach(input => {

        this._inputValues[input.name] = input.value;
      });

    return this._inputValues;
  }


  setEventListeners(){

    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {

      evt.preventDefault();

      this._submitHandle(this._getInputValues());

      this._form.reset();
    })
  }

  close(){

    super.close();

    this._form.reset();
  }

}
