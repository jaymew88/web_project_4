/// Show Error Messages
const showInputError = (popupForm, inputField, errorMessage, settings) => {
  const errorElement = popupForm.querySelector(`#${inputField.id}-error`);
  inputField.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
};

// Hide Error Message
const hideInputError = (popupForm, inputField, settings) => {
  const errorElement = popupForm.querySelector(`#${inputField.id}-error`);
  inputField.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = "";
};

// Checks for validity in form
const checkInputValidity = (popupForm, inputField, settings) => {
  if (!inputField.validity.valid) {
    showInputError(popupForm, inputField, inputField.validationMessage, settings);
  } else {
    hideInputError(popupForm, inputField, settings);
  }
};

// Checks for form field for validity
const hasInvalidInput = (inputList) => {
  return inputList.some((inputField) => {
    return !inputField.validity.valid;
  });
};

// Sets event listeners
const setEventListeners = (popupForm, settings) => {
  const inputList = Array.from(popupForm.querySelectorAll(settings.inputSelector));  
  const submitButton = popupForm.querySelector(settings.submitButtonSelector); 

  toggleButtonState(inputList, submitButton, settings);

  inputList.forEach((inputField) => {
    checkInputValidity(popupForm, inputField, settings);
    inputField.addEventListener("input", () => {
      checkInputValidity(popupForm, inputField, settings);
      toggleButtonState(inputList, submitButton, settings);
    })
  });
};

// Submit button inactive if form has validation errors
const toggleButtonState = (inputList, button, settings) => {
  if (hasInvalidInput(inputList)) {
    button.classList.add(settings.inactiveButtonClass); 
    button.disabled = true;
  } else {
    button.classList.remove(settings.inactiveButtonClass);
    button.disabled = false;
  }
};

// Function to enable validation
const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector)); 
  formList.forEach((popupForm) => {
    popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    setEventListeners(popupForm, settings);
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