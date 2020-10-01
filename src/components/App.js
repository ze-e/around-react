import React from 'react';
//component
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import PopupWithImage from './PopupWithImage';
import EditProfilePopUp from './EditProfilePopUp';
import EditAvatarPopUp from './EditAvatarPopup';

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

  //
  const [cards, setCards] = React.useState([]);



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

  function handleUpdateAvatar({link}){
    api.editAvatar(link).then((data)=>{
      setcurrentUser(data);
    }).catch((err) => { 
      console.log(err);  
    });
    closeAllPopups();
  }

//load user and cards
  React.useEffect(()=>{
    //get user
    api.getUser().then((data)=>{
      setcurrentUser(data);

      //get cards
      api.getCards().then((data) => {  
        setCards(data)
      }).catch((err) => { 
          console.log(err);  
        });
  }).catch((err) => { 
    console.log(err);  
  });
})

//
function handleCardLike(card) {
  // Check one more time if this card was already liked
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  
  // Send a request to the API and getting the updated card data
  api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
      // Create a new array based on the existing one and putting a new card into it
    const newCards = cards.map((c) => c._id === card._id ? newCard : c);
    // Update the state
    setCards(newCards);
  });
} 

function handleCardDelete(card){
  //delete the card
  api.deleteCard(card).then((data) => { 
    const newCards = cards.filter((c)=>{
      return c._id !== data._id;
    }); 
    setCards(newCards);
  }).catch((err) => { 
      console.log(err);  
    });
}

React.useEffect(()=>{
    //load the cards
    api.getCards().then((data) => {  
      setCards(data)
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

    //
    cards = {cards}
    onCardLike = {handleCardLike}
    onCardDelete = {handleCardDelete}
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

  <EditAvatarPopUp 
    isOpen={isEditAvatarPopupOpen} 
    onClose={closeAllPopups}
    onUpdateAvatar={handleUpdateAvatar}
    />
  
  <PopupWithImage 
    card={selectedCard} 
    onClose={closeAllPopups}/>
</CurrentUserContext.Provider>
</div>     
  );
}

export default App;
