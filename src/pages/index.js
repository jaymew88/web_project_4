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
  validationSettings,
  forms,
  nameInput,
  aboutInput,
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

const userInfo = new UserInfo({ 
  nameSelector: '.profile__title', 
  jobSelector: '.profile__job',
  //picSelector: '.profile__pic'
});

api.getAppInfo() 
  .then(([cardsList, userInfoData]) => {
    api.getInitialCards()
    .then((res) => {
      console.log(res);
 
     const cardList = new Section({
       items: cardsList,
       renderer: (element)  => {
         const card = renderCard(element);
         cardList.addItems(card);
       }
     }, '.cards__list');
     cardList.renderItems();

     userInfo.setUserInfo({ name: userInfoData.name, about: userInfoData.about })
    })
    .catch((err) => {
      console.log(err);
    });
  });





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

function editProfileSubmitHandler({ 'name-input': name, 'job-input':about }) {
  userInfo.setUserInfo({ name, about });
}

function addPlaceSubmitHandler() {
  return api.newCard({ name, link }).then ((cardData) => {
    cardsList.addItems(renderCard({ cardData }))
  });
}

// Event Listeners
popupWithImage.setEventListeners();

profileEditPopupForm.setEventListeners();
profileEditButton.addEventListener('click', () => {
  const inputs = userInfo.getUserInfo();
  nameInput.value = inputs.name;
  aboutInput.value = inputs.about;
  profileEditPopupForm.open();
});

addPlacePopupForm.setEventListeners();
profileAddButton.addEventListener('click', () => addPlacePopupForm.open());


