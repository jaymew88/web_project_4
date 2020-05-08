// Sets the Initial Cards to be loaded 
const initialCards = [
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg"
  },
  {
    name: "Vanois National Park",
    link: "https://code.s3.yandex.net/web-code/vanois.jpg"
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  }
];

// Settings Object
const  documentSelectors = {
  templateCardSelector: '.template-card',
  cardSelector: '.card',
  cardsListSelector: '.cards__list',
  editPopupSelector: '.popup_type_edit',
  addPlacePopupSelector: '.popup_type_add-place',
  imagePopupSelector: '.popup_type_image',
  formSelector: '.popup__form',
  editButtonSelector: '.profile__button_role_edit',
  addButtonSelector: '.profile__button_role_add',
  closeButtonSelector: '.popup__button_role_close',
  nameInputSelector: '.popup__field_content_name',
  jobInputSelector: '.popup__field_content_job',
  titleInputSelector: '.popup__field_place_name',
  linkInputSelector: '.popup__field_place_image',
  imageSelector: '.popup__img',
  imageTitleSelector: '.popup__img-title',
  nameNewSelector: '.profile__title',
  jobNewSelector: '.profile__job',
  popupOpenSelector : '.popup_opened',
  cardImageSelector: '.card__img',
  cardNameSelector: '.card__name',
  cardLikeButtonSelector: '.card__like-button',
  cardDeleteButtonSelector: '.card__delete-button',
  cardLikeActiveClass: 'card__like-button_active',
  popupOpenClass: "popup_opened",
  popupClass: 'popup'
};

// Templates
const templateCard = document.
  querySelector(documentSelectors.templateCardSelector).
  content.querySelector(documentSelectors.cardSelector);

//Wrappers
const cardsList = document.querySelector(documentSelectors.cardsListSelector);

// Popups
const editPopupWindow = document.querySelector(documentSelectors.editPopupSelector);
const addPlacePopupWindow = document.querySelector(documentSelectors.addPlacePopupSelector);
const imagePopupWindow = document.querySelector(documentSelectors.imagePopupSelector);

// Popup Forms
const addForm = addPlacePopupWindow.querySelector(documentSelectors.formSelector);
const editForm = editPopupWindow.querySelector(documentSelectors.formSelector);

// Buttons
const profileEditButton = document.querySelector(documentSelectors.editButtonSelector);
const profileAddButton = document.querySelector(documentSelectors.addButtonSelector);
const editCloseButton = editPopupWindow.querySelector(documentSelectors.closeButtonSelector);
const addPlaceCloseButton = addPlacePopupWindow.querySelector(documentSelectors.closeButtonSelector);
const imageCloseButton = imagePopupWindow.querySelector(documentSelectors.closeButtonSelector);

//Form Fields
const nameInput = editPopupWindow.querySelector(documentSelectors.nameInputSelector);
const jobInput = editPopupWindow.querySelector(documentSelectors.jobInputSelector);
const imageTitleInput = addPlacePopupWindow.querySelector(documentSelectors.titleInputSelector);
const imageLinkInput = addPlacePopupWindow.querySelector(documentSelectors.linkInputSelector);

// Popup Image
const imagePopup = imagePopupWindow.querySelector(documentSelectors.imageSelector);
const imageTitlePopup = imagePopupWindow.querySelector(documentSelectors.imageTitleSelector);

//Profile Fields
const nameNew = document.querySelector(documentSelectors.nameNewSelector);
const jobNew = document.querySelector(documentSelectors.jobNewSelector);

// Function to open/close Popup Wimdows
function togglePopup(popup) {
  popup.classList.toggle(documentSelectors.popupOpenClass);
}

// Takes createCard function and adds it to the list of cards in the HTML
function renderCard(card) {
  cardsList.prepend(createCard(card));
}

// Creates a card by cloning the template and acessing the array name and
// img link and returns a card. EventListeners for buttons and open image
function createCard(card) {
  const cardElement = templateCard.cloneNode(true);
  const elementImage = cardElement.querySelector(documentSelectors.cardImageSelector);
  const elementName = cardElement.querySelector(documentSelectors.cardNameSelector);
  const elementLikeButton = cardElement.querySelector(documentSelectors.cardLikeButtonSelector);
  const elementDeleteButton = cardElement.querySelector(documentSelectors.cardDeleteButtonSelector);

  //elementImage.style.backgroundImage = `url(${card.link})`;
  elementImage.src = card.link;
  elementImage.alt = card.name;
  elementName.textContent = card.name;

  // Click change heart color
  elementLikeButton.addEventListener ('click', (e) => {
    e.target.classList.toggle(documentSelectors.cardLikeActiveClass);
  });

  // Removes card
  elementDeleteButton.addEventListener('click', (e) => {
    e.target.parentElement.remove();
  });

  // Opens Image
  elementImage.addEventListener ('click', () => {
    imagePopup.src = card.link;
    imageTitlePopup.textContent = card.name;
    imagePopup.alt = `${card.name}`;
    togglePopup(imagePopupWindow);
  });

  return cardElement;
}

// Create New Place Form Submit Handler
addForm.addEventListener('submit', (e) => {
  e.preventDefault();

  renderCard({name: imageTitleInput.value, link: imageLinkInput.value});

  addForm.reset();
  togglePopup(addPlacePopupWindow);
});

// Form Submit Handler
editForm.addEventListener('submit', (e) => {
  e.preventDefault();

  nameNew.textContent = nameInput.value;
  jobNew.textContent = jobInput.value
  togglePopup(editPopupWindow);
});

//Click functions to call togglePopup function
profileEditButton.addEventListener('click', () => {
  nameInput.value = nameNew.textContent;
  jobInput.value = jobNew.textContent;
  togglePopup(editPopupWindow);
});
editCloseButton.addEventListener('click', () => {
  togglePopup(editPopupWindow);
});
profileAddButton.addEventListener('click', () => {
  togglePopup(addPlacePopupWindow);
});
addPlaceCloseButton.addEventListener('click', () => {
  togglePopup(addPlacePopupWindow);
});
imageCloseButton.addEventListener('click', () => {
  togglePopup(imagePopupWindow);
});

// Loops initialCards array and renders a card for each item in array
initialCards.forEach((card) => {
  renderCard(card);
});

//Closes popups with Esc key
document.addEventListener('keydown', (e) => {
  if (e.keyCode == 27) {
    const popupOpen = document.querySelector(documentSelectors.popupOpenSelector);
    if (popupOpen) {
      togglePopup(popupOpen);
    }
  }
});

// closes popups with overlay click
document.addEventListener('click', (e) => {
  if (e.target.classList.contains(documentSelectors.popupClass)) {
    togglePopup(e.target);
    e.preventDefault();
  }
});

// Enables submit button active upon page load
nameInput.value = nameNew.textContent;
jobInput.value = jobNew.textContent;


