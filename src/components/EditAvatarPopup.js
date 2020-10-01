import React from 'react';

function EditAvatarPopup(props){
  const [value, setValue] = React.useState('');

  function handleChange(e){
    setValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      link: value
    });
    setValue('');
    props.onClose();
  } 

  return(
    <section className={`popup popup_type_edit-avatar ${props.isOpen  && 'popup_state_opened'}`} >
    <div className="popup__container">
      <form className={`popup__form popup__form_type_edit-avatar`} onSubmit={handleSubmit}>
        <button className={`popup__close popup__close_type_edit-avatar`} type="button" onClick={props.onClose}></button>  
        <h4 className="popup__title">Change profile picture</h4>
        <input className="popup__input popup__input-avatar" id="avatar-input" type="url" name="avatar"  value={value} placeholder="Image URL" required onChange={handleChange}/>
      <span className="popup__input-error" id="avatar-input-error"></span>
        <button className={`popup__submit popup__edit-avatar-submit`} type="submit">Save</button>
      </form>
    </div>
  </section> 
  )
}

export default EditAvatarPopup;