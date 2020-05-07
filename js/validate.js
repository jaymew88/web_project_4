
// Shoe Error Messages
const showInputError = (popupForm, inputField, errorMessage) => {
  const errorElement = popupForm.querySelector(`#${inputField.id}-error`);
  inputField.classList.add("popup__field_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__field-error_active");
};

// Hide Error Message
const hideInputError = (popupForm, inputField) => {
  const errorElement = popupForm.querySelector(`#${inputField.id}-error`);
  inputField.classList.remove("popup__field_type_error");
  errorElement.classList.remove("popup__field-error_active");
  errorElement.textContent = "";
};

// Checks for validity in form
const checkInputValidity = (popupForm, inputField) => {
  if (!inputField.validity.valid) {
    showInputError(popupForm, inputField, inputField.validationMessage);
  } else {
    hideInputError(popupForm, inputField);
  }
};

// Checks for form field for validity
const hasInvalidInput = (inputList) => {
  return inputList.some((inputField) => {
    return !inputField.validity.valid;
  });
};

// Submit button inavtive if form has validation errors
const toggleButtonState = (inputList, button) => {
  if (hasInvalidInput(inputList)) {
    button.classList.add("button_inactive");
    button.disabled.true;
  } else {
    button.classList.remove("button_inactive");
    button.diable.false;
  }
};

// Sets event listeners
const setEventListeners = (popupForm) => {
  const inputList = Array.from(popupForm.querySelectorAll(".popup__field"));  
  const submitButton = popupForm.querySelector(".popup__button_role_save"); 

  toggleButtonState(inputList, submitButton);

  inputList.forEach((inputField) => {
    inputField.addEventListener("input", () => {
      checkInputValidity(popupForm, inputField);
      toggleButtonState(inputList, sumbitButton);
    });
  });
};

// Function to enable validation
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".popup__form")); 
  formList.forEach((popupForm) => {
    popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    setEventListeners(popupForm);
  });
};

enableValidation();