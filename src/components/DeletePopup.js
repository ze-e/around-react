import React from 'react';

function DeletePopup(props){

  return(
    <section className={`popup popup_type_delete ${props.isOpen && 'popup_state_opened'}`}>
      <div className="popup__container">
        <div className="popup__form">
          <button className="popup__close popup__close_type_add-card"></button>  
          <h4 className="popup__title popup__title_type_no-bottom-margin">Are you sure?</h4>
          <button className="popup__submit popup__delete-submit" type="submit">Delete</button>      
        </div>
      </div>
    </section>
  )
}

export default DeletePopup;