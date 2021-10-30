import { useState, useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function EditProfilePopup(props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const currentUser = useContext(CurrentUserContext);

  function handleChange(e, set) { set(e.target.value); }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    if (name !== currentUser.name || description !== currentUser.about) {
      props.onUpdateUser({
        name,
        about: description,
      });
    }
    else props.onClose();
  }

  return (
    <PopupWithForm
      popupName='popup-edit-profile'
      formName='editProfile'
      title='Редактировать профиль'
      buttonText='Сохранить'
      {...props}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="name"
        className="form__field form__field_type_name"
        placeholder="Имя"
        required
        minLength="2"
        maxLength="20"
        value={name || ''}
        onChange={e => handleChange(e, setName)}
      />
      <span className="form__alert" id="name-error"> </span>
      <input
        type="text"
        name="about"
        className="form__field form__field_type_about"
        placeholder="О себе"
        required
        minLength="2"
        maxLength="200"
        value={description || ''}
        onChange={e => handleChange(e, setDescription)}
      />
      <span className="form__alert" id="about-error"> </span>
    </PopupWithForm>
  );
}
