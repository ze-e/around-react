import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function AddPlacePopup(props){
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  // Subscription to the context
const currentUser = React.useContext(CurrentUserContext);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Prevent the browser from navigating to the form address
    e.preventDefault();
  
    // Pass the values of the managed components to the external handler
    props.onUpdateUser(name, description);
  } 

  return(
    <section className={`popup popup_type_add-card ${props.isOpen  && 'popup_state_opened'}`} >
    <div className="popup__container">
      <form className={`popup__form popup__form_type_add-card`} onSubmit={handleSubmit}>
        <button className={`popup__close popup__close_type_add-card`} type="button" onClick={props.onClose}></button>  
        <h4 className="popup__title">New Place</h4>
        <input className="popup__input popup__input-card-name" id="card-name-input" type="text" name="name" placeholder="Title" required minLength="1" maxLength="30" />
      <span className="popup__input-error" id="card-name-input-error"></span>
      
      <input className="popup__input popup__input-card-url" id="url-input" type="url" name="link" placeholder="Image URL" required />
      <span className="popup__input-error" id="url-input-error"></span>
        <button className={`popup__submit popup__add-card-submit`} type="submit">Create</button>
      </form>
    </div>
  </section>  
  )
}

export default AddPlacePopup;