import { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

import avatarDefault from '../images/user-icon-default.svg';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import DeleteCardPopup from './DeleteCardPopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';

import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { api } from '../utils/Api';

export default function App() {
  const history = useHistory();
  const [isEditProfilePopupOpen, handleEditProfileClick] = useState(false);
  const [isAddPlacePopupOpen, handleAddPlaceClick] = useState(false);
  const [isEditAvatarPopupOpen, handleEditAvatarClick] = useState(false);
  const [selectedCard, handleCardClick] = useState(null);
  const [currentUser, setCurrentUser] = useState({
    name: 'Загрузка...',
    avatar: avatarDefault,
  });
  const [currentEmail, setCurrentEmail] = useState('');
  const [cards, setCards] = useState([]);
  const [deleteCandidate, setDeleteCandidate] = useState(null);
  const [statusLoading, setStatusLoading] = useState(false);
  const [massage, showMassage] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.checkToken(token)
        .then((res) => {
          if (res.ok) {
            setLoggedIn(true);
            api._token = token;
            localStorage.setItem('token', token);
            history.push('/');
            return res.json();
          } else {
            return Promise.reject(`Ошибка: ${res.status}`);
          }
        })
        .then(({ data }) => setCurrentEmail(data.email))
        .catch(err => console.log(err));
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      api.getUserInformation()
        .then(accountData => setCurrentUser(accountData))
        .catch(err => console.log(err));
      api.getInitialCards()
        .then(({ cards }) => setCards(cards.reverse()))
        .catch(err => console.log(err));
      history.push('/');
    }
    else {
      localStorage.removeItem('token');
      history.push('/sign-in');
    }
  }, [loggedIn])

  function authorization(data) {
    api.authorization(data)
      .then(({ token }) => {
        localStorage.setItem('token', token);
        api._token = token;
        setLoggedIn(true);
        setCurrentEmail(data.email);
      })
      .catch(err => console.log(err));
  }

  function registration(data) {
    api.registration(data)
      .then(res => {
        if (res.ok) {
          showMassage({
            success: true,
            massage: 'Вы успешно зарегистрировались!'
          });
          setCurrentEmail(data.email);
          history.push('/sign-in');
        }
        else {
          showMassage({
            success: false,
            massage: 'Что-то пошло не так! Попробуйте ещё раз.'
          });
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
      .catch(err => {
        console.log(err);
        showMassage({
          success: false,
          massage: 'Что-то пошло не так! Попробуйте ещё раз.'
        });
      });
  }

  const closeAllPopups = () => {
    handleEditProfileClick(false);
    handleAddPlaceClick(false);
    handleEditAvatarClick(false);
    handleCardClick(null);
    setDeleteCandidate(null);
    showMassage(null);
  };

  function handleUpdateUser(data) {
    setStatusLoading(true);
    api.setUserInformation(data)
      .then(accountData => {
        setCurrentUser(accountData);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setStatusLoading(false));
  }

  function handleUpdateAvatar(data) {
    setStatusLoading(true);
    api.setUserAvatar(data)
      .then(accountData => {
        setCurrentUser(accountData);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setStatusLoading(false));
  }

  function handleAddPlaceSubmit(data) {
    setStatusLoading(true);
    api.addCard(data)
      .then(card => {
        setCards([card, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setStatusLoading(false));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLike(card._id, !isLiked)
      .then((newCard) => setCards((state) => state.map(c => c._id === card._id ? newCard : c)))
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    setStatusLoading(true);
    api.deleteCard(card._id)
      .then(() => {
        setCards(cards.filter(item => item._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setStatusLoading(false));
  }

  return (
    <div className="root">
      <CurrentUserContext.Provider value={currentUser}>
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} statusLoading={statusLoading} />
        <DeleteCardPopup isOpen={deleteCandidate} onClose={closeAllPopups} onDeleteCard={handleCardDelete} statusLoading={statusLoading} />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} statusLoading={statusLoading} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} statusLoading={statusLoading} />
        <InfoTooltip status={massage} onClose={closeAllPopups} />

        <Header onClick={setLoggedIn} email={currentUser.email} />

        <Switch>
          <Route path="/sign-in">
            <Login onSubmit={authorization} />
          </Route>
          <Route path="/sign-up">
            <Register onSubmit={registration} />
          </Route>
          <ProtectedRoute
            path="/"
            loggedIn={loggedIn}
            Component={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={setDeleteCandidate}
            cards={cards}
          />
        </Switch>

        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}
