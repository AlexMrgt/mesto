import './index.css';

import Card from "../scripts/components/Card.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import Section from "../scripts/components/Section.js";
import UserInfo from "../scripts/components/UserUnfo.js";
import FormValidator from "../scripts/components/FornValidator.js";

import {
  editForm,
  addForm,
  profileEditButton, profileAddButton,
  gallerySelector,
  editFormConfig, addFormConfig } from "../scripts/utils/variables.js";

import {cardsData} from "../scripts/utils/defaultCardProps.js";


profileEditButton.addEventListener("click", () => {

  editPopup.open(profileInfo.getUserInfo());

  editFormValidation.resetValidation();
})

profileAddButton.addEventListener("click", () => {

  addPopup.open();

  addFormValidation.resetValidation();
})


const createRawCard = (cardContent) => {

  const card = new Card(
    {
      cardContent: cardContent,
      templateSelector: '#card-template',
      modalSelector: ".popup_scope_picture",
      handleCardClick: ({ url, text }) => {

        cardPopup.open({ url, text });
      },
      pushDeleteEvent: () => {

        gallery.checkCardsAmount();
      }
    });

    return card;
}


const profileInfo = new UserInfo({
  nameSelector: '.profile__name',
  descriptionSelector: '.profile__description'
});


const gallery = new Section(
  {
    contentList: cardsData,

    renderer: (contentItem) => {

      const cardElement = createRawCard(contentItem);
      gallery.addDefaultItem(cardElement.generateCard());
    }

  }, gallerySelector
);

gallery.render();


const editPopup = new PopupWithForm(
  {
    popupSelector: '.popup_scope_edit',
    closeButtonSelector: '.popup__close-popup'
  },
  {
    formSelector: '.popup__form_scope_edit',
    submitHandle: ({ name, description }) => {

      profileInfo.setUserInfo({ name, description });
      editPopup.close();
    }
  });

editPopup.setEventListeners();


const addPopup = new PopupWithForm(
  {
    popupSelector: '.popup_scope_add',
    closeButtonSelector: '.popup__close-popup'
  },
  {
    formSelector: '.popup__form_scope_add',
    submitHandle: ({ ['place-name']: place, ['place-url']: url }) => {

      const cardElement = createRawCard({url: url, caption: place});
      gallery.addItem(cardElement.generateCard())

      addPopup.close();
    }
  });

addPopup.setEventListeners();

const cardPopup = new PopupWithImage(
  {
    popupSelector: '.popup_scope_picture',
    closeButtonSelector: '.popup__close-popup',
    imageSelector: '.card-popup__image',
    captionSelector: '.card-popup__caption'
  });

cardPopup.setEventListeners();


const editFormValidation = new FormValidator(editFormConfig, editForm);
editFormValidation.enableValidation();

const addFormValidation = new FormValidator(addFormConfig, addForm);
addFormValidation.enableValidation();


