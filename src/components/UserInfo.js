// UserInfo class renders information about the user on the page. 
export default class UserInfo {
  constructor(nameSelector, jobSelector) {
    this.name = document.querySelector(nameSelector);
    this.job = document.querySelector(jobSelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._job.textContent
    }
  }

  setUderInfo() {
    this._name.textContent = name;
    this._job.textContent = job;
  }
}


// 1. Take an object with the selectors of two elements into the constructor: one containing the user's 
  // name, and another containing the user's job.

// 2. Store a public method named getUserInfo(), which returns an object with information about the user. 
  // This method will be handy for cases when it's necessary to display the user data in the open form.


// 3. Store a public method named setUserInfo(), which takes new user data and adds it on the page.