import React from 'react';
//component
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithImage from './PopupWithImage';
import EditProfilePopUp from './EditProfilePopUp';
import EditAvatarPopUp from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeletePopup from './DeletePopup';
//context
import {CurrentUserContext} from '../contexts/CurrentUserContext';
//util
import {api} from '../utils/api';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = React.useState(false);
  const [isDeletePopupOpen, setisDeletePopupOpen] = React.useState(false);
  const [isCardOpen, setisCardOpen] = React.useState(false);
  const [selectedCard, setselectedCard] = React.useState({link:'#'});
  const [currentUser, setcurrentUser] = React.useState({});
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

  function handleDeleteClick(card){
    setselectedCard(card);
    setisDeletePopupOpen(true);
  }

  function handleCardClick(card){
    setisCardOpen(true);
    setselectedCard(card);
  }
  
  function closeAllPopups(){
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setisEditAvatarPopupOpen(false);
    setisDeletePopupOpen(false);
    setisCardOpen(false);
    setselectedCard({link:'#'});
  }

  function handleUpdateUser(name, about){
    api.editProfile(name, about).then((data)=>{
      setcurrentUser(data);
      closeAllPopups();
    }).catch((err) => { 
      console.log(err);  
    });
  }

  function handleUpdateAvatar(link){
    api.editAvatar(link).then((data)=>{
      setcurrentUser(data);
      closeAllPopups();
    }).catch((err) => { 
      console.log(err);  
    });
  }

    //get user and initial cards
    React.useEffect(()=>{
      //get user
      api.getUser().then((data) => {  
        setcurrentUser(data)
        //get cards
        api.getCards().then((data) => {  
          setCards(data)
        }).catch((err) => { 
            console.log(err)})
      }).catch((err) => { 
          console.log(err)})   
    },[])

function handleCardLike(card) {
  // Check one more time if this card was already liked
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  
  // Send a request to the API and getting the updated card data
  api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
      // Create a new array based on the existing one and putting a new card into it
    const newCards = cards.map((c) => c._id === card._id ? newCard : c);
    // Update the state
    setCards(newCards);
  }).catch((err) => { 
    console.log(err)})
} 

function handleCardDelete(card){
  //delete the card
  api.deleteCard(card._id).then(() => { 
    const newCards = cards.filter((c)=>{
      return c._id !== card._id;
    }); 
    setCards(newCards);
    closeAllPopups();
  }).catch((err) => { 
      console.log(err);  
    });
}

function handleAddPlaceSubmit(name, link){
  api.addCard(name,link).then((newCard) => { 
    setCards([...cards, newCard]); 
    closeAllPopups();
  }).catch((err) => { 
      console.log(err);  
    });
}

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
    cards = {cards}
    onCardLike = {handleCardLike}
    onCardDelete = {handleDeleteClick}
  />
  <Footer />

  <EditProfilePopUp 
    isOpen={isEditProfilePopupOpen} 
    onClose={closeAllPopups}
    onUpdateUser={handleUpdateUser}
  />

  <AddPlacePopup 
    isOpen={isAddPlacePopupOpen} 
    onClose={closeAllPopups}
    onAddPlace={handleAddPlaceSubmit}
    />

  <EditAvatarPopUp 
    isOpen={isEditAvatarPopupOpen} 
    onClose={closeAllPopups}
    onUpdateAvatar={handleUpdateAvatar}
    />
  
  <PopupWithImage 
    card={selectedCard} 
    isOpen={isCardOpen}
    onClose={closeAllPopups}/>

<DeletePopup 
    isOpen={isDeletePopupOpen} 
    onClose={closeAllPopups}
    card = {selectedCard}
    onDelete = {handleCardDelete}
  />


</CurrentUserContext.Provider>
</div>     
  );
}

export default App;
