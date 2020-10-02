import React from 'react';

function DeletePopup(props){

  function handleSubmit(e){
    e.preventDefault();
    props.onDelete(props.card);
  }

  return(
    <section className={`popup popup_type_delete ${props.isOpen && 'popup_state_opened'}`}>
      <div className="popup__container">
        <form className="popup__form" onSubmit={handleSubmit}>
          <button className="popup__close popup__close_type_add-card"></button>  
          <h4 className="popup__title popup__title_type_no-bottom-margin">Are you sure?</h4>
          <button className="popup__submit popup__delete-submit" type="submit">Delete</button>      
        </form>
      </div>
    </section>
  )
}

export default DeletePopup;