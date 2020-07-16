// Import CSS files for Webpack
import "./index.css";

// Import Classes
import Api from "../components/Api.js";
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
  nameInput,
  jobInput,
  profileEditButton,
  profileAddButton
} from "../utils/constants.js";

// API Initialization
const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-1",
  headers: {
    authorization: "221729e2-57e6-4114-b977-8051f88d50cb",
    "Content-Type": "application/json"
  }
});

// Class Instances 
const userInfo = new UserInfo({ 
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

function editProfileSubmitHandler({ 'name-input': name, 'job-input':job }) {
  userInfo.setUserInfo({ name, job });
}

function addPlaceSubmitHandler(e){
  cardsList.addItems(renderCard(e));
}

// Event Listeners
popupWithImage.setEventListeners();

profileEditPopupForm.setEventListeners();
profileEditButton.addEventListener('click', () => {
  const inputs = userInfo.getUserInfo();
  nameInput.value = inputs.name;
  jobInput.value = inputs.job;
  profileEditPopupForm.open();
});

addPlacePopupForm.setEventListeners();
profileAddButton.addEventListener('click', () => addPlacePopupForm.open());


