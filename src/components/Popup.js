export default class Popup {
  constructor(popupSelector) {
      this._popup = document.querySelector(popupSelector);
  }

  open() {
     this._popup.classList.add('popup_opened'); 
    // document.addEventListener('keydown', (e) => this._handleEscClose(e.key));
  }

  close() {
     this._popup.classList.remove('popup_opened');
    // document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose (e) {
    if (e.key === 27) {
      this.close();
    }
  }

  setEventListeners () {
    this._popup.addEventListener('click', (e) => {
      this.close();
      e.stopPropagation();
    });

    this._popup.addEventListener('keydown', (e) => {
      this._handleEscClose(e);

    })
    const closeButton = this._popup.querySelector('.popup__button_role_close');
    closeButton.addEventListener('click', (e) => {
        this.close();
        e.stopPropagation();
    });
  }
}

