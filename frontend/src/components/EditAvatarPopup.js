import { useContext, useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function EditAvatarPopup(props) {
  const currentUser = useContext(CurrentUserContext);
  const [avatar, setAvatar] = useState('');

  useEffect(() => setAvatar(currentUser.avatar), [currentUser, props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    if (currentUser.avatar !== avatar) props.onUpdateAvatar({
      avatar: avatar.trim()
    });
    else props.onClose();
  }


  return (
    <PopupWithForm
      {...props}
      onSubmit={handleSubmit}
      popupName='popup-update-avatar'
      formName='updateAvatar'
      title='Обновить аватар'
      buttonText='Сохранить'
    >
      <input
        type="url"
        name="avatar"
        className="form__field form__field_type_link"
        placeholder="Ссылка на аватар"
        value={avatar || ''}
        onChange={({ target }) => setAvatar(target.value)}
      />
      <span className="form__alert" id="avatar-error"></span>
    </PopupWithForm>
  )
}
