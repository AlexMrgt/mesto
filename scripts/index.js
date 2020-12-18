
import Card from "./components/Card.js";
import PopupWithForm from "./components/PopupWithForm.js";
import PopupWithImage from "./components/PopupWithImage.js";
import Section from "./components/Section.js";
import UserInfo from "./components/UserUnfo.js";
import FormValidator from "./components/Validation.js";

import {
  editForm, editName, editDescription,
  addForm,
  profileEditButton, profileAddButton,
  gallerySelector,
  editFormConfig, addFormConfig} from "./utils/variables.js";

import defaultCardsPropertiesSet from "./utils/defaultCardProps.js";

const cardsData = defaultCardsPropertiesSet;

profileEditButton.addEventListener("click", () => {

  // эти 3 строчки выглядят как что-то неправильное, нааверное надо как-то поизящнее
  const fieldsData = profileInfo.getUserInfo();
  editName.value = fieldsData.name;
  editDescription.value = fieldsData.description;

  editFormValidation.resetValidation();

  editPopup.open();
})

profileAddButton.addEventListener("click", () => {

  addFormValidation.resetValidation();

  addPopup.open();
})


const profileInfo = new UserInfo({
  nameSelector: '.profile__name',
  descriptionSelector:'.profile__description'
});


const gallery = new Section({

  contentList: cardsData,
  renderer: (contentItem) => {

    const card = new Card(
      {
        cardContent: contentItem,
        templateSelector: '#card-template',
        modalSelector: ".popup_scope_picture",
        handleCardClick: ({ url, text }) => {

          cardPopup.open({ url, text });
        },
        pushDeleteEvent: () => {

          gallery.checkCardsAmount();
        }
      });

    const cardElement = card.generateCard();

    gallery.addItem(cardElement);
  },

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

      profileInfo.setUserInfo({name, description});
      editPopup.close(); // --> сильно меня это смущает, хардкодить конкретную форму
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

      const newCardValues = {
        url: url,
        caption: place
      }

      const card = new Card(
        {
          cardContent: newCardValues,
          templateSelector: '#card-template',
          modalSelector: ".popup_scope_picture",
          handleCardClick: ({ url, text }) => {

            cardPopup.open({ url, text });
          },
          pushDeleteEvent: () => {

            gallery.checkCardsAmount();
          }
        });

      gallery.addItem(card.generateCard())

      addPopup.close();// --> сильно меня это смущает, хардкодить конкретную форму
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


