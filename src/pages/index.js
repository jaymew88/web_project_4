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


const profileEditPopupForm = new PopupWithForm('.popup_type_edit', editProfileSubmitHandler);
const popupWithImage = new PopupWithImage('.popup_type_image');
  
// Function that returns items after a Promise.all
api.getAppInfo()
  .then(([cardsList, userInfoData]) => {
    const cardList = new Section({
    items: cardsList,
    renderer: (data)  => {
      const card = renderCard({ data });
      cardList.addItems(card);
    }
  }, '.cards__list');
  cardList.renderItems();

  function renderCard({ data }) {
    const card = new Card({ 
      data, 
      popup: PopupWithImage, 
      handleCardClick}, 
      '.template-card');
      return card.createCard();
  }

  userInfo.setUserInfo({ name: userInfoData.name, about: userInfoData.about })

  // Add place popup
  const addPlacePopupForm = new PopupWithForm('.popup_type_add-place', addPlaceSubmitHandler);
  addPlacePopupForm.setEventListeners();
  profileAddButton.addEventListener('click', () => addPlacePopupForm.open());

  function addPlaceSubmitHandler({
    'place-input': imageTitle,
    'image-input': imageLink
  }) {
  return api.newCard({ name: imageTitle, link: imageLink }).then ((data) => {
    cardsList.addItems(renderCard({ data }))
  });
  } 

}); // End getAppInfo Function


// Handlers
function handleCardClick(data) {
  popupWithImage.open(data);
}



function editProfileSubmitHandler({ 'name-input': name, 'job-input':about }) {
  userInfo.setUserInfo({ name, about });
}

//Form Validators
forms.forEach((form) => {
  const formValidator = new FormValidator(form, validationSettings);
  formValidator.enableValidation();
});

// Event Listeners
popupWithImage.setEventListeners();

profileEditPopupForm.setEventListeners();
profileEditButton.addEventListener('click', () => {
  const inputs = userInfo.getUserInfo();
  nameInput.value = inputs.name;
  aboutInput.value = inputs.about;
  profileEditPopupForm.open();
});