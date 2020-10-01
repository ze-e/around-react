import React from 'react';
import Card from './Card.js';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('#');

  React.useEffect(()=>{
      setUserName(currentUser.name);
      setUserDescription(currentUser.about);
      setUserAvatar(currentUser.avatar);
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
    {props.cards.map(card => (
      <div className="element" key={card._id}>
        <Card card={card} onCardClick = {props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete}/>
      </div>
    ))}
  </section>
  </>
)}

export default Main;