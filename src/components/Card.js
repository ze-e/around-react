import React from 'react';

function Card(props){

  function handleClick() {
    props.onCardClick(props.card);
  } 

  return(
  <>
  <div className="element__delete-button"></div>
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