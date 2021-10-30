import React from 'react';

export default class PopupWithForm extends React.Component {

  handelClose = (e) => { if (e.target.classList.contains('popup_opened') || e.target.classList.contains('popup__close-button')) this.props.onClose(); }

  render() {
    return (
      <div className={`popup ${this.props.isOpen ? 'popup_opened' : ''}`} id={this.props.popupName} onClick={this.handelClose}>
        <div className="popup__container">
          <button className="popup__close-button" type="button"></button>
          <form
            className="form popup__form"
            name={this.props.formName}
            onSubmit={this.props.onSubmit}
            autoComplete='off'
            noValidate
          >
            <h2 className="form__title">{this.props.title}</h2>
            {this.props.children}
            <button
              className='form__button'
              type='submit'
            >
              {!this.props.statusLoading ? this.props.buttonText : 'Сохранение...'}
            </button>
          </form>
        </div>
      </div>
    );
  }
}
