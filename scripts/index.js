
import {Validation} from "./modules/__validation/modules__validation.js";
import {defaultCardsPropertiesSet as defaults} from "./modules/__defaultCardProps/modules__defaultCardProps.js";

const defaultCardsProperties = defaults;

const editModal = document.querySelector(".popup_scope_edit");
const editForm = editModal.querySelector(".popup__form_scope_edit");
const editInputList = Array.from(editForm.querySelectorAll("popup__field"));
const editName = editForm.querySelector(".popup__field_scope_name");
const editDescription = editForm.querySelector(".popup__field_scope_description");
const editCloseButton = editForm.querySelector(".popup__close-popup");
const editSubmitButton = editForm.querySelector(".popup__save-button_scope_edit");

const addModal =  document.querySelector(".popup_scope_add");
const addForm = addModal.querySelector(".popup__form_scope_add");
const addInputList = Array.from(addForm.querySelectorAll("popup__field"));
const addPlaceName = addForm.querySelector(".popup__field_scope_pic-name");
const addPlaceUrl = addForm.querySelector(".popup__field_scope_url");
const addCloseButton = addForm.querySelector(".popup__close-popup");
const addSubmitButton = addForm.querySelector(".popup__save-button_scope_add");

const cardModal = document.querySelector(".popup_scope_picture");
const cardModalPicture = cardModal.querySelector(".card-popup__image");
const cardModalCaption = cardModal.querySelector(".card-popup__caption");
const cardModalClose = cardModal.querySelector(".card-popup__close-popup");

const profile = document.querySelector(".profile");
const profileName = profile.querySelector(".profile__name");
const profileDescription = profile.querySelector(".profile__description");
const profileEditButton = profile.querySelector(".profile__edit-profile");
const profileAddButton = profile.querySelector(".profile__add-card");

const gallery = document.querySelector(".gallery");

const cardTemplate =  document.querySelector('#card-template').content;


function openModal(modal) {

  modal.classList.add("popup_active");

  modal.addEventListener('mousedown', mouseHandler);
  // вешать listener на document наверняка плохая практика, но не знаю, как иначе
  document.addEventListener('keydown', keyHandler);
}

function closeModal(modal) {

  modal.classList.remove("popup_active");

  modal.removeEventListener('click', mouseHandler);
  document.removeEventListener('keydown', keyHandler);
}

function keyHandler(evt){

  const currentModal = document.querySelector(".popup_active");

  if(evt.key === "Escape"){

    Validation.clearErrorsOnClose(currentModal, Validation.config);
    closeModal(currentModal);
  }

};

function mouseHandler(evt){

  const currentModal = document.querySelector(".popup_active");

  if (evt.target.classList.contains("popup")){

    Validation.clearErrorsOnClose(currentModal, Validation.config);
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

  addForm.reset();
  Validation.setButtonState(addSubmitButton, addInputList, Validation.config);
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

  card.querySelector(".card__picture").addEventListener("click", () => {

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
  openModal(editModal);
  Validation.setButtonState(editSubmitButton, editInputList, Validation.config);
})
editCloseButton.addEventListener("click", () => {

  Validation.clearErrorsOnClose(editModal, Validation.config);
  closeModal(editModal);
})
editForm.addEventListener("submit", editFormSubmitHandler);

profileAddButton.addEventListener("click", () => {

  addForm.reset();
  openModal(addModal);
})
addCloseButton.addEventListener("click", () => {

  Validation.clearErrorsOnClose(addModal, Validation.config);
  closeModal(addModal);
})
addForm.addEventListener("submit", addFormSubmitHandler);

cardModalClose.addEventListener("click", () => {

  closeModal(cardModal);
})


renderDefaultCards(defaultCardsProperties);

Validation.enableValidation(Validation.config);
