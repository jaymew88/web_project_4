export default class Card {
  constructor({ data, handleCardClick }, cardSelector, user) {
    this._name = data.name;
    this._link = data.link;
    this._cardId = data._id;
    this._owner = data.owner._id;
    this._likes = data.likes;
    this._handleCardClick = handleCardClick;
   // this._handleDeleteClick = handleDeleteClick;
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

    // Delete card only if it belongs to User
    if(this._owner !== this._user) {
      this._element
      .querySelector('.card__delete-button')
      .classList.remove('.card__like-button_active');
    }

    // Add like counts
    // if(this.__likedCard) {
    //   this._element
    //   .querySelector('.card__like-button')
    //   .classList.add('.card__like-button_active');
    // }

    this._element.querySelector('.card__img').src = this._link;
    this._element.querySelector('.card__img').alt = this._name;
    this._element.querySelector('.card__name').textContent = this._name;
    // this._element.querySelector('.card__like-count').textContent = this._likes.length;
    
    return this._element;
  }
}

