// Sets the Initial Cards to be loaded 
const initialCards = [
  {
      name: "Yosemite Valley",
      link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
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

// References Image and Name classes and createElements for template 
const cards = document.querySelector('.cards');
const cardsContainer = document.createElement('ul');
const card = document.createElement('li');
const cardImage = document.createElement('img'); 
const cardWrapper = document.createElement('div');
const cardName = document.createElement('h3');
const cardButton = document.createElement('button');

// Function to load template
function addTemplate(imageValue, nameValue) {
  const cardTemplate = document.querySelector('#cards-template').content;
  const cardsElement = cardTemplate.cloneNode(true);

  cardsElement.querySelector('.card__img').textContent = imageValue;
  cardsElement.querySelector('.card__name').textContent = nameValue;

  cardsContainer.append(cardsElement);
 
  cardsContainer.classList.add('cards__container');
  card.classList.add('.card');
  cardImage.classList.add('.card__img');
  cardImage.textcontent = imageValue;
  cardWrapper.classList.add('.card__wrapper');
  cardName.classList.add('.card__name');
  cardName.textContent = nameValue;
  cardButton.classList.add('.button_role_like');

  cards.append(cardsContainer);
};  

initialCards.forEach(item => {
  const text = document.createTextNode(item.name);
  cardName.append(text);
  document.querySelector('.card__name').append(cardName);
});

window.addEventListener('load', function() {
  addTemplate();
});

  //initialCards.forEach(element => {
   // console.log(element.name);
   // console.log(element.link);
   // cardImage.append(imageValue);
   // cardName.append(nameValue);   
 // });








// Calls all elemnts from document and stores them as variables
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



