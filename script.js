document.querySelector('.button__edit').addEventListener("click", function() {
	document.querySelector('.popup').classList.add('popup_opened');
});

document.querySelector('.button__close').addEventListener("click", function() {
	document.querySelector('.popup').classList.remove('popup_opened');
});