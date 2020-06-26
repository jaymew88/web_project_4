import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm; 
    this._form = this._popup.querySelector('.popup__form');
    this._inputTitle = this._form.querySelector('.popup__field_title');
    this._inputDetail = this._form.querySelector('.popup__field_detail');
  }

  _getInputValues() {
   return {
      title: this._inputTitle.value,
      detail: this._inputDetail.value
   }
   
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
