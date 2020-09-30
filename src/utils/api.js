import {token, groupId} from './config';

class Api{
  constructor({baseUrl, token}){
    this.baseUrl = baseUrl;
    this.token = token;
  }
  
  /* API FUNCTIONS */
  getUser(){
    return fetch(`${this.baseUrl}/users/me`,{
      headers: {
        authorization: this.token
      }
    })
    .then((res) => {
      if(res.ok){
        return res.json();
      }
      return Promise.reject(`Error: ${res.statusText}`);
    })
  }
  
  getCards(){
    return fetch(`${this.baseUrl}/cards`,{
      headers: {
        authorization: this.token
      }
    })
    .then((res) => {
      if(res.ok){
        return res.json();
      }
      return Promise.reject(`Error: ${res.statusText}`);
    })
  }

  editProfile({name, about}){
    return fetch(`${this.baseUrl}/users/me`,{
      method: "PATCH",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name,
          about: about
        })
    })
    .then((res) => {
      if(res.ok){
        return res.json();
      }
      return Promise.reject(`Error: ${res.statusText}`);
    })
  }

  editAvatar({link}){
    return fetch(`${this.baseUrl}/users/me/avatar`,{
      method: "PATCH",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json"
        },
        body: JSON.stringify({
          avatar: link
        })
    })
    .then((res) => {
      if(res.ok){
        return res.json();
      }
      return Promise.reject(`editAvatar Error: ${res.statusText}`);
    })
  }

  addCard({name, link}){
    return fetch(`${this.baseUrl}/cards`,{
      method: "POST",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name,
          link: link
        })
    })
    .then((res) => {
      if(res.ok){
        return res.json();
      }
      return Promise.reject(`Error: ${res.statusText}`);
    })
  }

  deleteCard(cardId){
    return fetch(`${this.baseUrl}/cards/${cardId}`,{
      method: "DELETE",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json"
        }
    })
    .then((res) => {
      if(res.ok){
        return res.json();
      }
      return Promise.reject(`Error: ${res.statusText}`);
    })
  }

  changeLikeCardStatus(cardId, liked){
    return liked ? this.deleteLike(cardId) : this.addLike(cardId);
  }

  addLike(cardId){
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`,{
      method: "PUT",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json"
        }
    })
    .then((res) => {
      if(res.ok){
        return res.json();
      }
      return Promise.reject(`editLikes Error: ${res.statusText}`);
    })

  }

  deleteLike(cardId){
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`,{
      method: "DELETE",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json"
        }
    })
    .then((res) => {
      if(res.ok){
        return res.json();
      }
      return Promise.reject(`editLikes Error: ${res.statusText}`);
    })
  }
}

const api = new Api({
  baseUrl : `https://around.nomoreparties.co/v1/${groupId}`, 
  token : token
});

export {api};