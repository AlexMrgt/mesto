
let overlay = document.querySelector(".overlay");

let editModal = document.querySelector(".popup");
let editForm = editModal.querySelector(".popup__form");
let editName = editForm.querySelector(".popup__edit-field_scope_name");
let editDescription = editForm.querySelector(".popup__edit-field_scope_description");
let editCloseButton = editForm.querySelector(".popup__close-button");

let profile = document.querySelector(".profile");
let profileName = profile.querySelector(".profile__name");
let profileDescription = profile.querySelector(".profile__description");
let profileEditButton = profile.querySelector(".profile__edit-button");

/* Этот коменнтарий относился к секции profile. Если вводить слишком
    длинные имена и описания, то вся верска может уехать.
*/

function openModal(modal) {

  if (modal == null) return;

  modal.classList.add("popup_active");
  overlay.classList.add("overlay_active");

  setFormDefaultValues();
}

function setFormDefaultValues() {

  editName.value = profileName.textContent;
  editDescription.value = profileDescription.textContent;
}

function closeModal(modal) {

  modal.classList.remove("popup_active");
  overlay.classList.remove("overlay_active");
}

function formSubmitHandler(evt) {

  evt.preventDefault();

  profileName.textContent = editName.value;
  profileDescription.textContent = editDescription.value;

  closeModal(editModal);
}

profileEditButton.addEventListener("click", () => {

  openModal(editModal);
})

editCloseButton.addEventListener("click", () => {

  closeModal(editModal);
})

editForm.addEventListener("submit", formSubmitHandler);
