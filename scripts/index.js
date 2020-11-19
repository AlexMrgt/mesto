const overlay = document.querySelector(".overlay");

const editModal = document.querySelector(".popup_scope_edit");
const editForm = editModal.querySelector(".popup__form_scope_edit");
const editName = editForm.querySelector(".popup__form-field_scope_name");
const editDescription = editForm.querySelector(".popup__form-field_scope_description");
const editCloseButton = editForm.querySelector(".popup__close-popup");

const addModal =  document.querySelector(".popup_scope_add");
const addForm = addModal.querySelector(".popup__form_scope_add");
const addPlaceName = addForm.querySelector(".popup__form-field_scope_place-name");
const addPlaceUrl = addForm.querySelector(".popup__form-field_scope_place-url");
const addCloseButton = addForm.querySelector(".popup__close-popup");

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

const defaultCardsProperties = [
  {
    caption:" Гора Эльбрус",
    url: "./images//gallery/Эльбрус.jpg",
    alt:"Фото горы Эльбрус"
  },

  {
    caption:"Аракульские Шиханы",
    url: "./images/gallery/Шиханы.jpg",
    alt: "Фото Аракульских Шиханов"
  },

  {
    caption:"Джейъаско-Ассинский заповедник",
    url: "./images/gallery/Джейъаско-Ассинский_заповедник.jpg",
    alt: "Фото Джейъаско-Ассинского заповедника",
  },

  {
    caption: "Ключевая сопка",
    url: "./images/gallery/Ключевая_сопка.jpg",
    alt: "Фото вулкана Ключевая Сопка"
  },

  {
    caption: "Кунгурская_пещера",
    url: "./images/gallery/Кунгурская_пещера.jpg",
    alt: "Фото Кунгурской пещеры"
  },

  {
    caption: "Ленские столбы",
    url: "./images/gallery/Ленские_столбы.jpg",
    alt: "Фото Ленских столбов"
  },
]

/*С именованием ф-ий/переменных не очень понятно: слово add обычно используется
  именно как описание фунционала, т.е. ф-я что-то добавляет,
  а тут add/edit - это просто идентификатор попапа,
  мне кажется, это неправильно, но не знаю как иначе.
*/

function openModal(modal) {

  overlay.classList.add("overlay_active");
  modal.classList.add("popup_active");

  if (modal.classList.contains("popup_scope_edit"))
    setFormDefaultValues();
}

function closeModal(modal) {

  overlay.classList.remove("overlay_active");
  modal.classList.remove("popup_active");

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

  card.querySelector(".card__picture").src = sourse;
  card.querySelector(".card__picture").alt = alternative;
  card.querySelector(".card__title").textContent = title;

  card.querySelector(".card__like").addEventListener('click', evt => {

    evt.target.classList.toggle('card__like_active');
  });

  /* Не уверен, что удаление карточки должно осуществляться таким образом,
    то выглядит не универсально, что если родителем кнопки
    будет не сама карточка, а какой-то div на ней
  */
  card.querySelector(".card__delete-card").addEventListener('click', evt => {

    evt.target.parentElement.remove();

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

function setCardPopupContent(src, caption){

  cardModalPicture.src = src;
  cardModalCaption.textContent = caption;
}

renderDefaultCards(defaultCardsProperties);

profileEditButton.addEventListener("click", () => {

  openModal(editModal);
})
editCloseButton.addEventListener("click", () => {

  closeModal(editModal);
})
editForm.addEventListener("submit", editFormSubmitHandler);

profileAddButton.addEventListener("click", () => {

  openModal(addModal);
})
addCloseButton.addEventListener("click", () => {

  closeModal(addModal);
})
addForm.addEventListener("submit", addFormSubmitHandler);

cardModalClose.addEventListener("click", () => {

  closeModal(cardModal);
})
