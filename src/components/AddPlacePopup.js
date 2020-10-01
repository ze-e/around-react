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
    // Prevent the browser from navigating to the form address
    e.preventDefault();
  
    // Pass the values of the managed components to the external handler
    props.onAddPlace(name, link);
  } 

  return(
    <section className={`popup popup_type_add-card ${props.isOpen  && 'popup_state_opened'}`} >
    <div className="popup__container">
      <form className={`popup__form popup__form_type_add-card`} onSubmit={handleSubmit}>
        <button className={`popup__close popup__close_type_add-card`} type="button" onClick={props.onClose}></button>  
        <h4 className="popup__title">New Place</h4>
        <input className="popup__input popup__input-card-name" id="card-name-input" type="text" name="name" placeholder="Title" required minLength="1" maxLength="30" value={name} onChange={handleChange}/>
      <span className="popup__input-error" id="card-name-input-error"></span>
      
      <input className="popup__input popup__input-card-url" id="url-input" type="url" name="link" placeholder="Image URL" required value={link} onChange={handleChange}/>
      <span className="popup__input-error" id="url-input-error"></span>
        <button className={`popup__submit popup__add-card-submit`} type="submit">Create</button>
      </form>
    </div>
  </section>  
  )
}

export default AddPlacePopup;