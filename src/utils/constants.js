// ALL const that are from index.js; initial const list and any others

// Validation settings
export const validationSettings = {
  formSelector: ".popup__form", 
  inputSelector: ".popup__field", 
  submitButtonSelector: ".popup__button_role_save",
  inactiveButtonClass: "popup__button_role_inactive",
  inputErrorClass: "popup__field_type_error", 
  errorClass: "popup__field-error_active" 
};

// Forms Array
export const forms = Array.from(document.querySelectorAll(validationSettings.formSelector));

// Form Fields 
export const nameInput = document.querySelector('.popup__field_name');
export const aboutInput = document.querySelector('.popup__field_job');

// Buttons
export const profileEditButton = document.querySelector('.profile__button_role_edit');
export const profileAddButton = document.querySelector('.profile__button_role_add');
