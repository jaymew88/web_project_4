// Import CSS files for Webpack
import "./index.css";

// Import Classes
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";

// Import Constants
import {
  initialCards,
  validationSettings,
  editPopupWindow,
  addPlacePopupWindow,
  imagePopupWindow,
  addForm,
  editForm,
  nameInput,
  jobInput,
  imageTitleInput,
  imageLinkInput,
  nameNew,
  jobNew,
  profileEditButton,
  profileAddButton,
  editCloseButton,
  addPlaceCloseButton,
  imageCloseButton
} from "../utils/constants.js";


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
addForm.addEventListener('submit', (e, fieldInputs) => {
  e.preventDefault();
  // const newCard = new Card (fieldInputs.);
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

function createCard(cardElement) {
  const card = new Card({ ...cardElement, handleCardClick }, '.template-card');
  return card.generateCard();
}

const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item);
    cardsList.addItems(cardElement);
  }
}, '.cards__list');

cardsList.renderItem();

