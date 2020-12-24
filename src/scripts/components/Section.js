export default class Section {

  constructor({ contentList, renderer }, containerSelector) {

    this._contentList = contentList;
    this._renderer = renderer;

    this._container = document.querySelector(containerSelector);
  }

  render() {

    this._contentList.forEach((contentItem) => {
      this._renderer(contentItem);
    })
  }

  // не уверен, что использование флагов - лучший выход
  addItem(element, isCardFromAddForm = false) {

    (isCardFromAddForm)
      ? this._container.prepend(element)
      : this._container.append(element);

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


