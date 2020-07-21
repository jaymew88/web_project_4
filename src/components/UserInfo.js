export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(jobSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  // Gets User info from Profile fields
  getUserInfo() {
    document.querySelector('.popup__field_name').value = this._name.textContent;
    document.querySelector('.popup__field_job').value = this._about.textContent;
  } 
  
  // Set New User Info from Edit Form fields
  setUserInfo({ name, about }) {
    this._name.textContent = name;
    this._about.textContent = about;
  }

  setUserAvatar ({ avatar }) {
    this._avatar.src = avatar;
  }
}
