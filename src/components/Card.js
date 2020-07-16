export default class Card {
  constructor({ name, link, handleCardClick }, cardSelector, user) {
    this._name = name;
    this._link = link;
    this._handleCardClick = handleCardClick;
    this._cardSelector = cardSelector;
    this._user = user;
  }

  // Clones Template Card
  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card') 
      .cloneNode(true);
  }

  _setEventListeners() {
    this._element.querySelector('.card__img')
    .addEventListener ('click', () => {
      this._handleCardClick({
        name: this._name,
        link: this._link
      });
    });
    
  // Removes card
    this._element.querySelector('.card__delete-button')
    .addEventListener('click', (e) => {
      e.target.parentElement.remove();
    });

  // Click change heart color
    this._element.querySelector('.card__like-button')
    .addEventListener('click', (e) => {
      e.target.classList.toggle('card__like-button_active');
    });
  }

  // Creates a card from the template
  createCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.card__img').src = this._link;
    this._element.querySelector('.card__img').alt = this._name;
    this._element.querySelector('.card__name').textContent = this._name;
    
    return this._element;
  }
}

