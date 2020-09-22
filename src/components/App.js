import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm';
import PopupWithImage from './PopupWithImage';


function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard , setselectedCard ] = React.useState({link:'#'});

  function handleEditProfileClick(){
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick(){
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick(){
    setisEditAvatarPopupOpen(true);
  }

  function handleCardClick(card){
    setselectedCard(card);
  }
  
  function closeAllPopups(){
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setisEditAvatarPopupOpen(false);
    setselectedCard({link:'#'});
  }

  return (
<div className="App page">

  <Header />
  <Main 
    onEditProfile = {handleEditProfileClick}
    onAddPlace = {handleAddPlaceClick}
    onEditAvatar = {handleEditAvatarClick}
    onCardClick = {handleCardClick}
  />
  <Footer />
  <PopupWithForm 
    name="edit-profile" 
    title="Edit Profile" 
    children={
      <>
        <input className="popup__input popup__input-name" id="name-input" type="text" name="name" placeholder="Jaques Costeau" minLength="2" maxLength="40"/>
        <span className="popup__input-error" id="name-input-error"></span>
        <input className="popup__input popup__input-description" id="description-input" type="text" name="description" placeholder="Explorer" required minLength="2" maxLength="200" />
        <span className="popup__input-error" id="description-input-error"></span>
      </>
    }
    isOpen={isEditProfilePopupOpen} 
    onClose={closeAllPopups}/>

  <PopupWithForm 
    name="add-card" 
    title="New Place" 
    children={
    <>
      <input className="popup__input popup__input-card-name" id="card-name-input" type="text" name="name" placeholder="Title" required minLength="1" maxLength="30" />
      <span className="popup__input-error" id="card-name-input-error"></span>
      
      <input className="popup__input popup__input-card-url" id="url-input" type="url" name="link" placeholder="Image URL" required />
      <span className="popup__input-error" id="url-input-error"></span>
    </>

    }
    isOpen={isAddPlacePopupOpen} 
    onClose={closeAllPopups}/>

  <PopupWithForm 
    name="edit-avatar" 
    title="Change profile picture" 
    children={
      <>
      <input className="popup__input popup__input-avatar" id="avatar-input" type="url" name="avatar" placeholder="Image URL" required />
      <span className="popup__input-error" id="avatar-input-error"></span>
      </>
      }
    isOpen={isEditAvatarPopupOpen} 
    onClose={closeAllPopups}/>
  
  <PopupWithImage 
    card={selectedCard} 
    onClose={closeAllPopups}/>

</div>     
  );
}

export default App;
