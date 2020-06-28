export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
  }

  // Gets User info from Profile fields
  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._job.textContent
    };
  } 
  
  // Set New User Info from Edit Form fields
  setUserInfo({ name, job }) {
    this._name.textContent = name;
    this._job.textContent = job;
  }
}
