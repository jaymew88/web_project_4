// Sets the Initial Cards to be loaded 
const initialCards = [
  {
      name: "Yosemite Valley",
      link: "./images/yosemitevalley.jpg"
  },
  {
      name: "Lake Louise",
      link: "./images/lakelouise.jpg"
  },
  {
      name: "Bald Mountains",
      link: "./images/baldmountains.jpg"
  },
  {
      name: "Latemar",
      link: "./images/latemar.jpg"
  },
  {
      name: "Vanois National Park",
      link: "./images/vanoisnational.jpg"
  },
  {
      name: "Lago di Braies",
      link: "./images/lagodibraies.jpg"
  }
];

// Card 
const templateCard = document.querySelector('.template-card').content.querySelector('.card');
const cardsList = document.querySelector('.cards__list');
//Popup Wrappers & Form 
const editPopupWindow = document.querySelector('.popup_type_edit');
const editForm = editPopupWindow.querySelector('.popup__form');
const addPlacePopupWindow = document.querySelector('.popup_type_add-place');
const addForm = addPlacePopupWindow.querySelector('.popup__form');
const imagePopupWindow = document.querySelector('.popup_type_image');
// Buttons
const profileEditButton = document.querySelector('.profile__button_role_edit');
const profileAddButton = document.querySelector('.profile__button_role_add');
const editCloseButton = editPopupWindow.querySelector('.popup__button_role_close');
const editSaveButton = editPopupWindow.querySelector('.popup__button_role_save');
const addPlaceCloseButton = addPlacePopupWindow.querySelector('.popup__button_role_close');
const addPlaceSaveButton = addPlacePopupWindow.querySelector('.popup__button_role_save');
//Form Fields in the DOM
const nameInput = document.querySelector('.popup__field_content_name');  
const jobInput = document.querySelector('.popup__field_content_job');
//Elements where the field values will be entered
const nameNew = document.querySelector('.profile__title');
const jobNew = document.querySelector('.profile__job');

// Loops through the initialCards array and renders a card for each item in array
initialCards.forEach((card) => {
  renderCard(card);
});

// Takes createCard function and adds it to the list of cards in the HTML
function renderCard(card) {
  cardsList.append(createCard(card));
}

// Creates a card by cloning the template and acessing the array name and
// img link and returns a card. EventListeners for buttons and open image
function createCard(card) {
  const cardElement = templateCard.cloneNode(true);
  const elementImage = cardElement.querySelector('.card__img');
  const elementName = cardElement.querySelector('.card__name');
  const elementLikeButton = cardElement.querySelector('.card__like-button');
  const elementDeleteButton = cardElement.querySelector('.card__delete-button');

  elementImage.style.backgroundImage = `url(${card.link})`;
  elementName.textContent = card.name;

  elementLikeButton.addEventListener ('click', (e) => {
    e.target.classList.toggle('card__like-button_active'); 
  }); 

  elementDeleteButton.addEventListener('click', () => {
     cardsList.removeChild(cardElement);
  });

  elementImage.addEventListener ('click', () => {
    //OpenModal image
  });

  return cardElement;
}

// Function to open/close Profile Edit
function togglePopup(popup) {
  popup.classList.toggle('popup_opened');
  nameInput.value = nameNew.textContent;
  jobInput.value = jobNew.textContent;  
} 


// Form Submit Handler
function formSubmitHandler (evt) {
    evt.preventDefault();
                                    
    let nameVal = nameInput.value; 
    let jobVal = jobInput.value;

    nameNew.textContent = nameVal;
    jobNew.textContent = jobVal;
    togglePopup(editPopupWindow);
}

// Connect the handler to the form it will watch the submit event
editForm.addEventListener('submit', formSubmitHandler);

//Click functions to call togglePopup function
profileEditButton.addEventListener('click', () => {
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
