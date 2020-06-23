// Popup class opens and closes the popup window

export default class Popup {
  constructor(popupSelector) {
      this._popup = document.querySelector(popupSelector);
  }

  open() {
     this._popup.classList.add('popup_opened'); 
  }

  close() {
     this._popup.classList.remove('popup_opened');
  }

  _handleEscClose (e) {
    if (e.key === 27) {
      this.close();
      e.stopPropagation();
    }
  }

  setEventListeners () {
    const closeButton = this._popup.querySelector('.popup__button_role_close');
    closeButton.addEventListener('click', (e) => {
        this.close();
        e.stopPropagation();
    });
  }
}

// 1. The constructor has a single parameter, which is the popup selector.
// 2. It stores the public methods open() and close() that will open and close the popup.
// 3. It stores a private method named _handleEscClose() that stores the logic for closing the popup by pressing the Esc key.
// 4. It stores a public method named setEventListeners() that adds a click event listener to the close icon of the popup.
