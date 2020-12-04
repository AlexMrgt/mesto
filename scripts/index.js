
import  Card  from "./components/card.js";
import  FormValidator  from "./components/validation.js";

import  defaultCardsPropertiesSet from "./utils/defaultCardProps.js";
import { openModal, closeModal } from "./utils/popup-utils.js";
import { renderCard, renderDefaultCards } from './utils/render-utils.js';

const defaultCardsProperties = defaultCardsPropertiesSet;

const editModal = document.querySelector(".popup_scope_edit");
const editForm = editModal.querySelector(".popup__form_scope_edit");
const editName = editForm.querySelector(".popup__field_scope_name");
const editDescription = editForm.querySelector(".popup__field_scope_description");
const editCloseButton = editForm.querySelector(".popup__close-popup");

const addModal = document.querySelector(".popup_scope_add");
const addForm = addModal.querySelector(".popup__form_scope_add");
const addPlaceName = addForm.querySelector(".popup__field_scope_pic-name");
const addPlaceUrl = addForm.querySelector(".popup__field_scope_url");
const addCloseButton = addForm.querySelector(".popup__close-popup");

const cardModal = document.querySelector(".popup_scope_picture");
const cardCloseButton = cardModal.querySelector(".popup__close-popup_scope_picture");

const profile = document.querySelector(".profile");
const profileName = profile.querySelector(".profile__name");
const profileDescription = profile.querySelector(".profile__description");
const profileEditButton = profile.querySelector(".profile__edit-profile");
const profileAddButton = profile.querySelector(".profile__add-card");

const editFormConfig = {

  inputSelector: ".popup__field",
  submitButtonSelector: ".popup__save-button",

  inputInvalidClass: 'popup__field_invalid',
  inputErrorVisibleClass: 'popup__input-error_active',
  buttonInvalidClass: 'popup__save-button_disabled'
}

const addFormConfig = {

  inputSelector: ".popup__field",
  submitButtonSelector: ".popup__save-button",

  inputInvalidClass: 'popup__field_invalid',
  inputErrorVisibleClass: 'popup__input-error_active',
  buttonInvalidClass: 'popup__save-button_disabled'
}

const editFormValidation = new FormValidator(editFormConfig, editForm);
const addFormValidation = new FormValidator(addFormConfig, addForm);

function setFormDefaultValues() {

  editName.value = profileName.textContent;
  editDescription.value = profileDescription.textContent;
}

function editFormSubmitHandler(evt) {

  evt.preventDefault();

  profileName.textContent = editName.value;
  profileDescription.textContent = editDescription.value;
  closeModal(editModal);
}

function addFormSubmitHandler(evt) {

  evt.preventDefault();

  const newCardValues = {
    url: addPlaceUrl.value,
    caption: addPlaceName.value
  }

  /* Имеет ли смысл создавать переменную, или лучше сразу внутри renderCard создать экземпляр*/
  const card = new Card(
    {
      cardContent: newCardValues,
      templateSelector: '#card-template',
      modalSelector: ".popup_scope_picture"
    });

  renderCard(card.generateCard());

  closeModal(addModal);
}

profileEditButton.addEventListener("click", () => {

  setFormDefaultValues();
  editFormValidation.resetValidation();
  openModal(editModal);
})
editCloseButton.addEventListener("click", () => {

  closeModal(editModal);
})
editForm.addEventListener("submit", editFormSubmitHandler);

profileAddButton.addEventListener("click", () => {

  addForm.reset();
  addFormValidation.resetValidation();
  openModal(addModal);
})
addCloseButton.addEventListener("click", () => {

  closeModal(addModal);
})
addForm.addEventListener("submit", addFormSubmitHandler);

cardCloseButton.addEventListener("click", () => {

  closeModal(cardModal);
})

renderDefaultCards(defaultCardsProperties);

editFormValidation.enableValidation();
addFormValidation.enableValidation();
