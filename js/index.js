// Imports 
import {Card} from "./Card.js";
import {FormValidator} from "./FormValidator.js";

// Initial Cards to be loaded 
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

// Validation settings
const validationSettings = {
  formSelector: ".popup__form", 
  inputSelector: ".popup__field", 
  submitButtonSelector: ".popup__button_role_save",
  inactiveButtonClass: "popup__button_role_inactive",
  inputErrorClass: "popup__field_type_error", 
  errorClass: "popup__field-error_active" 
};

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

//Profile Fields
const nameNew = document.querySelector('.profile__title');
const jobNew = document.querySelector('.profile__job');

// Buttons
const profileEditButton = document.querySelector('.profile__button_role_edit');
const profileAddButton = document.querySelector('.profile__button_role_add');
const editCloseButton = editPopupWindow.querySelector('.popup__button_role_close');
const addPlaceCloseButton = addPlacePopupWindow.querySelector('.popup__button_role_close');
const imageCloseButton = imagePopupWindow.querySelector('.popup__button_role_close');

// Enable FormValidator
new FormValidator(editPopupWindow, validationSettings).enableValidation();
new FormValidator(addPlacePopupWindow, validationSettings).enableValidation();

// Takes createCard function and adds it to the list of cards in the HTML
function renderCard(element) {
  const newElement = new Card(element, '.template-card').createCard();
  const cardsList = document.querySelector('.cards__list');

  cardsList.prepend(newElement);
}

function initProfileForm() {
  // Enables submit button active upon editPopup Open
  nameInput.value = nameNew.textContent;
  jobInput.value = jobNew.textContent;
}

// Function to open/close popup windows
function togglePopup(popup) {
  popup.classList.toggle('popup_opened');

  // Popup closes with Esc key
  window.addEventListener('keyup', (e) => {
    if (e.keyCode == 27) {
    togglePopup(popup);
    e.preventDefault();
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

// Add Card Form Event Listener 
addForm.addEventListener('submit', (e) => {
  e.preventDefault();
  renderCard({name: imageTitleInput.value, link: imageLinkInput.value});
  addForm.reset();
  togglePopup(addPlacePopupWindow);
});

// Edit Profile Form Event Listener
editForm.addEventListener('submit', (e) => {
  e.preventDefault();
  nameNew.textContent = nameInput.value;
  jobNew.textContent = jobInput.value
  togglePopup(editPopupWindow);
});

// Profile 
profileEditButton.addEventListener('click', () => {
  initProfileForm();  
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

// Loops initialCards array, renders a card for each item in array and add it to the DOM
initialCards.forEach(element => renderCard(element));



