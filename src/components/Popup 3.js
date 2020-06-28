export default class Popup {
  constructor(poupSelector) {
    this._popup = document.querySelector(poupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', (e) => this._handleEscClose(e.key));
  }

  close() {
    this._popup.classList.remove('popup_opened');
  }

  _handleEscClose(key) {
    if (key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener('click', (e) => {
      if (e.target.classList.contains('popup')) {
        this.close(e.target);
        e.preventDefault();
      }
    });      

    const closeButton = this._popup.querySelector('.popup__button_role_close');
    closeButton.addEventListener('click', (e) => {
      this.close();
      e.stopPropagation();
    });
  }

}