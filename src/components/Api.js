export default class Api {
  constructor(options) {
    this.headers = options.headers;
    this.baseUrl = options.baseUrl; 
  }

  getInitialCards() {
    const cardsUri = this.baseUrl.concat("cards");
    return this._getResource(cardsUri);
  }

  newCard(name, link) {
    const cardsUri = this.baseUrl.concat("cards");
    const body = JSON.stringify({
      name: name,
      link: link
    });
    return this._sendRequestWithBody(cardsUri, body, "POST");
  }

  deleteCard(cardId) {
    const cardUri = this.baseUrl.concat('/cards/').concat(cardId);
    return this._sendRequestWithoutBody(cardUri, "DELETE");
  }

  addLike(cardId) {
    const likeUri = this.baseUrl.concat("/cards/likes/").concat(cardId);
    return this._sendRequestWithoutBody(likeUri, "PUT");
  }

  removeLike(cardId) {
    const likeUri = this.baseUrl.concat("/cards/likes/").concat(cardId);
    return this._sendRequestWithoutBody(likeUri, "DELETE");
  }

  getProfileInfo() {
    const profileUri = this.baseUrl.concat("/users/me");
    return this._getResource(profileUri);
  }

  updateProfileInfo(name, job) {
    const profileUri = this.baseUrl.concat("/users/me");
    const body = JSON.stringify({
      name: name, 
      job: job
    });
    return this._sendRequestWithoutBody(profileUri, body, "PATCH");
  }

  updateProfilePicture(avatarLink) {
    const profileUri = this.baseUrl.concat("/users/me/avatar");
    const body = JSON.stringify({
      avatar: avatarLink
    });
    return this._sendRequestWithBody(profileUri, body, "PATCH");
  }

  // MOVE to function above?????
  _getResource(uri) {
    return fetch(uri, {
      headers: this.headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  _sendRequestWithoutBody(uri, method) {
    return fetch(uri, {
      method: method,
      headers: this.headers
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  _sendRequestWithBody(uri, body, method) {
    return fetch(uri, {
      method: method,
      headers: this.headers,
      body: body
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

}

