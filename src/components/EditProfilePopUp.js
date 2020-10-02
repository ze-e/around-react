import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import FormValidator from '../utils/formValidator2';

function EditProfilePopUp(props){
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [nameError, setNameError] = React.useState(null);
  const [descriptionError, setDescriptionError] = React.useState(null);
  
  //form validation
  const formRef = React.useRef();
  const formValidator = new FormValidator(formRef, '.popup__input');
  const [isValid, errorList] = formValidator.getErrors();

  // Subscription to the context
const currentUser = React.useContext(CurrentUserContext);

function handleChange(e) {
  e.target.name === 'name' && setName(e.target.value);
  e.target.name === 'description'&& setDescription(e.target.value);
  inputValidation(e.target);
}

  function handleSubmit(e) {
      // Prevent the browser from navigating to the form address
      e.preventDefault();
    
      // Pass the values of the managed components to the external handler
      props.onUpdateUser(name, description);
  } 

  function inputValidation(input){
    (input.name === 'name' && !input.validity.valid) ? setNameError(input.validationMessage) : setNameError(null);
    (input.name === 'description' && !input.validity.valid) ? setDescriptionError(input.validationMessage) : setDescriptionError(null); 
  }

 //? setFormValid(false) : setFormValid(true);
  



  return(
    <section className={`popup popup_type_edit-profile ${props.isOpen  && 'popup_state_opened'}`} >
    <div className="popup__container">
      <form className={`popup__form popup__form_type_edit-profile`} onSubmit={handleSubmit} ref={formRef}>
        <button className={`popup__close popup__close_type_edit-profile`} type="button" onClick={props.onClose}></button>  
        <h4 className="popup__title">Edit Profile</h4>
        <input className={`popup__input popup__input-name ${nameError !==null && 'popup__input_type_error'}`} id="name-input" type="text" name="name" placeholder={currentUser.name} required minLength="2" maxLength="40" value={name} onChange={handleChange}/>
          <span className={`popup__input-error" id="name-input-error ${nameError !==null && 'popup__error_visible'}`}>{nameError}</span>
        <input className={`popup__input popup__input-description ${descriptionError !==null && 'popup__input_type_error'}`} id="description-input" type="text" name="description" placeholder={currentUser.about} required minLength="2" maxLength="200" value={description} onChange={handleChange}/>
          <span className={`popup__input-error" id="description-input-error ${descriptionError !==null && 'popup__error_visible'}`}>{descriptionError}</span>
        <button className={`popup__submit popup__edit-profile-submit ${(nameError !==null || descriptionError !==null) && 'popup__submit_disabled'}`} disabled={nameError !==null || descriptionError !==null} type="submit" >Save</button>
      </form>
    </div>
  </section>  
  )
}

export default EditProfilePopUp;