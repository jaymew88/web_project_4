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
  editUserButton,
  editAvatarButton,
  addCardButton
} from "../utils/constants.js";

// API 
const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-1",
  headers: {
    authorization: "221729e2-57e6-4114-b977-8051f88d50cb",
    "Content-Type": "application/json"
  }
});

// Handlers
function handleCardClick(data) {
  popupWithImage.open(data);
}

function handleLikeButtonClick({ cardLiked, cardId }) {
  return api.updateLike({ cardLiked, cardId }) 
  .then((cardItem) => {
    return cardItem.likes;
  });
}

function renderCard({ cardItem, userId }) {
  const userLikedCard = cardItem.likes
  .map((usersLiked) => usersLiked._id)
  .includes(userId);
  const card = new Card({ 
    cardItem, 
    popup: PopupWithImage, 
    userId,
    handleCardClick,
    handleDeleteClick: () => { 
      deleteCardConfirmation.open({ cardId: cardItem._id })
    },
    handleLikeButtonClick,
    userLikedCard,
  }, 
    '.template-card');

    cardClass[cardItem._id] = card;
    return card.createCard();
}

// Add Place
function addPlaceSubmitHandler({
  'place-input': imageTitle,
  'image-input': imageLink
}) {
   api.newCard({ name: imageTitle, link: imageLink })
    .then((cardItem) => {
      cardList.addItems(renderCard({ cardItem, likes: cardItem.likes, cardId: cardItem._id, owner: cardItem.owner._id, handleDeleteClick: () =>
        deleteCardConfirmation.open({ cardId: cardItem._id }) }));
      addCardPopupForm.close();
      addCardPopupForm.renderLoading(false);
    })
  } 

// Profile Description
function editProfileSubmitHandler({ 
  'name-input': name, 
  'job-input':about
 }) {
    return api.editUserInfo({ name: name, about: about })
      .then(({ name: newName, about: newJob }) => {
          userInfo.setUserInfo({ name: newName, about: newJob });
          editUserPopupForm.close();
          editUserPopupForm.renderLoading(false);
      })
  }

// Edit Avatar 
function editAvatarSubmitHandler({
  'edit-pic': avatar,
}) {
     api.setUserAvatar({avatar})
      .then(() => {
        userInfo.setUserAvatar({avatar});
        editAvatarFormPopup.close();
        editAvatarFormPopup.renderLoading(false);
      })
    }

// Confirm Delete
const cardClass = {};
function deleteCardSubmitHandler({ cardId }) {
  api.deleteCard(cardId).then(() => { 
    cardClass[cardId].removeCard();
    delete cardClass[cardId];
    deleteCardConfirmation.close();
    deleteCardConfirmation.renderLoading(false);
  });
}

// Class Instances
const userInfo = new UserInfo({ 
  nameSelector: '.profile__title', 
  jobSelector: '.profile__job',
  avatarSelector: '.profile__avatar-img'
});

const editUserPopupForm = new PopupWithForm(
  editProfileSubmitHandler, 
  "Saving...",
  '.popup_type_edit');

const addCardPopupForm = new PopupWithForm(
  addPlaceSubmitHandler, 
  "Saving...",
  '.popup_type_add-place');

const editAvatarFormPopup = new PopupWithForm(
  editAvatarSubmitHandler,
  "Saving..." ,
  '.popup_type_edit-pic');

const deleteCardConfirmation = new PopupWithForm(
  deleteCardSubmitHandler,
  "Deleting...",
  '.popup_type_delete' );

const popupWithImage = new PopupWithImage('.popup_type_image');

const cardList = new Section({
  items: [],
  renderer: ()  => {
  }
}, '.cards__list');

// Returns a Promise.all and loads initialCards and userInfoData 
  api.getAppInfo().then(([initialCards, userInfoData]) => {
    const userId = userInfoData._id;

    // Load initial cards
    initialCards.forEach((cardItem) => {
      cardList.addItems(renderCard({ cardItem, userId }));
    })

    // Load user info
    userInfo.setUserInfo({ name: userInfoData.name, about: userInfoData.about });
    userInfo.setUserAvatar({ avatar: userInfoData.avatar });
  })

//Form Validators
forms.forEach((form) => {
  const formValidator = new FormValidator(form, validationSettings);
  formValidator.enableValidation();
});

// Event Listeners
popupWithImage.setEventListeners();

deleteCardConfirmation.setEventListeners();

addCardPopupForm.setEventListeners();
addCardButton.addEventListener('click', () => addCardPopupForm.open([null, null]));

editUserPopupForm.setEventListeners();
editUserButton.addEventListener('click', () => {
  userInfo.getUserInfo();
  editUserPopupForm.open();
});

editAvatarFormPopup.setEventListeners();
editAvatarButton.addEventListener('click', () => editAvatarFormPopup.open());