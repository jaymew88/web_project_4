import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm; 
    this._form = this._popup.querySelector('.popup__form');
  }

  _getInputValues(e) {
    e.preventDefault();
    const inputField = Array.from(this._popup.querySelectorAll('input'));
    const inputValues = {};
    inputField.forEach((input) => {
      inputValues[input.id] = [input.value];
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', () => {
      this._handleSubmitForm(this._getInputValues());
      this.close();
    });

    this._form.addEventListener('click', (e) => {
      e.stopPropagation();
    })
  }

  close() {
    super.close();
    this._form.reset();
  }
}
