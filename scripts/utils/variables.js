const editForm = document.querySelector(".popup__form_scope_edit");
const editName = editForm.querySelector(".popup__field_scope_name");
const editDescription = editForm.querySelector(".popup__field_scope_description");

const addForm = document.querySelector(".popup__form_scope_add");

const profile = document.querySelector(".profile");
const profileEditButton = profile.querySelector(".profile__edit-profile");
const profileAddButton = profile.querySelector(".profile__add-card");

const gallerySelector = '.gallery';

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

export{ editForm, editName, editDescription, addForm, profileEditButton, profileAddButton, gallerySelector, editFormConfig, addFormConfig }
