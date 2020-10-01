import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function EditProfilePopUp(props){
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
    <section className={`popup popup_type_edit-profile ${props.isOpen  && 'popup_state_opened'}`} >
    <div className="popup__container">
      <form className={`popup__form popup__form_type_edit-profile`} onSubmit={handleSubmit}>
        <button className={`popup__close popup__close_type_edit-profile`} type="button" onClick={props.onClose}></button>  
        <h4 className="popup__title">Edit Profile</h4>
        <input className="popup__input popup__input-name" id="name-input" type="text" name="name" placeholder={currentUser.name} minLength="2" maxLength="40" value={name} onChange={handleNameChange}/>
          <span className="popup__input-error" id="name-input-error"></span>
          <input className="popup__input popup__input-description" id="description-input" type="text" name="description" placeholder={currentUser.about} required minLength="2" maxLength="200" value={description} onChange={handleDescriptionChange}/>
          <span className="popup__input-error" id="description-input-error"></span>
        <button className={`popup__submit popup__edit-profile-submit`} type="submit">Save</button>
      </form>
    </div>
  </section>  
  )
}

export default EditProfilePopUp;