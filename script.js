document.querySelector('.profile__edit-btn').addEventListener("click", function() {
	document.querySelector('.popup').classList.add('popup__opened');
});

document.querySelector('.popup__close').addEventListener("click", function() {
	document.querySelector('.popup').classList.remove('popup__opened');
});