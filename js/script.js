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