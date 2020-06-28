import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, callback) {
    super(popupSelector);
    this._callback = callback; 
    this._form = this._popup.querySelector('.popup__form');
  }

  _getInputValues() {
    // const values = Object.fromEntries(new FormData(this._form));
    // return values;
   this._inputFields = this._popup.querySelectorAll('.popup__field');
   this._inputValues = {};
   this._inputFields.forEach(input => this._inputValues[input.value] = input.value);
   return this._inputValues;

    // const inputFields = Array.from(this._popup.querySelector('input'));
    // const inputValues = {};
    // inputFields.forEach((input) => {
    //   inputValues[input.id] = input.value;
    // });
    // return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (e) => { 
      e.preventDefault();
    
      this._callback(this._getInputValues());
      this.close();
      e.stopPropagation();
     
    });
    
  //this._form.addEventListener('click', (e) => e.stopPropagation());
  }

  close() {
    super.close();
    this._form.reset();
  }
}
