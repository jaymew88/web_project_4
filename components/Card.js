export class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  // Clones Template Card
  _getTemplate() {
    const CardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card') 
      .cloneNode(true);

      return CardElement;
  }

  // Event Listeners
  // Opens Image Popup
  _setEventListeners() {
    this._element.addEventListener ('click', () => {

      const imagePopupWindow = document.querySelector('.popup_type_image');
      const imagePopup = imagePopupWindow.querySelector('.popup__img');
      const imageTitlePopup = imagePopupWindow.querySelector('.popup__img-title');
      
      imagePopup.src = this._link;
      imageTitlePopup.textContent = this._name;
      imagePopup.alt = this._name;

      imagePopupWindow.classList.toggle('popup_opened');
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

    this._element.querySelector('.card__img').src = this._link;
    this._element.querySelector('.card__img').alt = this._name;
    this._element.querySelector('.card__name').textContent = this._name;
    
    return this._element;
  }
}

