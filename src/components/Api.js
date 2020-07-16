export default class Api {
  constructor(options) {
    this.headers = options.headers; 
  }

  getInitialCards() {
    return fetch(`${this.options.baseUrl}/cards`, {
      headers: this.options.headers,
  })
    .then(res => {
      if (res.ok) {
          return res.json();
      } else {
          return Promise.reject(`Error: ${res.status}`);
      }
    });
  }

  newCard({ name: newName, link: newLink }) {
    return fetch(`${this.options.baseUrl}/cards`, {
      method: "POST",
      headers: this.options.headers,
      body: JSON.stringify({
        name: newName, 
        link: newLink })
    })
      .then(res => {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Error: ${res.status}`);
        }
      });
  }

  deleteCard(cardId) {
    return fetch(`${this.options.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.options.headers,
  })
      .then(res => {
          if (res.ok) {
              return res.json();
          } else {
              return Promise.reject(`Error: ${res.status}`);
          }
      });
  }

  addLike(cardId, userId) {
    if (cardId.likes.some((like) => {return (like._id === userId);})) {
      return fetch(`${this.options.baseUrl}/cards/likes/${cardId._id}`, {
          method: "DELETE",
          headers: this.options.headers,
      })
          .then(res => {
              if (res.ok) {
                  return res.json();
              } else {
                  return Promise.reject(`Error: ${res.status}`);
              }
          });
    } else {
        return fetch(`${this.options.baseUrl}/cards/likes/${cardId._id}`, {
            method: "PUT",
            headers: this.options.headers,
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`Error: ${res.status}`);
                }
            });
    }
  }

  removeLike(cardId) {
    return fetch(`${this.options.baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this.options.headers,
  })
      .then(res => {
          if (res.ok) {
              return res.json();
          } else {
              return Promise.reject(`Error: ${res.status}`);
          }
      });
  }

  getProfileInfo() {
    return fetch(`${this.options.baseUrl}/users/me`, {
      headers: this.options.headers,
    })
      .then(res => {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Error: ${res.status}`);
        }
      });
  }

  updateProfileInfo({ name: newName, job: newJob }) {
    return fetch(`${this.options.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.options.headers,
      body: JSON.stringify({ 
        name: newName, 
        job: newJob })
  })
      .then(res => {
          if (res.ok) {
              return res.json();
          } else {
              return Promise.reject(`Error: ${res.status}`);
          }
      });
  }

  updateProfilePicture(avatarLink) {
    return fetch(`${this.options.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.options.headers,
      body: JSON.stringify(avatarLink)
    })
      .then(res => {
          if (res.ok) {
              return res.json();
          } else {
              return Promise.reject(`Error: ${res.status}`);
          }
      });
  }
}