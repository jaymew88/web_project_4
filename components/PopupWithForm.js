// PopupWithForm as a child class of Popup. 
import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._handleSubmitForm = this.handleSubmitForm; 
    this._form = this._popup.querySelector('.popup__form');
    this._nameInputField = this._popup.querySelector('.popup__field_content_name');
    this._jobInputField = this._popup.querySelector('.popup__field_content_job');
  }

  _getInputValues() {
    return {
      nameValue: this._nameInputField.value,
      jobValue: this._jobInputField.value
    }   
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (e) => {
      this._handleSubmitForm(e, this._getInputValues());
      this.close();
    });

    this._form.addEventListener('click', (e) => {
      e.stopPropagation();
    })
  }

  close() {
    super.close();
    this._nameInputField.value = null;
    this._jobInputField.value = null;
  }

  open(name, job) {
    this._nameInputField.value = name;
    this._jobInputField.value = job;
    super.open();
  }
}

// 1. It takes a callback of the form submission into the constructor, as well as the popup selector.
// 2. It stores a private method named _getInputValues(), which collects data from all the input fields.
// 3. It modifies the setEventListeners() parent method. The setEventListeners() method of the PopupWithForm 
// class has to add the click event listener to the close icon while also adding the submit event handler.
//  It modifies the close() parent method in order to reset the form once the popup is closed.
// Create an instance of the PopupWithForm class for each popup.