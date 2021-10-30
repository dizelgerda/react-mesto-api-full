import Card from './Card.js';

import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useContext } from 'react';

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
      <section className="account">
        <button type="button" className="account__photo-button" onClick={() => onEditAvatar(true)}>
          <img src={currentUser.avatar} alt="Фото профиля" className="account__photo-profile" />
        </button>
        <div className="account__profile">
          <div className="account__name-container">
            <h1 className="account__name">{currentUser.name}</h1>
            <button className="account__edit-button" type="button" onClick={() => onEditProfile(true)}></button>
          </div>
          <p className="account__about">{currentUser.about}</p>
        </div>
        <button className="account__add-button" type="button" onClick={() => onAddPlace(true)}></button>
      </section>

      <section className="gallery">
        <ul className="gallery__cards">
          {
            cards.map(card => (
              <Card key={card._id} {...card}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            ))
          }
        </ul>
      </section>
    </main>
  );
}

export default Main;
