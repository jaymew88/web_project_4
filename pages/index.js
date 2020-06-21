// Imports 
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";

import "./index.css";
//import { Section } from "../components/Section";

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

// Cards List 
const cardsList = document.querySelector('.cards__list');

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

// Enables submit button active upon Edit Popup Open
function initProfileForm() {
  nameInput.value = nameNew.textContent;
  jobInput.value = jobNew.textContent;
}

// Disables submit for upon Add Place Form
function initPlaceForm() {
  imageTitleInput.value = null;
  imageLinkInput.value = null;
} 

// Function to open/close popup windows
function togglePopup(popup) {
  popup.classList.toggle('popup_opened');

// Popup closes with Esc key
  window.addEventListener('keyup', (e) => {
    if (e.keyCode === 27 && document.querySelector('.popup_opened')) { 
      togglePopup(popup);
    }
  });
}

// Takes createCard function and adds it to the list of cards in the HTML
function renderCard(element) {
  const newElement = new Card(element, '.template-card').createCard();

  cardsList.prepend(newElement);
}


// Enable FormValidator
new FormValidator(editForm, validationSettings).enableValidation();
new FormValidator(addForm, validationSettings).enableValidation();

// Profile Popup Open Button
profileEditButton.addEventListener('click', () => {
  initProfileForm();  
  togglePopup(editPopupWindow);
}); 

// Add Place Open Popup Button
profileAddButton.addEventListener('click', () => {
  initPlaceForm();
  togglePopup(addPlacePopupWindow);
});

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
  jobNew.textContent = jobInput.value;
  togglePopup(editPopupWindow);
});

// Edit Popup Close Button 
editCloseButton.addEventListener('click', () => {
  togglePopup(editPopupWindow);
});
// Add Place Close Popup Button
addPlaceCloseButton.addEventListener('click', () => {
  togglePopup(addPlacePopupWindow);
});
// Image Popup Close Button
imageCloseButton.addEventListener('click', () => {
  togglePopup(imagePopupWindow);
});
// Popups close with overlay click
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('popup')) {
    togglePopup(e.target);
    e.preventDefault();
  }
});

// Loops initialCards array, renders a card for each item in array and add it to the DOM
initialCards.forEach(element => renderCard(element));

// Enables submit button active upon page load
nameInput.value = nameNew.textContent;
jobInput.value = jobNew.textContent;
