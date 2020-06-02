// Sets the Initial Cards to be loaded 
const initialCards = [
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg"
  },
  {
    name: "Vanois National Park",
    link: "https://code.s3.yandex.net/web-code/vanois.jpg"
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  }
];

// Popups
const editPopupWindow = document.querySelector('.popup_type_edit');
const addPlacePopupWindow = document.querySelector('.popup_type_add-place');
const imagePopupWindow = document.querySelector('.popup_type_image');

// Popup Forms
const addForm = addPlacePopupWindow.querySelector('.popup__form');
const editForm = editPopupWindow.querySelector('.popup__form');

//Form Fields
const nameInput = editPopupWindow.querySelector('.popup__field_content_name');
const jobInput = editPopupWindow.querySelector('.popup__field_content_job');
const imageTitleInput = addPlacePopupWindow.querySelector('.popup__field_place_name');
const imageLinkInput = addPlacePopupWindow.querySelector('.popup__field_place_image');

// Popup Image
const imagePopup = imagePopupWindow.querySelector('.popup__img');
const imageTitlePopup = imagePopupWindow.querySelector('.popup__img-title');

//Profile Fields
const nameNew = document.querySelector('.profile__title');
const jobNew = document.querySelector('.profile__job');


class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  // Clones Template Card
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card') 
      .cloneNode(true);

      return cardElement;
  }

  // Creates a card from the template
  createCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.card__img').src = this._link;
    this._element.querySelector('.card__img').alt = this._name;
    this._element.querySelector('.card__name').textContent = this._name;
    this._setImageEventListeners();
    this._setRemoveCardEventListener();
    this._setLikeEventListener();
   
    return this._element;
  }
  
  // Event Listeners
  // Opens Image
  _setImageEventListeners() {
    this._element.addEventListener ('click', (e) => {
      e.preventDefault();
      imagePopup.src = this._link;
      imageTitlePopup.textContent = this._name;
      imagePopup.alt = `${this._name}`;
      imagePopupWindow.classList.toggle('popup_opened');
      e.stopPropagation();
   });
  }
  // Removes card
  _setRemoveCardEventListener() {
    const elementDeleteButton = this._element.querySelector('.card__delete-button');
    elementDeleteButton.addEventListener('click', (e) => {
      e.preventDefault();
      e.target.parentElement.remove();
      e.stopPropagation();
    });
  }
  // Click change heart color
  _setLikeEventListener() {
    const elementLikeButton = this._element.querySelector('.card__like-button');
    elementLikeButton.addEventListener('click', (e) => {
      e.preventDefault();
      e.target.classList.toggle('card__like-button_active');
      e.stopPropagation();
    });
  }
}

// Loops initialCards array, renders a card for each item in array and add it to the DOM
initialCards.forEach((item) => {
  const card = new Card(item, '.template-card');
  const cardElement = card.createCard();

  document.querySelector('.cards__list').prepend(cardElement);
});



// Create New Place Form Submit Handler
addForm.addEventListener('submit', (e) => {
  e.preventDefault();

  renderCard({name: imageTitleInput.value, link: imageLinkInput.value});

  addForm.reset();
  togglePopup(addPlacePopupWindow);
});

// Form Submit Handler
editForm.addEventListener('submit', (e) => {
  e.preventDefault();

  nameNew.textContent = nameInput.value;
  jobNew.textContent = jobInput.value
  togglePopup(editPopupWindow);
});

// Enables submit button active upon page load
nameInput.value = nameNew.textContent;
jobInput.value = jobNew.textContent;

// MOVE TO indes.js
function togglePopup(popup) {
  popup.classList.toggle('popup_opened');

  // Popup closes with Esc key
  window.addEventListener('keyup', (e) => {
    if (e.keyCode == 27) {
    togglePopup(popup);
    }
  });

  // Popups close with overlay click
  popup.addEventListener('click', (e) => {
    if (e.target.classList.contains('popup')) {
      togglePopup(e.target);
      e.preventDefault();
    }
  });
}

// Buttons
const profileEditButton = document.querySelector('.profile__button_role_edit');
const profileAddButton = document.querySelector('.profile__button_role_add');
const editCloseButton = editPopupWindow.querySelector('.popup__button_role_close');
const addPlaceCloseButton = addPlacePopupWindow.querySelector('.popup__button_role_close');
const imageCloseButton = imagePopupWindow.querySelector('.popup__button_role_close');

// Profile 
profileEditButton.addEventListener('click', () => {
    togglePopup(editPopupWindow);
}); 
// Close Button
editCloseButton.addEventListener('click', () => {
  togglePopup(editPopupWindow);
});
// Add Place Open Popup
profileAddButton.addEventListener('click', () => {
  togglePopup(addPlacePopupWindow);
});
// Add Place Close Popup
addPlaceCloseButton.addEventListener('click', () => {
  togglePopup(addPlacePopupWindow);
});
// Image Popup
imageCloseButton.addEventListener('click', () => {
  togglePopup(imagePopupWindow);
});