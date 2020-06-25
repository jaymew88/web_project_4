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

// Image Popup 
const popupWithImage = new PopupWithImage('.popup_type_image');

// Calls the Card class and creates a new card
//function renderCard(item) {
  //const card = new Card({item, handleCardClick: ({name, link}) => {
    //popupWithImage.open(name, link);
  //}
    //}, '.template-card');

    //const cardElement = card.createCard();
    //return cardElement;//
//}

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
  const newFormValidator = new FormValidator(form, validationSettings);
  newFormValidator.enableValidation();
});



cardsList.renderItems();

