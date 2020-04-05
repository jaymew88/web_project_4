// Calls all elemnts from document and stores them as variables
let buttonEdit = document.querySelector('.button__edit');
let open = document.querySelector('.popup');
let close = document.querySelector('.button__close');
let closeSave = document.querySelector('.button__save');

// Open Popup Modal with prefilled fields 
buttonEdit.addEventListener("click", function() {
  open.classList.add('popup_opened'); 
  document.querySelector('.popup__field_name').value = document.querySelector('.profile__title').innerHTML;
  document.querySelector('.popup__field_job').value = document.querySelector('.profile__job').innerHTML;
});
  
// Closes Popup Modal when Close button, save or enter is clicked
close.addEventListener("click", function() {
	open.classList.remove('popup_opened');
});
closeSave.addEventListener("click", function() {
	open.classList.remove('popup_opened');
});


// Let's find the form in the DOM
let formElement = document.querySelector('.popup__form'); // Use the querySelector() method

// Next is the form submit handler, though
// it won't submit anywhere just yet
function formSubmitHandler (evt) {
    evt.preventDefault(); // This line stops the browser from submitting the form in the default way.
                                                // Having done so, we can define our own way of submitting the form.
                                                // We'll explain it in more detail later.

    // Let's find the form fields in the DOM
    let nameInput = document.querySelector('.popup__field_name');  
    let jobInput = document.querySelector('.popup__field_job'); 

    // Get the values of each field from the corresponding value property
    let nameVal = nameInput.value; 
    let jobVal = jobInput.value;

    // Select elements where the field values will be entered
    let nameNew = document.querySelector('.profile__title');
    let jobNew = document.querySelector('.profile__job');

    // Insert new values using the textContent property of the querySelector() method
    nameNew.textContent = nameVal;
    jobNew.textContent = jobVal;
}

// Connect the handler to the form
// it will watch the submit event
formElement.addEventListener('submit', formSubmitHandler);