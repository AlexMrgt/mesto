import { Card } from "../card/card.js";

// что-то с этим надо сделать
const cardsContainer = document.querySelector(".gallery");

function renderCard(card) {

  cardsContainer.prepend(card);
  renderHasCards();
}

function renderDefaultCards(defaultSourses) {

  defaultSourses.forEach(sourse => {

    const card = new Card(
      {
        cardContent: sourse,
        templateSelector: '#card-template',
        modalSelector: ".popup_scope_picture"
      });

    renderCard(card.generateCard());
  })
}

function renderNoCards() {

  cardsContainer.querySelector('.no-cards').classList.remove("no-cards_hidden");
}

function renderHasCards() {

  cardsContainer.querySelector('.no-cards').classList.add("no-cards_hidden");
}

export { cardsContainer, renderCard, renderDefaultCards, renderNoCards };
