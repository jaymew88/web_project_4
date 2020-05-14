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

// Templates
const templateCard = document.
  querySelector('.template-card').
  content.querySelector('.card');

//Wrappers
const cardsList = document.querySelector('.cards__list');

// Popups
const editPopupWindow = document.querySelector('.popup_type_edit');
const addPlacePopupWindow = document.querySelector('.popup_type_add-place');
const imagePopupWindow = document.querySelector('.popup_type_image');

// Popup Forms
const addForm = addPlacePopupWindow.querySelector('.popup__form');
const editForm = editPopupWindow.querySelector('.popup__form');

// Buttons
const profileEditButton = document.querySelector('.profile__button_role_edit');
const profileAddButton = document.querySelector('.profile__button_role_add');
const editCloseButton = editPopupWindow.querySelector('.popup__button_role_close');
const addPlaceCloseButton = addPlacePopupWindow.querySelector('.popup__button_role_close');
const imageCloseButton = imagePopupWindow.querySelector('.popup__button_role_close');

//Form Fields
const nameInput = editPopupWindow.querySelector('.popup__field_content_name');
const jobInput = editPopupWindow.querySelector('.popup__field_content_job');
const imageTitleInput = addPlacePopupWindow.querySelector('.popup__field_place_name');
const imageLinkInput = addPlacePopupWindow.querySelector('.popup__field_place_image');

// Popup Image
const imagePopup = imagePopupWindow.querySelector('.popup__img');
const imageTitlePopup = imagePopupWindow.querySelector('.popup__img-title');

//Profile Fields
const nameNew = document.querySelector('.profile__title');
const jobNew = document.querySelector('.profile__job');

// Function to open/close Popup Wimdows
function togglePopup(popup) {
  popup.classList.toggle('popup_opened');
}

// Takes createCard function and adds it to the list of cards in the HTML
function renderCard(card) {
  cardsList.prepend(createCard(card));
}

// Creates a card by cloning the template and acessing the array name and
// img link and returns a card. EventListeners for buttons and open image
function createCard(card) {
  const cardElement = templateCard.cloneNode(true);
  const elementImage = cardElement.querySelector('.card__img');
  const elementName = cardElement.querySelector('.card__name');
  const elementLikeButton = cardElement.querySelector('.card__like-button');
  const elementDeleteButton = cardElement.querySelector('.card__delete-button');

  //elementImage.style.backgroundImage = `url(${card.link})`;
  elementImage.src = card.link;
  elementImage.alt = card.name;
  elementName.textContent = card.name;

  // Click change heart color
  elementLikeButton.addEventListener ('click', (e) => {
    e.target.classList.toggle('card__like-button_active');
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
window.addEventListener('keyup', (e) => {
  if (e.keyCode == 27) {
    const popupOpen = document.querySelector('.popup_opened');
    togglePopup(popupOpen);
  }
});


// closes popups with overlay click
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('popup')) {
    togglePopup(e.target);
    e.preventDefault();
  }
});

// Enables submit button active upon page load
nameInput.value = nameNew.textContent;
jobInput.value = jobNew.textContent;


