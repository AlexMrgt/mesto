

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

function setCardPopupContent(popup, src, caption, alt = caption) {

  const popupImage = popup.querySelector('.card-popup__image');

  popupImage.src = src;
  popupImage.alt = alt;
  popup.querySelector(".card-popup__caption").textContent = caption;
}

function closeByEsc(evt) {

  if (evt.key === "Escape") {
    const currentModal = document.querySelector(".popup_active");
    closeModal(currentModal);
  }
}

function closeByOverlay(evt) {

  if (evt.target.classList.contains("popup")) {
    const currentModal = document.querySelector(".popup_active");
    closeModal(currentModal);
  }
}

export {openModal, closeModal, setCardPopupContent};
