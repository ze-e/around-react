import React from 'react';
import Card from './Card.js';
import {api} from '../utils/api.js';

function Main(props) {

  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('#');
  const [cards, setCards] = React.useState([]);

  React.useEffect(()=>{
    api.getUser().then((data) => {  
      const [name, description, avatar] = [data.name, data.about, data.avatar];
      setUserName(name);
      setUserDescription(description);
      setUserAvatar(avatar);

      //after getting the user, load the cards
      api.getCards().then((data) => {  
        setCards(data)
      }).catch((err) => { 
          console.log(err);  
        });
    }).catch((err) => { 
        console.log(err);  
      });
  })
  
  return (
  <>
  <section className="profile">
    <div className="profile__image-container">
      <div className="profile__image-overlay" onClick={props.onEditAvatar}></div>
      <img className="profile__image" src={userAvatar} alt="profile-img"/>
    </div>
    <div className="profile__info">
  <h1 className="profile__name">{userName}</h1>
      <button className="profile__edit-button" onClick={props.onEditProfile} aria-label="edit profile"></button>       
  <p className="profile__description">{userDescription}</p>     
    </div>
    <button className="profile__add-button" onClick={props.onAddPlace}></button>
  </section>

  <section className="elements">
    {cards.map(card => (
      <div className="element" key={card._id}>
        <Card card={card} onCardClick = {props.onCardClick}/>
      </div>
    ))}
  </section>
  </>
)}

export default Main;