import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm';

function App() {

  function handleEditProfileClick(){
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick(){
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick(){
    setisEditAvatarPopupOpen(true);
  }
  
  function closeAllPopups(){
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setisEditAvatarPopupOpen(false);
  }

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = React.useState(false);


  return (
<div className="App">
<div className="page">

  <Header />
  <Main 
    onEditProfile={handleEditProfileClick}
    onAddPlace={handleAddPlaceClick}
    onEditAvatar={handleEditAvatarClick}
  />
  <Footer />
  <PopupWithForm name="edit-profile" title="Edit Profile" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}/>
  <PopupWithForm name="add-card" title="New Place" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}/>
  <PopupWithForm name="edit-avatar" title="Change profile picture" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}/>


</div>     
</div>//APP
  );
}

export default App;
