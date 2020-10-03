import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import formValidator from '../utils/formvalidator'

function EditProfilePopUp(props){
  
  // Subscription to the context
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  
  function handleSubmit(e) {
    //check if the form is valid before sending
    if(!formInvalid){
      e.preventDefault();   
      // Pass the values of the managed components to the external handler
      props.onUpdateUser(name, description);
    }
  } 

  React.useEffect(()=>{
    setName('');
    setDescription('');
    setFormInvalid(true);
  },[props.isOpen])

  /* CLIENT FORM VALIDATION
    By default, no validation error for blank required field is 
    shown at the beginning, but the submit button will be
    disabled.

    The button style/disabled state and individual field validations are 
    independent of one another. Field validations control only the field styles, 
    and form/button validation controls the ability to send the form
  */
  const formRef = React.useRef();
  const [nameError, setNameError] = React.useState(null);
  const [descriptionError, setDescriptionError] = React.useState(null);
  const [formInvalid, setFormInvalid] = React.useState(true)

function handleChange(e) {
  e.target.name === 'name' && setName(e.target.value);
  e.target.name === 'description'&& setDescription(e.target.value);

  //validate fields and display any errors
  inputValidation(e.target);
}

  function inputValidation(input){
    (input.name === 'name' && !input.validity.valid) ? setNameError(input.validationMessage) : setNameError(null);
    (input.name === 'description' && !input.validity.valid) ? setDescriptionError(input.validationMessage) : setDescriptionError(null); 
  }


  function validateForm(){
    formValidator(formRef.current,'.popup__input')? setFormInvalid(true) : setFormInvalid(false);
  }

  return(
    <section className={`popup popup_type_edit-profile ${props.isOpen  && 'popup_state_opened'}`} >
    <div className="popup__container">
      <form className={`popup__form popup__form_type_edit-profile`} onSubmit={handleSubmit} onChange={validateForm} ref={formRef}>
        <button className={`popup__close popup__close_type_edit-profile`} type="button" onClick={props.onClose}></button>  
        <h4 className="popup__title">Edit Profile</h4>
        <input className={`popup__input popup__input-name ${nameError !==null && 'popup__input_type_error'}`} id="name-input" type="text" name="name" required minLength="2" maxLength="40" value={name} onChange={handleChange}/>
          <span className={`popup__input-error" id="name-input-error ${nameError !==null && 'popup__error_visible'}`}>{nameError}</span>
        <input className={`popup__input popup__input-description ${descriptionError !==null && 'popup__input_type_error'}`} id="description-input" type="text" name="description" required minLength="2" maxLength="200" value={description} onChange={handleChange}/>
          <span className={`popup__input-error" id="description-input-error ${descriptionError !==null && 'popup__error_visible'}`}>{descriptionError}</span>
        <button className={`popup__submit popup__edit-profile-submit ${formInvalid && 'popup__submit_disabled'}`} disabled={formInvalid} type="submit" >Save</button>
      </form>
    </div>
  </section>  
  )
}

export default EditProfilePopUp;