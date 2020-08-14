!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/web_project_4/",n(n.s=1)}([function(e,t,n){},function(e,t,n){"use strict";n.r(t);n(0);function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var o=function(){function e(t){var n=t.baseUrl,r=t.headers;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.headers=r,this.baseUrl=n}var t,n,o;return t=e,(n=[{key:"getAppInfo",value:function(){return Promise.all([this.getInitialCards(),this.getUserInfo()])}},{key:"getInitialCards",value:function(){return fetch(this.baseUrl+"/cards",{headers:this.headers}).then((function(e){return e.ok?e.json():Promise.reject("Error: "+e.status)})).catch((function(e){return console.log(e)}))}},{key:"getUserInfo",value:function(){return fetch(this.baseUrl+"/users/me",{headers:this.headers}).then((function(e){return e.ok?e.json():Promise.reject("Error: ".concat(e.status))})).catch((function(e){return console.log(e)}))}},{key:"newCard",value:function(e){var t=e.name,n=e.link;return fetch(this.baseUrl+"/cards",{method:"POST",headers:this.headers,body:JSON.stringify({name:t,link:n})}).then((function(e){return e.ok?e.json():Promise.reject("Error: ".concat(e.status))})).catch((function(e){return console.log(e)}))}},{key:"deleteCard",value:function(e){return fetch(this.baseUrl+"/cards/"+e,{method:"DELETE",headers:this.headers}).then((function(e){return e.ok?e.json():Promise.reject("Error: ".concat(e.status))})).catch((function(e){return console.log(e)}))}},{key:"updateLike",value:function(e){var t=e.cardLiked,n=e.cardId;return fetch(this.baseUrl+"/cards/likes/"+n,{method:t?"PUT":"DELETE",headers:this.headers}).then((function(e){return e.ok?e.json():Promise.reject("Error: ".concat(e.status))})).catch((function(e){return console.log(e)}))}},{key:"editUserInfo",value:function(e){var t=e.name,n=e.about;return fetch(this.baseUrl+"/users/me",{method:"PATCH",headers:this.headers,body:JSON.stringify({name:t,about:n})}).then((function(e){return e.ok?e.json():Promise.reject("Error: ".concat(e.status))})).catch((function(e){return console.log(e)}))}},{key:"setUserAvatar",value:function(e){return fetch(this.baseUrl+"/users/me/avatar",{method:"PATCH",headers:this.headers,body:JSON.stringify({avatar:e})}).then((function(e){return e.ok?e.json():Promise.reject("Error: ".concat(e.status))})).catch((function(e){return console.log(e)}))}}])&&r(t.prototype,n),o&&r(t,o),e}();function i(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var a=function(){function e(t,n){var r=t.cardItem,o=t.userId,i=t.handleCardClick,a=t.handleDeleteClick,u=t.handleLikeButtonClick,c=t.userLikedCard;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._name=r.name,this._link=r.link,this._cardId=r._id,this._owner=r.owner._id,this._likes=r.likes,this._user=o,this._handleCardClick=i,this._userLikedCard=c,this._handleLikeButtonClick=u,this._handleDeleteClick=a,this._cardSelector=n}var t,n,r;return t=e,(n=[{key:"_getTemplate",value:function(){return document.querySelector(this._cardSelector).content.querySelector(".card").cloneNode(!0)}},{key:"_likeCard",value:function(e){this.likes=e,this._element.querySelector(".card__like-count").textContent=e.length,this._element.querySelector(".card__like-button").classList.toggle("card__like-button_active")}},{key:"_handleLikeClick",value:function(e){var t=this;this._handleLikeButtonClick({cardLiked:!e.classList.contains("card__like-button_active"),cardId:this._cardId}).then((function(e){t._likeCard(e)}))}},{key:"_setEventListeners",value:function(){var e=this;this._element.querySelector(".card__img").addEventListener("click",(function(){e._handleCardClick({name:e._name,link:e._link})})),this._element.querySelector(".card__delete-button").addEventListener("click",(function(){var t=e._element.querySelector(".card__delete-button").closest(".card");e._handleDeleteClick(t)}));var t=this._element.querySelector(".card__like-button");t.addEventListener("click",(function(){return e._handleLikeClick(t)}))}},{key:"removeCard",value:function(){this._element.remove(),this._element=null}},{key:"createCard",value:function(){return this._element=this._getTemplate(),this._setEventListeners(),this._owner!==this._user&&(this._element.querySelector(".card__delete-button").style.display="none"),this._userLikedCard&&this._element.querySelector(".card__like-button").classList.add("card__like-button_active"),this._element.querySelector(".card__img").src=this._link,this._element.querySelector(".card__img").alt=this._name,this._element.querySelector(".card__name").textContent=this._name,this._element.querySelector(".card__like-count").textContent=this._likes.length,this._element}}])&&i(t.prototype,n),r&&i(t,r),e}();function u(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var c=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._form=t,this._settings=n}var t,n,r;return t=e,(n=[{key:"_showInputError",value:function(e,t){var n=this._form.querySelector("#".concat(e.id,"-error"));e.classList.add(this._settings.inputErrorClass),n.textContent=t,n.classList.add(this._settings.errorClass)}},{key:"_hideInputError",value:function(e){var t=this._form.querySelector("#".concat(e.id,"-error"));e.classList.remove(this._settings.inputErrorClass),t.classList.remove(this._settings.errorClass),t.textContent=""}},{key:"_checkInputValidity",value:function(e){e.validity.valid?this._hideInputError(e):this._showInputError(e,e.validationMessage)}},{key:"_hasInvalidInput",value:function(e){return e.some((function(e){return!e.validity.valid}))}},{key:"_toggleButtonState",value:function(e,t){this._hasInvalidInput(e)?(t.classList.add(this._settings.inactiveButtonClass),t.disabled=!0):(t.classList.remove(this._settings.inactiveButtonClass),t.disabled=!1)}},{key:"_setEventListeners",value:function(){var e=this,t=Array.from(this._form.querySelectorAll(this._settings.inputSelector)),n=this._form.querySelector(this._settings.submitButtonSelector);this._toggleButtonState(t,n),t.forEach((function(r){r.addEventListener("input",(function(){e._checkInputValidity(r),e._toggleButtonState(t,n)}))}))}},{key:"enableValidation",value:function(){this._setEventListeners()}}])&&u(t.prototype,n),r&&u(t,r),e}();function s(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var l=function(){function e(t,n){var r=t.items,o=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._items=r,this._renderer=o,this._container=document.querySelector(n)}var t,n,r;return t=e,(n=[{key:"addItems",value:function(e){this._container.prepend(e)}},{key:"renderItems",value:function(){var e=this;this._items.forEach((function(t){e._renderer(t)}))}}])&&s(t.prototype,n),r&&s(t,r),e}();function f(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var p=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._popup=document.querySelector(t),this._handleEscClose=this._handleEscClose.bind(this)}var t,n,r;return t=e,(n=[{key:"open",value:function(){var e=this;this._popup.classList.add("popup_opened"),document.addEventListener("keydown",(function(t){return e._handleEscClose(t.key)}))}},{key:"close",value:function(){var e=this;this._popup.classList.remove("popup_opened"),document.removeEventListener("keydown",(function(){return e._handleEscClose}))}},{key:"_handleEscClose",value:function(e){"Escape"===e&&this.close()}},{key:"setEventListeners",value:function(){var e=this;this._popup.addEventListener("click",(function(t){t.target.classList.contains("popup")&&(e.close(t.target),t.preventDefault())})),this._popup.querySelector(".popup__button_role_close").addEventListener("click",(function(t){e.close(),t.stopPropagation()}))}}])&&f(t.prototype,n),r&&f(t,r),e}();function d(e){return(d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function h(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function _(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function y(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function v(e,t,n){return(v="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=g(e)););return e}(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(n):o.value}})(e,t,n||e)}function m(e,t){return(m=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function b(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=g(e);if(t){var o=g(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return k(this,n)}}function k(e,t){return!t||"object"!==d(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function g(e){return(g=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var S=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&m(e,t)}(i,e);var t,n,r,o=b(i);function i(e,t,n){var r;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,i),(r=o.call(this,n))._callback=e,r._form=r._popup.querySelector(".popup__form"),r._submitButton=r._form.querySelector(".popup__button_role_save"),r._submitButtonText=r._submitButton.textContent,r._submitButtonLoading=t,r}return t=i,(n=[{key:"_getInputValues",value:function(){var e=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?h(Object(n),!0).forEach((function(t){_(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):h(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},this._callbackParameters),t=Object.fromEntries(new FormData(this._form));return Object.assign(t,e),t}},{key:"renderLoading",value:function(e){this._submitButton.textContent=e?this._submitButtonLoading:this._submitButtonText}},{key:"open",value:function(e){this._callbackParameters=e||{},v(g(i.prototype),"open",this).call(this)}},{key:"close",value:function(){v(g(i.prototype),"close",this).call(this),this._form.reset()}},{key:"setEventListeners",value:function(){var e=this;v(g(i.prototype),"setEventListeners",this).call(this),this._form.addEventListener("submit",(function(t){t.preventDefault(),e._callback(e._getInputValues(t)),e.renderLoading(!0),t.stopPropagation()}))}}])&&y(t.prototype,n),r&&y(t,r),i}(p);function w(e){return(w="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function C(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function j(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function E(e,t,n){return(E="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=I(e)););return e}(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(n):o.value}})(e,t,n||e)}function O(e,t){return(O=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function L(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=I(e);if(t){var o=I(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return P(this,n)}}function P(e,t){return!t||"object"!==w(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function I(e){return(I=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var q=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&O(e,t)}(i,e);var t,n,r,o=L(i);function i(){return C(this,i),o.apply(this,arguments)}return t=i,(n=[{key:"open",value:function(e){var t=e.name,n=e.link,r=this._popup.querySelector(".popup__img");this._popup.querySelector(".popup__img-title").textContent=t,r.alt=t,r.src=n,E(I(i.prototype),"open",this).call(this)}}])&&j(t.prototype,n),r&&j(t,r),i}(p);function U(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var x=function(){function e(t){var n=t.nameSelector,r=t.jobSelector,o=t.avatarSelector;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._name=document.querySelector(n),this._about=document.querySelector(r),this._avatar=document.querySelector(o)}var t,n,r;return t=e,(n=[{key:"getUserInfo",value:function(){document.querySelector(".popup__field_name").value=this._name.textContent,document.querySelector(".popup__field_job").value=this._about.textContent}},{key:"setUserInfo",value:function(e){var t=e.name,n=e.about;this._name.textContent=t,this._about.textContent=n}},{key:"setUserAvatar",value:function(e){var t=e.avatar;this._avatar.src=t}}])&&U(t.prototype,n),r&&U(t,r),e}(),T={formSelector:".popup__form",inputSelector:".popup__field",submitButtonSelector:".popup__button_role_save",inactiveButtonClass:"popup__button_role_inactive",inputErrorClass:"popup__field_type_error",errorClass:"popup__field-error_active"},D=Array.from(document.querySelectorAll(T.formSelector)),A=document.querySelector(".profile__button_role_edit"),B=document.querySelector(".profile__button_role_add"),R=document.querySelector(".profile__button_role_edit-avatar");function M(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],r=!0,o=!1,i=void 0;try{for(var a,u=e[Symbol.iterator]();!(r=(a=u.next()).done)&&(n.push(a.value),!t||n.length!==t);r=!0);}catch(e){o=!0,i=e}finally{try{r||null==u.return||u.return()}finally{if(o)throw i}}return n}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return V(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return V(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function V(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var N=new o({baseUrl:"https://around.nomoreparties.co/v1/group-1",headers:{authorization:"221729e2-57e6-4114-b977-8051f88d50cb","Content-Type":"application/json"}});function J(e){X.open(e)}function H(e){var t=e.cardLiked,n=e.cardId;return N.updateLike({cardLiked:t,cardId:n}).then((function(e){return e.likes}))}function z(e){var t=e.cardItem,n=e.userId,r=t.likes.map((function(e){return e._id})).includes(n),o=new a({cardItem:t,popup:q,userId:n,handleCardClick:J,handleDeleteClick:function(){W.open({cardId:t._id})},handleLikeButtonClick:H,userLikedCard:r},".template-card");return F[t._id]=o,o.createCard()}var F={};var $=new x({nameSelector:".profile__title",jobSelector:".profile__job",avatarSelector:".profile__avatar-img"}),G=new S((function(e){var t=e["name-input"],n=e["job-input"];return N.editUserInfo({name:t,about:n}).then((function(e){var t=e.name,n=e.about;$.setUserInfo({name:t,about:n}),G.close(),G.renderLoading(!1)}))}),"Saving...",".popup_type_edit"),K=new S((function(e){var t=e["place-input"],n=e["image-input"];N.newCard({name:t,link:n}).then((function(e){Y.addItems(z({cardItem:e,likes:e.likes,cardId:e._id,owner:e.owner._id,handleDeleteClick:function(){return W.open({cardId:e._id})}})),K.close(),K.renderLoading(!1)}))}),"Saving...",".popup_type_add-place"),Q=new S((function(e){var t=e["edit-pic"];N.setUserAvatar({avatar:t}).then((function(){$.setUserAvatar({avatar:t}),Q.close(),Q.renderLoading(!1)}))}),"Saving...",".popup_type_edit-pic"),W=new S((function(e){var t=e.cardId;N.deleteCard(t).then((function(){F[t].removeCard(),delete F[t],W.close(),W.renderLoading(!1)}))}),"Deleting...",".popup_type_delete"),X=new q(".popup_type_image"),Y=new l({items:[],renderer:function(){}},".cards__list");N.getAppInfo().then((function(e){var t=M(e,2),n=t[0],r=t[1],o=r._id;n.forEach((function(e){Y.addItems(z({cardItem:e,userId:o}))})),$.setUserInfo({name:r.name,about:r.about}),$.setUserAvatar({avatar:r.avatar})})),D.forEach((function(e){new c(e,T).enableValidation()})),X.setEventListeners(),W.setEventListeners(),K.setEventListeners(),B.addEventListener("click",(function(){return K.open([null,null])})),G.setEventListeners(),A.addEventListener("click",(function(){$.getUserInfo(),G.open()})),Q.setEventListeners(),R.addEventListener("click",(function(){return Q.open()}))}]);