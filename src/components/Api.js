export default class Api {
  constructor({ baseUrl, headers }) {
    this.headers = headers; 
    this.baseUrl = baseUrl;
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
    });
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
      });
  }

  getAppInfo() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()])
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
      });
  }

  // deleteCard(cardId) {
  //   return fetch(`${this.baseUrl}/cards/${cardId}`, {
  //     method: "DELETE",
  //     headers: this.headers,
  // })
  //     .then(res => {
  //         if (res.ok) {
  //             return res.json();
  //         } else {
  //             return Promise.reject(`Error: ${res.status}`);
  //         }
  //     });
  // }

  // addLike(cardId, userId) {
  //   if (cardId.likes.some((like) => {return (like._id === userId);})) {
  //     return fetch(`${this.baseUrl}/cards/likes/${cardId._id}`, {
  //         method: "DELETE",
  //         headers: this.headers,
  //     })
  //         .then(res => {
  //             if (res.ok) {
  //                 return res.json();
  //             } else {
  //                 return Promise.reject(`Error: ${res.status}`);
  //             }
  //         });
  //   } else {
  //       return fetch(`${this.baseUrl}/cards/likes/${cardId._id}`, {
  //           method: "PUT",
  //           headers: this.headers,
  //       })
  //           .then(res => {
  //               if (res.ok) {
  //                   return res.json();
  //               } else {
  //                   return Promise.reject(`Error: ${res.status}`);
  //               }
  //           });
  //   }
  // }

  // removeLike(cardId) {
  //   return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
  //     method: "DELETE",
  //     headers: this.headers,
  // })
  //     .then(res => {
  //         if (res.ok) {
  //             return res.json();
  //         } else {
  //             return Promise.reject(`Error: ${res.status}`);
  //         }
  //     });
  // }


  // setUserInfo({ name: newName, job: newJob }) {
  //   return fetch(this.baseUrl + '/users/me', {
  //     method: "PATCH",
  //     headers: this.headers,
  //     body: JSON.stringify({ 
  //       name: newName, 
  //       job: newJob })
  // })
  //     .then(res => {
  //         if (res.ok) {
  //             return res.json();
  //         } else {
  //             return Promise.reject(`Error: ${res.status}`);
  //         }
  //     });
  // }

  // setUserAvatar(avatarLink) {
  //   return fetch(this.baseUrl + '/users/me/avatar', {
  //     method: "PATCH",
  //     headers: this.headers,
  //     body: JSON.stringify(avatarLink)
  //   })
  //     .then(res => {
  //         if (res.ok) {
  //             return res.json();
  //         } else {
  //             return Promise.reject(`Error: ${res.status}`);
  //         }
  //     });
  // }
}