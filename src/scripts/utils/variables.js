
const editForm = document.querySelector(".popup__form_scope_edit");
const editSubmitButton = editForm.querySelector('.popup__save-button_scope_edit');

const editAvatarForm = document.querySelector(".popup__form_scope_edit-avatar");
const editImageSubmitButton = editAvatarForm.querySelector('.popup__save-button_scope_edit-avatar');

const addForm = document.querySelector(".popup__form_scope_add");
const addSubmitButton = addForm.querySelector('.popup__save-button_scope_add');

// не уверен, куда деть эту ф-ю
const buttonTextSaver = (buttons=>{

  buttons.forEach(button=>{

    button.defaultText = button.textContent;
  })

});
buttonTextSaver([ editSubmitButton, editImageSubmitButton, addSubmitButton ]);

const profile = document.querySelector(".profile");
const profileName = profile.querySelector('.profile__name');
const profileDescription = profile.querySelector('.profile__description');
const profileEditButton = profile.querySelector(".profile__edit-profile");
const profileAddButton = profile.querySelector(".profile__add-card");
const profileEditImageButton = profile.querySelector(".profile__image-and-edit-button-container");

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

const editAvatarFormConfig = {

  inputSelector: ".popup__field",
  submitButtonSelector: ".popup__save-button",

  inputInvalidClass: 'popup__field_invalid',
  inputErrorVisibleClass: 'popup__input-error_active',
  buttonInvalidClass: 'popup__save-button_disabled'
}


export {
  editForm,
  addForm,
  editAvatarForm,
  profileEditButton, profileAddButton, profileEditImageButton, profileName, profileDescription,
  editSubmitButton, editImageSubmitButton, addSubmitButton,
  gallerySelector,
  editFormConfig, addFormConfig, editAvatarFormConfig }
