export default class Card {
  constructor({ cardItem, handleCardClick, handleDeleteClick, handleLikeButtonClick, userLikedCard }, cardSelector, userId) 
    {
    this._name = cardItem.name;
    this._link = cardItem.link;
    this._cardId = cardItem._id;
    this._owner = cardItem.owner._id;
    this._likes = cardItem.likes;
    this._user = userId;
    this._handleCardClick = handleCardClick;
    this._userLikedCard = userLikedCard;
    this._handleLikeButtonClick = handleLikeButtonClick;
    this._handleDeleteClick = handleDeleteClick;
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

  _likeCard(likes) {
    this.likes = likes;
    this._element.querySelector('.card__like-count').textContent = likes.length;
    this._element.querySelector('.card__like-button').classList.toggle('card__like-button_active');
  }

  _handleLikeClick(likeButton) {
    this._handleLikeButtonClick({
      cardLiked: !likeButton.classList.contains(
        'card__like-button_active',
      ),
      cardId: this._cardId,}).then((likes) =>{
        this._likeCard(likes);
      });
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    // Image Popup
    this._element.querySelector('.card__img')
    .addEventListener ('click', () => {
      this._handleCardClick({
        name: this._name,
        link: this._link
      });
    });
   
    // Delete Button
    this._element.querySelector('.card__delete-button')
    .addEventListener('click', () => {
        const cardItem = this._element
          .querySelector('.card__delete-button')
          .closest('.card');
        this._handleDeleteClick(cardItem);
     });

     //Like Button
    const likeButton = this._element.querySelector('.card__like-button');
      likeButton.addEventListener('click', () =>
        this._handleLikeClick(likeButton),
      );
    }
    //  this._element.querySelector('.card__like-button')
    //   .addEventListener('click', (e) => {
    //     const hasLikes = this._element.querySelector('.card__like-button')
    //       .classList.contains('card__like-button_active');
    //     this._handleLikeClick(hasLikes);
    //     e.target.classList.toggle('card__like-button_active');
    //  });
    // }
  
  // Creates a card from the template
  createCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    if (this._owner !== this._user) {
      this._element.querySelector('.card__delete-button').style.display = "none";
      }
      
    if (this._userLikedCard) {
          this._element.querySelector('.card__like-button').classList.add('card__like-button_active');
     }

    this._element.querySelector('.card__img').src = this._link;
    this._element.querySelector('.card__img').alt = this._name;
    this._element.querySelector('.card__name').textContent = this._name;
    this._element.querySelector('.card__like-count').textContent = this._likes.length;
    
    return this._element;
  }
}

// IN CREATE CARD
 //Delete card only if it belongs to User
//  if (this._owner !== this._user) {
//   this._element
//   .querySelector('.card__delete-button')
//   .style.display = "none";
// } else {
//   this._element.querySelector('.card__delete-button').name = this._id;
//   this._element.querySelector('.card__like-button').name = this._id;
// }