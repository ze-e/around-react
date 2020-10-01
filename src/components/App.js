import React from 'react';
//component
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import PopupWithImage from './PopupWithImage';
import EditProfilePopUp from './EditProfilePopUp';
//context
import {CurrentUserContext} from '../contexts/CurrentUserContext';
//util
import {api} from '../utils/api';



function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setselectedCard] = React.useState({link:'#'});
  const [currentUser, setcurrentUser] = React.useState({});

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

  function handleUpdateUser(name, about){
    api.editProfile(name, about).then((data)=>{
      setcurrentUser(data);
    }).catch((err) => { 
      console.log(err);  
    });
    closeAllPopups();
  }


  React.useEffect(()=>{
    api.getUser().then((data)=>{
      setcurrentUser(data);
  }).catch((err) => { 
    console.log(err);  
  });
})

  return (
<div className="App page">
<CurrentUserContext.Provider value={currentUser}>
  <Header />
  <Main 
    onEditProfile = {handleEditProfileClick}
    onAddPlace = {handleAddPlaceClick}
    onEditAvatar = {handleEditAvatarClick}
    onCardClick = {handleCardClick}
    card = {selectedCard}
  />
  <Footer />

  <EditProfilePopUp 
    isOpen={isEditProfilePopupOpen} 
    onClose={closeAllPopups}
    onUpdateUser={handleUpdateUser}
  />

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
</CurrentUserContext.Provider>
</div>     
  );
}

export default App;
