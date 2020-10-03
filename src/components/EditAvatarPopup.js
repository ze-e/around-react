import React from 'react';
import {formValidator, fieldValidator} from '../utils/formvalidator'

function EditAvatarPopup(props){

  const [link, setLink] = React.useState('');

  function handleSubmit(e) {
    if(!formInvalid){
      e.preventDefault();
      props.onUpdateAvatar(link);
    }
  } 

  React.useEffect(()=>{
    setLink('');
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
  const [linkError, setLinkError] = React.useState('');
  const [formInvalid, setFormInvalid] = React.useState(true)

  function handleChange(e) {
      //set value
      setLink(e.target.value);
      //set error
      fieldValidator(e.target, setLinkError)
  }
  
    function validateForm(){
      formValidator(formRef.current,'.popup__input')? setFormInvalid(true) : setFormInvalid(false);
    }

  return(
    <section className={`popup popup_type_edit-avatar ${props.isOpen  && 'popup_state_opened'}`} >
    <div className="popup__container">
      <form className={`popup__form popup__form_type_edit-avatar`} onSubmit={handleSubmit} onChange={validateForm} ref={formRef}>
        <button className={`popup__close popup__close_type_edit-avatar`} type="button" onClick={props.onClose}></button>  
        <h4 className="popup__title">Change profile picture</h4>
        <input className={`popup__input popup__input-avatar ${linkError !==null && 'popup__input_type_error'}`} id="avatar-input" type="url" name="avatar"  value={link} placeholder="Image URL" required onChange={handleChange}/>
      <span className={`popup__input-error ${linkError !==null && 'popup__error_visible'}`} id="avatar-input-error">{linkError}</span>
        <button className={`popup__submit popup__edit-avatar-submit ${formInvalid && 'popup__submit_disabled'}`} type="submit" disabled={formInvalid}>Save</button>
      </form>
    </div>
  </section> 
  )
}

export default EditAvatarPopup;