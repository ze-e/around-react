import React from 'react';

function DeletePopup(props){
  //loading
  const [loading, setLoading] = React.useState(false);

  //reset form on open
  React.useEffect(()=>{
    setLoading(false);
  },[props.isOpen])

  function handleSubmit(e){
    e.preventDefault();
    props.onDelete(props.card._id);

    //set loading
    setLoading(true);
  }


  return(
    <section className={`popup popup_type_delete ${props.isOpen && 'popup_state_opened'}`} onClick={(e)=>{props.onOutsideClick(e,'popup_type_delete')}}>
      <div className="popup__container">
        <form className="popup__form" onSubmit={handleSubmit}>
          <button className="popup__close popup__close_type_add-card"></button>  
          <h4 className="popup__title popup__title_type_no-bottom-margin">Are you sure?</h4>
          <button className="popup__submit popup__delete-submit" type="submit">{`${loading ? 'Loading...':'Delete'}`}</button>      
        </form>
      </div>
    </section>
  )
}

export default DeletePopup;