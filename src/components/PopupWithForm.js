import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, callback) {
    super(popupSelector);
    this._callback = callback; 
    this._form = this._popup.querySelector('.popup__form');
  }

  _getInputValues() {
    return Object.fromEntries(new FormData(this._form));
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (e) => {
        e.preventDefault();
        this._callback(this._getInputValues());
        this.close();
        e.stopPropagation(); 
      });
  }
  
}
