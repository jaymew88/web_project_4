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

// Card Global Variables
const templateCard = document.querySelector('.template-card').content.querySelector('.card');
const cardsList = document.querySelector('.cards__list');

// Popup Global Variables
const buttonEdit = document.querySelector('.profile__button_role_edit');
const closeButton = document.querySelector('.button_role_close');
const open = document.querySelector('.popup');
const closeSave = document.querySelector('.button_role_save');
const formElement = document.querySelector('.popup__form');
const nameNew = document.querySelector('.profile__title');
const jobNew = document.querySelector('.profile__job');


// Loops through the initialCards array and renders a card for each item in array
initialCards.forEach((card) => {
  renderCard(card);
});

// Takes the card that was created in createCard function and 
// adds it to the list of cards in the HTML
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

  elementLikeButton.addEventListener ('click', (evt) => {
    evt.target.classList.toggle('.card__like-button_active'); 
  }); // Adds class, but not image

  elementDeleteButton.addEventListener('click', () => {
     cardsList.removeChild(cardElement);
  });

  elementImage.addEventListener ('click', () => {
    //OpenModal image
  });

  return cardElement;
}

// Open Popup Modal with prefilled fields 
buttonEdit.addEventListener("click", function() {
  open.classList.add('popup_opened'); 
  document.querySelector('.popup__field_content_name').value = document.querySelector('.profile__title').innerHTML;
  document.querySelector('.popup__field_content_job').value = document.querySelector('.profile__job').innerHTML;
});
  
// Closes Popup Modal when Close button, save or enter is clicked
closeButton.addEventListener("click", function() {
	open.classList.remove('popup_opened');
});
closeSave.addEventListener("click", function() {
	open.classList.remove('popup_opened');
});

// Next is the form submit handler, though
// it won't submit anywhere just yet
function formSubmitHandler (evt) {
    evt.preventDefault(); // This line stops the browser from submitting the form in the default way.
                                                // Having done so, we can define our own way of submitting the form.
                                                // We'll explain it in more detail later.
                                                
    let nameInput = document.querySelector('.popup__field_content_name');  
    let jobInput = document.querySelector('.popup__field_content_job');  
    
    let nameVal = nameInput.value; 
    let jobVal = jobInput.value;

    nameNew.textContent = nameVal;
    jobNew.textContent = jobVal;
}

// Connect the handler to the form it will watch the submit event
formElement.addEventListener('submit', formSubmitHandler);



