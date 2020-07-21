import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(callback, sumbitButtonLoading, popupSelector) {
    super(popupSelector);
    this._callback = callback; 
    this._form = this._popup.querySelector('.popup__form');
    this._submitButton = this._form.querySelector('.popup__button_role_save');
    this._submitButtonText = this._submitButton.textContent;
    this._submitButtonLoading = sumbitButtonLoading;
  }

  _getInputValues() {
    const values = {...this._callbackParameters };
    const data = Object.fromEntries(new FormData(this._form));
    Object.assign(data, values);
    return data;
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = this._submitButtonLoading;
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }

  open(callBackParameters) {
    this._callbackParameters = callBackParameters || {};
    super.open();
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (e) => {
      e.preventDefault();
      this._callback(this._getInputValues(e));
      this.renderLoading(true);
      e.stopPropagation();
    });
  }
  
}
