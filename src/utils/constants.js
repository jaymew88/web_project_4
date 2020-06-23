// ALL const that are from index.js; initial const list and any others

// Initial Cards to be loaded 
export const initialCards = [
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
export const validationSettings = {
  formSelector: ".popup__form", 
  inputSelector: ".popup__field", 
  submitButtonSelector: ".popup__button_role_save",
  inactiveButtonClass: "popup__button_role_inactive",
  inputErrorClass: "popup__field_type_error", 
  errorClass: "popup__field-error_active" 
};

// Popups
export const editPopupWindow = document.querySelector('.popup_type_edit');
export const addPlacePopupWindow = document.querySelector('.popup_type_add-place');
export const imagePopupWindow = document.querySelector('.popup_type_image');

// Popup Forms
export const addForm = addPlacePopupWindow.querySelector('.popup__form');
export const editForm = editPopupWindow.querySelector('.popup__form');

//Form Fields
export const nameInput = editPopupWindow.querySelector('.popup__field_content_name');
export const jobInput = editPopupWindow.querySelector('.popup__field_content_job');
export const imageTitleInput = addPlacePopupWindow.querySelector('.popup__field_place_name');
export const imageLinkInput = addPlacePopupWindow.querySelector('.popup__field_place_image');

//Profile Fields
export const nameNew = document.querySelector('.profile__title');
export const jobNew = document.querySelector('.profile__job');

// Buttons
export const profileEditButton = document.querySelector('.profile__button_role_edit');
export const profileAddButton = document.querySelector('.profile__button_role_add');
export const editCloseButton = editPopupWindow.querySelector('.popup__button_role_close');
export const addPlaceCloseButton = addPlacePopupWindow.querySelector('.popup__button_role_close');
export const imageCloseButton = imagePopupWindow.querySelector('.popup__button_role_close');