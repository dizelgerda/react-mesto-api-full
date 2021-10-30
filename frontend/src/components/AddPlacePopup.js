import { useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';

export default function AddPlacePopup(props) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    setName('');
    setLink('');
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name,
      link,
    });
  }

  function handleChange(e, set) { set(e.target.value); }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      {...props}
      popupName='popup-add-card'
      formName='addCard'
      title='Новое место'
      buttonText='Создать'
    >
      <input
        type="text"
        name="place"
        className="form__field form__field_type_name"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        onChange={(e) => handleChange(e, setName)}
        value={name || ''}
      />
      <span className="form__alert" id="place-error"> </span>
      <input
        type="url"
        name="link"
        className="form__field form__field_type_link"
        placeholder="Ссылка на картинку"
        required
        onChange={(e) => handleChange(e, setLink)}
        value={link || ''}
      />
      <span className="form__alert" id="link-error"> </span>
    </PopupWithForm>
  );
}
