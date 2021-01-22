import './index.css';

import Card from "../scripts/components/Card.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupConfirm from '../scripts/components/PopupConfirm';
import Section from "../scripts/components/Section.js";
import UserInfo from "../scripts/components/UserUnfo.js";
import FormValidator from "../scripts/components/FornValidator.js";
import Api from "../scripts/components/Api.js";

import {
  editForm,
  addForm,
  editAvatarForm,
  profileEditButton, profileAddButton, profileEditImageButton,
  editSubmitButton, editImageSubmitButton, addSubmitButton,
  gallerySelector,
  editFormConfig, addFormConfig, editAvatarFormConfig
} from "../scripts/utils/variables.js";


// функции, наверное, надо убрать куда-то
const renderLoading = (button, isLoading) => {

  if (isLoading) {

    button.textContent = 'Сохранение...';
  }
  else {

    button.textContent = button.defaultText; // если кто-то другой откроет код, то как этому человеку понять, где изначально появилось свойство defaultText? GoToDefenition по свойству не работает
  }
};

const createRawCard = (userId, cardContent) => {

  const card = new Card(
    userId,
    {
      cardContent: cardContent,

      selectors: {

        templateSelector: '#card-template',
        modalSelector: ".popup_scope_picture"
      },

      handlers: {

        handleCardClick: (url, text) => {

          cardPopup.open(url, text);
        },

        handleLikeClick: (cardId, isLiked, evt) => {

          if (isLiked) {

            api.deleteLike(cardId)
              .then(refreshedCard => {

                card.setLikes(refreshedCard.likes.length, evt);
              })
              .catch(err => {
                console.log(`Error text: ${err} `)
              })
          }
          else {

            api.setLike(cardId)
              .then(refreshedCard => {

                card.setLikes(refreshedCard.likes.length, evt);
              })
              .catch(err => {
                console.log(`Error text: ${err} `)
              })
          }
        },

        handleDeleteClick: (cardId, evt) => {

          confirmPopup.open();
          confirmPopup.setSubmitAction(() => {

            api.deleteCard(cardId)
              .then(() => {

                card.removeCard(evt);
                confirmPopup.close();
              })
              .catch(err => {
                console.log(`ERROR TEXT: ${err}`);
              });
          });
        }
      },

      pushDeleteEvent: () => {

        gallery.checkCardsAmount();
      }
    },
  );

  return card;
}


let currentUserId = ''; // выглядит не очень хорошо


profileEditButton.addEventListener("click", () => {

  editPopup.open(profileInfo.getUserInfo());

  editFormValidation.resetValidation();
})

profileAddButton.addEventListener("click", () => {

  addPopup.open();

  addFormValidation.resetValidation();
})

profileEditImageButton.addEventListener("click", () => {

  editImagePopup.open();

  editAvatarFormValidation.resetValidation();
})


const profileInfo = new UserInfo({
  nameSelector: '.profile__name',
  descriptionSelector: '.profile__description',
  avatarSelector: '.profile__photo'
});


const gallery = new Section({

  renderer: (userId, contentItem) => {

    const cardElement = createRawCard(userId, contentItem);
    gallery.addDefaultItem(cardElement.generateCard());
  }

}, gallerySelector
);


const api = new Api({

  baseUrl: 'https://mesto.nomoreparties.co/v1/',
  cohort: 'cohort-19',
  headers: {
    authorization: '27d54b31-347e-468f-bb4e-e4fee200824a',
  }
});


Promise.all([
  api.getUserInfo(),
  api.getDefaultCards()
])
  .then(values => {

    const [userData, cards] = values;
    currentUserId = userData._id;

    profileInfo.setFullUserInfo(userData); //как-то более понятно бы передать
    gallery.render(userData._id, cards);
  })
  .catch(err => {

    console.log(`Error text: ${err} `)
  });


const editPopup = new PopupWithForm({

  selectors: {

    popupSelector: '.popup_scope_edit',
    closeButtonSelector: '.popup__close-popup',
    formSelector: '.popup__form_scope_edit'
  },

  handler: {

    submitHandle: ({ name, description }) => {

      renderLoading(editSubmitButton, true);

      api.editTextUserInfo({ name, description }) // может без деструктуризации понятнее ?
        .then(({ name, about }) => {

          profileInfo.setTextUserInfo({ name, about });

          editPopup.close();

        })
        .catch(err => {
          console.log(`Error text: ${err} `)
        })
        .finally(() => {

          renderLoading(editSubmitButton, false);
        })


    }
  }
});

editPopup.setEventListeners();


const editImagePopup = new PopupWithForm({

  selectors: {

    popupSelector: '.popup_scope_edit-avatar',
    closeButtonSelector: '.popup__close-popup',
    formSelector: '.popup__form_scope_edit-avatar',
  },

  handler: {

    submitHandle: ({ ['avatar-url']: avatar }) => {

      renderLoading(editImageSubmitButton, true);

      api.editUserPhoto({ avatar })
        .then(responce => {

          profileInfo.setAvatar(responce.avatar);

          editImagePopup.close();
        })
        .catch(err => {
          console.log(`Error text: ${err} `)
        })
        .finally(() => {

          renderLoading(editImageSubmitButton, false);
        })


    }
  }
});

editImagePopup.setEventListeners();


const addPopup = new PopupWithForm({

  selectors: {

    popupSelector: '.popup_scope_add',
    closeButtonSelector: '.popup__close-popup',
    formSelector: '.popup__form_scope_add',
  },

  handler: {

    submitHandle: ({ ['place-name']: place, ['place-url']: url }) => {

      renderLoading(addSubmitButton, true);

      api.addNewCard({ place, url })
        .then(values => {

          const cardElement = createRawCard(currentUserId, values);
          gallery.addItem(cardElement.generateCard());

          addPopup.close();
        })
        .catch(err => {

          console.log(`Error text: ${err} `)
        })
        .finally(() => {

          renderLoading(addSubmitButton, false);
        });
    }
  }

});


addPopup.setEventListeners();


const cardPopup = new PopupWithImage({

  selectors: {

    popupSelector: '.popup_scope_picture',
    closeButtonSelector: '.popup__close-popup',
    imageSelector: '.card-popup__image',
    captionSelector: '.card-popup__caption'
  }
});

cardPopup.setEventListeners();


const confirmPopup = new PopupConfirm({
  selectors: {

    popupSelector: '.popup_scope_confirm-card-delete',
    closeButtonSelector: '.popup__close-popup',
    formSelector: '.popup__form_scope_confirm-delete'
  }
});

confirmPopup.setEventListeners();



const editFormValidation = new FormValidator(editFormConfig, editForm);
editFormValidation.enableValidation();

const addFormValidation = new FormValidator(addFormConfig, addForm);
addFormValidation.enableValidation();

const editAvatarFormValidation = new FormValidator(editAvatarFormConfig, editAvatarForm);
editAvatarFormValidation.enableValidation();





