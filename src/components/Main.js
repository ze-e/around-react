import React from 'react';
import profileImg from '../images/profile-img.png';

function Main(props) {

  React.useEffect(()=>{
    document.querySelector('.profile__edit-button').addEventListener('click', props.onEditProfile);
    document.querySelector('.profile__add-button').addEventListener('click', props.onAddPlace);
    document.querySelector('.profile__image-container').addEventListener('click', props.onEditAvatar);

    return()=>{
      document.querySelector('.profile__edit-button').removeEventListener('click', props.onEditProfile);
      document.querySelector('.profile__add-button').removeEventListener('click', props.onAddPlace);
      document.querySelector('.profile__image-container').removeEventListener('click', props.onEditAvatar);
    }

  })
  
  return (

  <>
  <section className="profile">
    <div className="profile__image-container">
      <div className="profile__image-overlay"></div>
      <img className="profile__image" src={profileImg} alt="profile-img"/>
    </div>
    <div className="profile__info">
      <h1 className="profile__name">Jacques Cousteau</h1>
      <button className="profile__edit-button" aria-label="edit profile"></button>       
      <p className="profile__description">Explorer</p>     
    </div>
    <button className="profile__add-button"></button>
  </section>

  <section className="elements">
  <template id="card">
    <div className="element">
        <div className="element__delete-button"></div>
        <img className="element__image" />
        <div className="element__text">
          <h2 className="element__title"></h2>
          <div className="element__likes-container">
            <button className="element__like-button"></button>
            <p className="element__likes-display">0</p>
          </div>
        </div>
    </div>
  </template>
  </section>
  </>
)}

export default Main;