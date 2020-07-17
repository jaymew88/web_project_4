export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(jobSelector);
    //this._pic = document.querySelector(picSelector);
  }

  // Gets User info from Profile fields
  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
    };
  } 
  
  // Set New User Info from Edit Form fields
  setUserInfo({ name, about }) {
    this._name.textContent = name;
    this._about.textContent = about;
  }

  // setUserPic ({ url }) {
  //   this._pic.src = url;
  // }
}
