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
  const [selectedCard , setselectedCard ] = React.useState();

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
    setselectedCard();
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
    isOpen={isEditProfilePopupOpen} 
    onClose={closeAllPopups}/>

  <PopupWithForm 
    name="add-card" 
    title="New Place" 
    isOpen={isAddPlacePopupOpen} 
    onClose={closeAllPopups}/>

  <PopupWithForm 
    name="edit-avatar" 
    title="Change profile picture" 
    isOpen={isEditAvatarPopupOpen} 
    onClose={closeAllPopups}/>
  
  <PopupWithImage 
    card={selectedCard} 
    onClose={closeAllPopups}/>

</div>     
  );
}

export default App;
