/// Show Error Messages
const showInputError = (popupForm, inputField, errorMessage, {inputErrorClass, errorClass}) => {
  const errorElement = popupForm.querySelector(`#${inputField.id}-error`);
  inputField.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

// Hide Error Message
const hideInputError = (popupForm, inputField, {inputErrorClass,errorClass}) => {
  const errorElement = popupForm.querySelector(`#${inputField.id}-error`);
  inputField.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = "";
};

// Checks for validity in form
const checkInputValidity = (popupForm, inputField, rest) => {
  if (!inputField.validity.valid) {
    showInputError(popupForm, inputField, inputField.validationMessage, rest);
  } else {
    hideInputError(popupForm, inputField, rest);
  }
};

// Checks for form field for validity
const hasInvalidInput = (inputList) => {
  return inputList.some((inputField) => {
    return !inputField.validity.valid;
  });
};

// Submit button inactive if form has validation errors
const toggleButtonState = (inputList, button, {inactiveButtonClass}) => {
  if (hasInvalidInput(inputList)) {
    button.classList.add(inactiveButtonClass); 
    button.disabled = true;
  } else {
    button.classList.remove(inactiveButtonClass);
    button.disabled = false;
  }
};

// Function to enable validation
const enableValidation = ({formSelector, inputSelector, submitButtonSelector, ...rest}) => {
  const formList = Array.from(document.querySelectorAll(formSelector)); 
  formList.forEach((popupForm) => {
    popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    const inputList = Array.from(popupForm.querySelectorAll(inputSelector));  
    const submitButton = popupForm.querySelector(submitButtonSelector); 

    toggleButtonState(inputList, submitButton, rest);

    inputList.forEach((inputField) => {
      checkInputValidity(popupForm, inputField, rest);
      inputField.addEventListener("input", () => {
        checkInputValidity(popupForm, inputField, rest);
        toggleButtonState(inputList, submitButton, rest);
      });
    });
  });
};

enableValidation({
  formSelector: ".popup__form", 
  inputSelector: ".popup__field", 
  submitButtonSelector: ".popup__button_role_save",
  inactiveButtonClass: "popup__button_role_inactive",
  inputErrorClass: "popup__field_type_error", 
  errorClass: "popup__field-error_active" 
});