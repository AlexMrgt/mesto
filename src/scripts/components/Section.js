export default class Section {

  constructor({ renderer }, containerSelector) {

    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  render(userId, contentList) {

    contentList.forEach((contentItem) => {
      this._renderer(userId, contentItem);
    })
  }

  addItem(element) {

    this._container.prepend(element)
    this.checkCardsAmount();
  }

  addDefaultItem(element) {

    this._container.append(element);
    this.checkCardsAmount();
  }

  checkCardsAmount() {

    if (!this._container.querySelector('.card')) {

      this._renderNoCards();
    }
    else {
      this._renderHasCards();
    }
  }

  _renderNoCards() {
    this._container.querySelector('.no-cards').classList.remove("no-cards_hidden");
  }

  _renderHasCards() {
    this._container.querySelector('.no-cards').classList.add("no-cards_hidden");
  }


}


