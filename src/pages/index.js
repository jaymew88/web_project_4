// Import CSS files for Webpack
import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import {
  initialCards,
  validationSettings,
  forms,
  profileEditButton,
  profileAddButton
} from "../utils/constants.js";

// Class Instances 
const profileInfo = new UserInfo({ 
  nameSelector: '.profile__title', 
  jobSelector: '.profile__job' 
});

const cardsList = new Section({
  items: initialCards,
  renderer: (element)  => {
    const card = renderCard(element);
    cardsList.addItems(card);
  }
}, '.cards__list');
cardsList.renderItems();

const profileEditPopupForm = new PopupWithForm('.popup_type_edit', editProfileSubmitHandler);

const addPlacePopupForm = new PopupWithForm('.popup_type_add-place', addPlaceSubmitHandler);

const popupWithImage = new PopupWithImage('.popup_type_image');

//Form Validators
forms.forEach((form) => {
  const formValidator = new FormValidator(form, validationSettings);
  formValidator.enableValidation();
});

// Handlers
function handleCardClick(data) {
  popupWithImage.open(data);
}

function renderCard(element) {
  const card = new Card({ ...element, popup: PopupWithImage, handleCardClick}, 
    '.template-card');
    return card.createCard();
}

function editProfileSubmitHandler(name, job) {
  profileInfo.setUserInfo(name, job);
}

function addPlaceSubmitHandler(e){
  cardsList.addItems(renderCard(e));
}

// Event Listeners
popupWithImage.setEventListeners();

profileEditPopupForm.setEventListeners();
profileEditButton.addEventListener('click', () => {
  profileInfo.getUserInfo();
  profileEditPopupForm.open();
});

addPlacePopupForm.setEventListeners();
profileAddButton.addEventListener('click', () => addPlacePopupForm.open());


