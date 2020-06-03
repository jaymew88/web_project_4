export class FormValidator {
  constructor(form, settings) {
    this._form = form;
    this._settings = settings;
  }

  /// Show Error Messages
  _showInputError = (inputField, errorMessage) => {
    const errorElement = this._form.querySelector(`#${inputField.id}-error`);
    inputField.classList.add(this._settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._settings.errorClass);
  };

  // Hide Error Message
  _hideInputError = (inputField) => {
    const errorElement = this._form.querySelector(`#${inputField.id}-error`);
    inputField.classList.remove(this._settings.inputErrorClass);
    errorElement.classList.remove(this._settings.errorClass);
    errorElement.textContent = "";
  };

  // Checks for validity in form
  _checkInputValidity = (inputField) => {
    if (!inputField.validity.valid) {
      this._showInputError(inputField, inputField.validationMessage);
    } else {
      this._hideInputError(inputField);
    }
  };

  // Checks for form field for validity
  _hasInvalidInput = (inputList) => {
    return inputList.some((inputField) => {
      return !inputField.validity.valid;
    });
  };

  // Submit button inactive if form has validation errors
  _toggleButtonState = (inputList, button) => {
    if (this._hasInvalidInput(inputList)) {
      button.classList.add(this._settings.inactiveButtonClass); 
      button.disabled = true;
    } else {
      button.classList.remove(this._settings.inactiveButtonClass);
      button.disabled = false;
    }
  };

  // Function to enable validation
  _setEventListeners() {
    const formList = Array.from(this._form.querySelectorAll(this._settings.formSelector));
    const inputList = Array.from(this._form.querySelectorAll(this._settings.inputSelector));  
    const submitButton = this._form.querySelector(this._settings.submitButtonSelector); 
    const outerThis = this;

    formList.forEach((form) => {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
      });
      outerThis._toggleButtonState(inputList, submitButton);

      inputList.forEach((inputField) => {
        outerThis._checkInputValidity(inputField);
        inputField.addEventListener("input", () => {
          outerThis._checkInputValidity(inputField);
          outerThis._toggleButtonState(inputList, submitButton);
        });
      });
    });
  }  
  
  enableValidation() {
    this._setEventListeners();
  }
  
}

