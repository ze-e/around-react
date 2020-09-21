import React from 'react';

function PopupWithImage(props) {
  React.useEffect(()=>{
    const popupElem = document.querySelector('.popup_type_image');
    props.card ? popupElem.classList.add('popup_state_opened') : popupElem.classList.remove('popup_state_opened');
  })

  return (
    <section className="popup popup_type_image">
    <div className="popup__container">
      <div className="popup__image-modal">
        <button className="popup__close popup__close_type_image" onClick={props.onClose}></button>  
        <figure>
          <img className="popup__image" src={props.card && props.card.link}/>
          <figcaption className="popup__image-caption"></figcaption>
        </figure>
      </div>
    </div>
    </section>
  )
}

export default PopupWithImage;