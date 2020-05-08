// Settings Object
const formSelectors = {
  formSelector: ".popup__form", 
  inputSelector: ".popup__field", 
  submitButtonSelector: ".popup__button_role_save",
  inactiveButtonClass: "popup__button_role_inactive",
  inputErrorClass: "popup__field_type_error", 
  errorClass: "popup__field-error_active" 
}

// Show Error Messages
const showInputError = (popupForm, inputField, errorMessage) => {
  const errorElement = popupForm.querySelector(`#${inputField.id}-error`);
  inputField.classList.add(formSelectors.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(formSelectors.errorClass);
};

// Hide Error Message
const hideInputError = (popupForm, inputField) => {
  const errorElement = popupForm.querySelector(`#${inputField.id}-error`);
  inputField.classList.remove(formSelectors.inputErrorClass);
  errorElement.classList.remove(formSelectors.errorClass);
  errorElement.textContent = "";
};

// Checks for validity in form
const checkInputValidity = (popupForm, inputField) => {
  if (!inputField.validity.valid) {
    showInputError(popupForm, inputField, inputField.validationMessage);
  } else {
    hideInputError(popupForm, inputField, inputField.validationMessage);
  }
};

// Checks for form field for validity
const hasInvalidInput = (inputList) => {
  return inputList.some((inputField) => {
    return !inputField.validity.valid;
  });
};

// Sets event listeners
const setEventListeners = (popupForm) => {
  const inputList = Array.from(popupForm.querySelectorAll(formSelectors.inputSelector));  
  const submitButton = popupForm.querySelector(formSelectors.submitButtonSelector); 

  toggleButtonState(inputList, submitButton);

  inputList.forEach((inputField) => {
    checkInputValidity(popupForm, inputField);
    inputField.addEventListener("input", () => {
      checkInputValidity(popupForm, inputField);
      toggleButtonState(inputList, submitButton);
    });
  });
};

// Submit button inavtive if form has validation errors
const toggleButtonState = (inputList, button) => {
  if (hasInvalidInput(inputList)) {
    button.classList.add(formSelectors.inactiveButtonClass); 
    button.disabled = true;
  } else {
    button.classList.remove(formSelectors.inactiveButtonClass);
    button.disabled = false;
  }
};

// Function to enable validation
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(formSelectors.formSelector)); 
  formList.forEach((popupForm) => {
    popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    setEventListeners(popupForm);
  });
};

enableValidation();