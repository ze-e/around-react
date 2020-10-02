import React from 'react';

function AddPlacePopup(props){
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleChange(e) {
    const targetName = e.target.name;
    const targetValue = e.target.value;
    targetName === 'name' && setName(targetValue);
    targetName === 'link'&& setLink(targetValue);
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Pass the values of the managed components to the external handler
    props.onAddPlace(name, link);
    resetForm();
  } 

  function resetForm(){
    setName('');
    setLink('');
    setFormInvalid(true);
  }
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
  const [linkError, setLinkError] = React.useState(null);
  const [formInvalid, setFormInvalid] = React.useState(true)

  function handleChange(e) {
    e.target.name === 'name' && setName(e.target.value);
    e.target.name === 'link'&& setLink(e.target.value);
  
    //validate fields and display any errors
    inputValidation(e.target);
  }

  function inputValidation(input){
    (input.name === 'name' && !input.validity.valid) ? setNameError(input.validationMessage) : setNameError(null);
    (input.name === 'link' && !input.validity.valid) ? setLinkError(input.validationMessage) : setLinkError(null); 
  }

  function validateForm(){
    const inputList = Array.from(formRef.current.querySelectorAll('.popup__input'));
    inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    }) ? setFormInvalid(true) : setFormInvalid(false);
  }

  return(
    <section className={`popup popup_type_add-card ${props.isOpen  && 'popup_state_opened'}`} >
    <div className="popup__container">
      <form className={`popup__form popup__form_type_add-card`} onSubmit={handleSubmit} onChange={validateForm} ref={formRef}>
        <button className={`popup__close popup__close_type_add-card`} type="button" onClick={props.onClose}></button>  
        <h4 className="popup__title">New Place</h4>
        <input className={`popup__input popup__input-card-name ${nameError !==null && 'popup__input_type_error'}`} id="card-name-input" type="text" name="name" placeholder="Title" required minLength="1" maxLength="30" value={name} onChange={handleChange}/>
      <span className={`popup__input-error" id="card-name-input-error ${nameError !==null && 'popup__error_visible'}`}>{nameError}</span>
      
      <input className={`popup__input popup__input-card-url ${linkError !==null && 'popup__input_type_error'}`} id="url-input" type="url" name="link" placeholder="Image URL" required value={link} onChange={handleChange}/>
      <span className={`popup__input-error ${linkError !==null && 'popup__error_visible'}`} id="url-input-error">{linkError}</span>
        <button className={`popup__submit popup__add-card-submit ${formInvalid && 'popup__submit_disabled'}`} disabled={formInvalid} type="submit">Create</button>
      </form>
    </div>
  </section>  
  )
}

export default AddPlacePopup;