export default class Card {
  constructor(cardName, cardLink, cardSelector, handleCardClick) {
    this._cardName = cardName;
    this._cardLink = cardLink;
    this._handleCardClick = handleCardClick;
    this._cardSelector = cardSelector;
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
    this._element.addEventListener ('click', (e) => {
      this._handleCardClick(this._cardName, this._cardLink);
      e.stopPropagation();
    });
    
  // Removes card
    const elementDeleteButton = this._element.querySelector('.card__delete-button');
    elementDeleteButton.addEventListener('click', (e) => {
      e.preventDefault();
      e.target.parentElement.remove();
      e.stopPropagation();
    });

  // Click change heart color
    const elementLikeButton = this._element.querySelector('.card__like-button');
    elementLikeButton.addEventListener('click', (e) => {
      e.preventDefault();
      e.target.classList.toggle('card__like-button_active');
      e.stopPropagation();
    });
  }

  // Creates a card from the template
  createCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.card__img').src = this._cardLink;
    this._element.querySelector('.card__img').alt = this._cardName;
    this._element.querySelector('.card__name').textContent = this._cardName;
    
    return this._element;
  }
}

