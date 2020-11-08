let overlay = document.querySelector(".overlay");

let editButton = document.querySelector(".profile__edit-button");

let editModal = document.querySelector(".popup");
let editForm = editModal.querySelector(".popup__form");
let closeButton = editForm.querySelector(".popup__close-button");

function openModal(modal) {

    if (modal == null) return;

    modal.classList.add("popup_active");
    overlay.classList.add("overlay_active");

    /*тут, наверное, нужно написать какую-нибудь проверку на засылаемый modal:
        если один модал - тогда setFormDefaultValues(modal),
        если другой - другая ф-я, или вообще никакой функции не применяется.
        Но пока у нас всего одно модальное окно, так что проверки пока не нужны*/
    setFormDefaultValues(modal);
}

function setFormDefaultValues(modal){

    let profile = document.querySelector(".profile");

    modal.querySelector(".popup__name").value = profile.querySelector(".profile__name").innerHTML;
    modal.querySelector(".popup__description").value =  profile.querySelector(".profile__description").innerHTML;

    /*
      ↓   Можно и так. Это выглядит более развернуто, но функция простая,
          не уверен, что нужно так подробно расписывать.

    let nameField = profile.querySelector(".profile__name").innerHTML;
    let descriptionField =  profile.querySelector(".profile__description").innerHTML;

    let formNameField = modal.querySelector(".popup__name");
    let formDescriptionfield = modal.querySelector(".popup__description");

    formNameField.value = nameField;
    formDescriptionfield.value = descriptionField;
*/
}

function closeModal(modal){

    modal.classList.remove("popup_active");
    overlay.classList.remove("overlay_active");
}

/* Есть проблема длинных имен и описаний: если слишком длинные - то это убого выглядит.
      Думаю, что можно по условию >15 смиволов переносить на другую строку часть текста,
      вставляя символ переноса строки, но для этого надо как-то вытащить строку и сделать
      вставку, пока не знаю, как это реализовать.
  */

  function formSubmitHandler (evt) {

    evt.preventDefault();

    let nameInput  =  editForm.querySelector(".popup__name").value;
    let jobInput =  editForm.querySelector(".popup__description").value;

    let profile = document.querySelector(".profile");
    profile.querySelector(".profile__name").textContent = nameInput;
    profile.querySelector(".profile__description").textContent = jobInput;

    closeModal(editModal);
}

editButton.addEventListener("click", ()=> {

    openModal(editModal);
})

closeButton.addEventListener("click", ()=>{

    closeModal(editModal);
})

editForm.addEventListener("submit", formSubmitHandler);
