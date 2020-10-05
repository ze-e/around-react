import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';


function Card(props){
  const currentUser = React.useContext(CurrentUserContext);

  function handleClick() {
    props.onCardClick(props.card);
  } 

  function handleLike() {
    props.onCardLike(props.card);
  } 

  function handleDelete() {
    props.onCardDelete(props.card);
  } 

  //control delete button visibility
  const isOwn = props.card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
    `element__delete-button ${isOwn && 'element__delete-button_visibility_visible'}`
  ); 

    //check if card was already liked
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = `element__like-button ${isLiked && 'element__like-button_stateliked'}`; 

  return(
  <>
  <div className={cardDeleteButtonClassName} onClick={handleDelete} ></div>
  <img className="element__image" src={props.card.link} onClick={handleClick} alt="place"/>
  <div className="element__text">
    <h2 className="element__title">{props.card.name}</h2>
    <div className="element__likes-container">
      <button className={cardLikeButtonClassName} onClick={handleLike}></button>
      <p className="element__likes-display">{props.card.likes.length}</p>
    </div>
  </div>
  </>
  )
}

export default Card;