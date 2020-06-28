export default class Popup {
  constructor(popupSelector) {
      this._popup = document.querySelector(popupSelector);
      this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
     this._popup.classList.add('popup_opened'); 
     document.addEventListener('keyup', this._handleEscClose);
  }

  close() {
     this._popup.classList.remove('popup_opened');
     document.addEventListener('keyup', this._handleEscClose);
  }

  _handleEscClose (e) {
    if (e.key === "Escape") {
      this.close();
    }
  }

  setEventListeners () {
    // OVERLAY Popup Close!!! Closes Forms!!!!!!
   this._popup.addEventListener('click', (e) => {
      this.close();
      e.stopPropagation();
    });

    this._popup.addEventListener('keyup', (e) => {
      this._handleEscClose(e);

    })

    this._popup.querySelector('.popup__button_role_close')
    .addEventListener('click', (e) => {
        this.close();
        e.stopPropagation();
    });
  }
}

