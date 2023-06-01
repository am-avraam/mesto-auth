/* eslint-disable no-undef */
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from './EditProfilePopup'
import ImagePopup from "./ImagePopup";
import {useState, useEffect} from "react";
import api from "../utils/api/Api";
import {UserContext} from "../contexts/CurrentUserContext";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

function App() {

    const [cards, setCards] = useState([])
    const [currentUser, setCurrentUser] = useState(null)
    const [selectedCard, setSelectedCard] = useState(null)
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false)
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false)
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false)

    useEffect(() => {
        api.getInitialCards()
            .then((initialCards) => {
            setCards(initialCards)
        })
            .catch((err) => console.log(`Ошибка.....: ${err}`))
    }, [])

    useEffect(() => {
        api.getUser()
            .then(user => {setCurrentUser(user)})
            .catch((err) => console.log(`Ошибка.....: ${err}`))
    }, [])

    function handleCardClick(cardId) {
        setSelectedCard((cardId))
    }
    function handleEditAvatarClick() {
        // formValidators[updateAvatarForm.getAttribute('name')].resetValidation()
        setEditAvatarPopupOpen(true)
    }
    function handleEditProfileClick() {
        setEditProfilePopupOpen(true)
    }
    function handleAddPlaceClick() {
        // formValidators[addCardForm.getAttribute('name')].resetValidation()
        setAddPlacePopupOpen(true)
    }

    function handleUpdateUser(updatedInfo) {
        api.patchUser(updatedInfo)
            .then(newUserInfo => {
                setCurrentUser(newUserInfo)
                closeAllPopups()
            })
            .catch((err) => console.log(`Ошибка.....: ${err}`))
    }

    function handleUpdateAvatar(src) {
        api.changeAvatar(src)
            .then(({avatar}) => {
                setCurrentUser({...currentUser, avatar: avatar})
                closeAllPopups()
            })
            .catch((err) => console.log(`Ошибка.....: ${err}`))
    }

    function closeAllPopups() {
        setSelectedCard(null)
        setEditProfilePopupOpen(false)
        setAddPlacePopupOpen(false)
        setEditAvatarPopupOpen(false)
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
            .catch((err) => console.log(`Ошибка.....: ${err}`))
    }
    function handleCardDelete(card) {
        return api.deleteCard(card._id)
            .then((newCard) => {
            setCards((state) => state.filter((c) => c._id !== card._id));
        })
            .catch((err) => console.log(`Ошибка.....: ${err}`))
    }

    function handleAddPlaceSubmit(card) {
        api.postCard(card)
            .then(newCard => {
                setCards([newCard, ...cards])
                closeAllPopups()
            })
            .catch((err) => console.log(`Ошибка.....: ${err}`))
    }


    return (
      <UserContext.Provider value={currentUser}>
      <div className="page">
        <Header/>
        <Main cards={cards} onCardDelete={handleCardDelete} onCardLike={handleCardLike} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick}/>
        <Footer/>
      </div>
          <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
          <AddPlacePopup onAddCard={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />
          <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
          <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
      </UserContext.Provider>
  );
}

export default App;
