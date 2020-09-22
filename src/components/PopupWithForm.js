import React from 'react';

function PopupWithForm(props) {

  return (
  
  <section className={`popup popup_type_${props.name} ${props.isOpen && 'popup_state_opened'}`}>
    <fieldset className="fieldset">
    <div className="popup__container">
      <form className={`popup__form popup__form_type_${props.name}`}>
        <button className={`popup__close popup__close_type_${props.name}`} onClick={props.onClose}></button>  
        <h4 className="popup__title">{props.title}</h4>
        <input className="popup__input popup__input-name" id="name-input" type="text" name="name" required minLength="2" maxLength="40" />
        <span className="popup__input-error" id="name-input-error"></span>

        <input className="popup__input popup__input-description" id="description-input" type="text" name="description" required minLength="2" maxLength="200" />
        <span className="popup__input-error" id="description-input-error"></span>

        <button className={`popup__submit popup__${props.name}-submit`} type="submit">Save</button>
      </form>
    </div>
    </fieldset>
  </section>
  
  )
}

export default PopupWithForm;