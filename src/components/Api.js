export default class Api {
  constructor({ baseUrl, headers }) {
    this.headers = headers; 
    this.baseUrl = baseUrl;
  }

  getAppInfo(){
    return Promise.all([this.getInitialCards(), this.getUserInfo()])
}

  getInitialCards() {
    return fetch(this.baseUrl + '/cards', {
      headers: this.headers,
  })
    .then(res => {
      if (res.ok) {
          return res.json();
      } else {
          return Promise.reject('Error: ' + res.status);
      }
    })
    .catch((err) => console.log(err)); 
  }

  getUserInfo() {
    return fetch(this.baseUrl + '/users/me', {
      headers: this.headers,
    })
      .then(res => {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Error: ${res.status}`);
        }
      })
      .catch((err) => console.log(err)); 
  }

  newCard({ name, link }) {
    return fetch(this.baseUrl + '/cards', {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name, 
        link
       })
    })
      .then(res => {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Error: ${res.status}`);
        }
      })
      .catch((err) => console.log(err));
  }

  deleteCard(cardId) {
    return fetch(this.baseUrl + '/cards/' + cardId, {
      method: "DELETE",
      headers: this.headers,
  })
      .then(res => {
          if (res.ok) {
              return res.json();
          } else {
              return Promise.reject(`Error: ${res.status}`);
          }
      })
      .catch((err) => console.log(err)); 
  }

  updateLike({ cardLiked, cardId }) {
    return fetch(this.baseUrl + '/cards/likes/' + cardId, {
      method: cardLiked ? "PUT" : "DELETE",
      headers: this.headers,
  })
    .then(res => {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Error: ${res.status}`);
        }
    })
    .catch((err) => console.log(err));
  }

  editUserInfo({ name: newName, about: newJob }) {
    return fetch(this.baseUrl + '/users/me', {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({ 
        name: newName, 
        about: newJob })
  })
      .then(res => {
          if (res.ok) {
              return res.json();
          } else {
              return Promise.reject(`Error: ${res.status}`);
          }
      })
      .catch((err) => console.log(err));
  }

  setUserAvatar(avatar) {
    return fetch(this.baseUrl + '/users/me/avatar', {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({ avatar })
    })
      .then(res => {
          if (res.ok) {
              return res.json();
          } else {
              return Promise.reject(`Error: ${res.status}`);
          }
      })
      .catch((err) => console.log(err));
  }
}