// Import CSS files for Webpack
import "./index.css";

// Import Classes
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";

// Import Constants
import {
  initialCards,
  validationSettings,
  forms,
  profileEditButton,
  profileAddButton
} from "../utils/constants.js";

const userInfo = new UserInfo({
  nameSelector: '.profile__title', 
  jobSelector: '.profile__job'
});

// Image Popup 
const popupWithImage = new PopupWithImage('.popup_type_image');
popupWithImage.setEventListeners();

// Calls the Section class, to create a list of cards and adds them to the DOM
const cardsList = new Section({
  items: initialCards,
  renderer: (item)  => {
    const handleCardClick = (cardName, cardLink) => {
      popupWithImage.open(cardName, cardLink);
    };
    const card = new Card(item.name, item.link, '.template-card', handleCardClick).createCard();

    cardsList.addItems(card);
  }
}, '.cards__list');

// Enable FormValidator
forms.forEach((form) => {
  new FormValidator(form, validationSettings).enableValidation();
});

// Edit Profile Popup Form and Submit
const profileSubmitHandler = (inputValues) => {
  userInfo.setUserInfo(inputValues.title, inputValues.detail);
}
const editPopupForm = new PopupWithForm('.popup_type_edit', profileSubmitHandler);
editPopupForm.setEventListeners();



// Add Place Popup Form and Submit



// Open Form Event Listeners
profileEditButton.addEventListener('click', () => {
  const {name, job} = userInfo.getUserInfo();
  editPopupForm.open(name, job);
});

cardsList.renderItems();

