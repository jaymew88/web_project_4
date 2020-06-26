import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(name, link) {
    const image = this._popup.querySelector('.popup__img');
    const imageName = this._popup.querySelector('.popup__img-title');

    image.src = link;
    image.alt = name;
    imageName.textContent = name;
    super.open();
  }
}
