// Sets the Initial Cards to be loaded 
const initialCards = [
  {
      name: "Yosemite Valley",
      link: "./images/yosemitevalley.jpg"
  },
  {
      name: "Lake Louise",
      link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
      name: "Bald Mountains",
      link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
      name: "Latemar",
      link: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
      name: "Vanois National Park",
      link: "https://code.s3.yandex.net/web-code/vanois.jpg"
  },
  {
      name: "Lago di Braies",
      link: "https://code.s3.yandex.net/web-code/lago.jpg"
  }
];

// Card Variables
const templateCard = document.querySelector('.template-card').content.querySelector('.card');
const cardsList = document.querySelector('.cards__list');

// Loops through the initialCards array and renders a card for each item in array
initialCards.forEach((card) => {
  renderCard(card);
});

// Takes the card that was created in createCard function and 
// adds it to the list of cards in the HTML
function renderCard(card) {
  cardsList.prepend(createCard(card));
}

// Creates a card by cloning the template and acessing the array name and img link and 
// returns a card. Has EventListeners for buttons and open image
function createCard(card) {
  const cardElement = templateCard.cloneNode(true);
  const elementImage = cardElement.querySelector('.card__img');
  const elementName = cardElement.querySelector('.card__name');
  const elementLikeButton = cardElement.querySelector('.button_role_like');
  const elementDeleteButton = cardElement.querySelector('.button_role_delete');

  elementImage.style.backgroundImage = `url(${card.link})`;
  elementName.textContent = card.name;

  elementLikeButton.addEventListener ('click', () => {
    // clickLikeButtonHandler()
  })

  elementDeleteButton.addEventListener ('click', () => {
     clickDeleteButtonHandler()
  })

  elementImage.addEventListener ('click', () => {
    //OpenModal image
  })

  return cardElement;
}




// Popup Variables
const buttonEdit = document.querySelector('.button_role_edit');
const open = document.querySelector('.popup');
const close = document.querySelector('.button_role_close');
const closeSave = document.querySelector('.button_role_save');
const formElement = document.querySelector('.popup__form');
const nameNew = document.querySelector('.profile__title');
const jobNew = document.querySelector('.profile__job');

// Open Popup Modal with prefilled fields 
buttonEdit.addEventListener("click", function() {
  open.classList.add('popup_opened'); 
  document.querySelector('.popup__field_content_name').value = document.querySelector('.profile__title').innerHTML;
  document.querySelector('.popup__field_content_job').value = document.querySelector('.profile__job').innerHTML;
});
  
// Closes Popup Modal when Close button, save or enter is clicked
close.addEventListener("click", function() {
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

// Connect the handler to the form
// it will watch the submit event
formElement.addEventListener('submit', formSubmitHandler);



