
import * as validation from "./modules/__validation/modules__validation.js";
import {defaultCardsPropertiesSet as defaults} from "./modules/__defaultCardProps/modules__defaultCardProps.js";

const defaultCardsProperties = defaults;

/* все эти переменные для удобства, наверное, тоже можно
упаковать в соотвествующие объекты и доставать уже оттуда */

const editModal = document.querySelector(".popup_scope_edit");
const editForm = editModal.querySelector(".popup__form_scope_edit");
const editName = editForm.querySelector(".popup__field_scope_name");
const editDescription = editForm.querySelector(".popup__field_scope_description");
const editCloseButton = editForm.querySelector(".popup__close-popup");

const addModal =  document.querySelector(".popup_scope_add");
const addForm = addModal.querySelector(".popup__form_scope_add");
const addPlaceName = addForm.querySelector(".popup__field_scope_pic-name");
const addPlaceUrl = addForm.querySelector(".popup__field_scope_url");
const addCloseButton = addForm.querySelector(".popup__close-popup");

const cardModal = document.querySelector(".popup_scope_picture");
const cardModalPicture = cardModal.querySelector(".card-popup__image");
const cardModalCaption = cardModal.querySelector(".card-popup__caption");
const cardCloseButton = cardModal.querySelector(".popup__close-popup_scope_picture");

const profile = document.querySelector(".profile");
const profileName = profile.querySelector(".profile__name");
const profileDescription = profile.querySelector(".profile__description");
const profileEditButton = profile.querySelector(".profile__edit-profile");
const profileAddButton = profile.querySelector(".profile__add-card");

const gallery = document.querySelector(".gallery");

const cardTemplate =  document.querySelector('#card-template').content;

const validationConfig = {

  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__save-button',

  inputInvalidClass: 'popup__field_invalid',
  inputErrorVisibleClass: 'popup__input-error_active',
  buttonInvalidClass: 'popup__save-button_disabled'
}

function openModal(modal) {

  modal.classList.add("popup_active");

  modal.addEventListener('mousedown', closeByOverlay);
  document.addEventListener('keydown', closeByEsc);
}

function closeModal(modal) {

  modal.classList.remove("popup_active");

  modal.removeEventListener('click', closeByOverlay);
  document.removeEventListener('keydown', closeByEsc);
}

function closeByEsc(evt){

  if(evt.key === "Escape") {
    const currentModal = document.querySelector(".popup_active");
    closeModal(currentModal);
  }
};

function closeByOverlay(evt){

  if ( evt.target.classList.contains("popup")){
    const currentModal = document.querySelector(".popup_active");
    closeModal(currentModal);
  }
}

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

function addFormSubmitHandler(evt){

  evt.preventDefault();

  renderCard(createCard(addPlaceUrl.value, addPlaceName.value));
  closeModal(addModal);
}

function createCard(sourse, title, alternative = title){

  const card = cardTemplate.cloneNode(true);
  const cardPicture = card.querySelector(".card__picture");
  const cardTitle = card.querySelector(".card__title");

  cardPicture.src = sourse;
  cardPicture.alt = alternative;
  cardTitle.textContent = title;

  card.querySelector(".card__like").addEventListener('click', evt => {

    evt.target.classList.toggle('card__like_active');
  });

  card.querySelector(".card__delete-card").addEventListener('click', evt => {

    evt.target.closest(".card").remove();

    if (!gallery.querySelector(".card")) {
      renderNoCards();
    }

  });

  cardPicture.addEventListener("click", () => {

    openModal(cardModal);
    setCardPopupContent(sourse, title);
  })

  return card;
}

function renderCard(card){

  gallery.prepend(card);
  renderHasCards();
}

function renderDefaultCards(defaultSourses){

  defaultSourses.forEach( sourse => {
    renderCard(createCard(sourse.url, sourse.caption, sourse.alt));
  })
}

function renderNoCards(){

  gallery.querySelector('.no-cards').classList.remove("no-cards_hidden");
}

function renderHasCards(){

  gallery.querySelector('.no-cards').classList.add("no-cards_hidden");
}

function setCardPopupContent(src, caption, alt = caption){

  cardModalPicture.src = src;
  cardModalPicture.alt = alt;
  cardModalCaption.textContent = caption;
}

profileEditButton.addEventListener("click", () => {

  setFormDefaultValues();
  validation.resetValidation(editForm, validationConfig);
  openModal(editModal);
})
editCloseButton.addEventListener("click", () => {

  closeModal(editModal);
})
editForm.addEventListener("submit", editFormSubmitHandler);

profileAddButton.addEventListener("click", () => {

  addForm.reset();
  validation.resetValidation(addForm, validationConfig);
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

validation.enableValidation(validationConfig);
