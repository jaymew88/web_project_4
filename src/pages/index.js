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

function handleDeleteClick(card) {
  deleteCardConfirmation.open([card])
}

function handleLikeButtonClick({cardLiked, cardId}) {
  if (cardLiked) {
    return api.addLike({cardId}).then((cardItem) => {
      return cardItem.likes;
    });
  } else {
    return api.removeLike({cardId}).then((cardItem) => {
      return cardItem.likes;
    });
  }
}

function renderCard({ cardItem }, userId) {
  const userLikedCard = cardItem.likes
  .map((usersLiked) => usersLiked._id)
  .includes(userId);
  const card = new Card({ 
    cardItem, 
    popup: PopupWithImage, 
    handleCardClick,
    handleDeleteClick,
    handleLikeButtonClick,
    userLikedCard,
  }, 
    '.template-card', userId);
  
   console.log(cardItem);

  return card.createCard(cardItem);
}

// Overlay Profile Description
function editProfileSubmitHandler({ 
  'name-input': name, 
  'job-input':about
 }) {
    return api.editUserInfo({ name: name, about: about })
      .then(({ name: newName, about: newJob }) => {
          userInfo.setUserInfo({ name: newName, about: newJob });
          editUserPopupForm.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        editUserPopupForm.renderLoading(false);
        editUserPopupForm._form.reset();
      });
  }

// Overlay Add Place
function addPlaceSubmitHandler({
  'place-input': imageTitle,
  'image-input': imageLink
}) {
    return api.newCard({ name: imageTitle, link: imageLink })
      .then ((data) => {
        cardsList.addItems(renderCard({ data }))
      })
      .catch((err) => console.log(err))
      .finally(() => {
        addCardPopupForm.renderLoading(false);
        addCardPopupForm._form.reset();
    });
  } 

// Overlay Edit Avatar 
function editAvatarSubmitHandler({
  'edit-pic': avatarLink,
}) {
    return api.setUserAvatar({ avatarLink })
      .then(() => {
        userInfo.setUserAvatar(avatarLink);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        editAvatarFormPopup.renderLoading(false);
        editAvatarFormPopup._form.reset();
      })
    }

// Overlay Confirm Delete
const cardItemDelete = {};
function deleteCardSubmitHandler({ cardId }) {
  return api.deleteCard({ cardId }).then(() => { 
    cardItemDelete[cardId].deleteCard();
    delete cardItemDelete[cardId];
  });
}
// function deleteCardSubmitHandler(cardItem) {
//   return api.deleteCard({cardItem}).then(() => {
//     cardItemDelete.remove();
//   });
// }



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
      cardList.addItems(renderCard({ cardItem }, userId));
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