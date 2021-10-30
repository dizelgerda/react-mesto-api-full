import PopupWithForm from './PopupWithForm';

export default function DeleteCardPopup(props) {
  function handlerSubmit(e) {
    e.preventDefault();

    props.onDeleteCard(props.isOpen);
  }

  return (
    <PopupWithForm
      {...props}
      onSubmit={handlerSubmit}
      popupName='popup-message'
      formName='message'
      title='Вы уверены?'
      buttonText='Да'
    />
  )
}
