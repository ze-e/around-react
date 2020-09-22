import React from 'react';

function PopupWithForm(props) {

  return (
  
  <section className={`popup popup_type_${props.name} ${props.isOpen && 'popup_state_opened'}`}>
    <div className="popup__container">
      <form className={`popup__form popup__form_type_${props.name}`}>
        <button className={`popup__close popup__close_type_${props.name}`} onClick={props.onClose}></button>  
        <h4 className="popup__title">{props.title}</h4>
        {props.children}
        <button className={`popup__submit popup__${props.name}-submit`} type="submit">Save</button>
      </form>
    </div>
  </section>
  
  )
}

export default PopupWithForm;