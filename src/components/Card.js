import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';


function Card(props){
  const currentUser = React.useContext(CurrentUserContext);

  function handleClick() {
    props.onCardClick(props.card);
  } 

  //control delete button visibility
  const isOwn = props.card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
    `element__delete-button ${isOwn && 'element__delete-button_visibility_visible'}`
  ); 
  return(
  <>
  <div className={cardDeleteButtonClassName}></div>
  <img className="element__image" src={props.card.link} onClick={handleClick}/>
  <div className="element__text">
    <h2 className="element__title">{props.card.name}</h2>
    <div className="element__likes-container">
      <button className="element__like-button"></button>
      <p className="element__likes-display">{props.card.likes.length}</p>
    </div>
  </div>
  </>
  )
}

export default Card;