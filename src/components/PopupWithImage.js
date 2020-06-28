import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {

  open({ name, link }) {
    const imagePopup = this._popup.querySelector('.popup__img');

    this._popup.querySelector('.popup__img-title').textContent = name;
    imagePopup.alt = name;
    imagePopup.src = link;
    
    super.open();
  }
}
