import React from "react";

export default class ImagePopup extends React.Component {

  handelClose = (e) => { if (e.target.classList.contains('popup_opened') || e.target.classList.contains('popup__close-button')) this.props.onClose(); }

  render() {
    return (
      <div className={`popup popup_dark-background ${this.props.card ? 'popup_opened' : ''}`} id="popup-view" onClick={this.handelClose}>
        <div className="popup__container">
          {this.props.card ? (
            <>
              <button className="popup__close-button" type="button"></button>
              <figure className="popup__image-container">
                <img src={this.props.card.link} alt={this.props.card.name} className="popup__image" />
                <p className="popup__image-signature">{this.props.card && this.props.card.name}</p>
              </figure>
            </>
          ) : null}
        </div>
      </div >
    );
  }
}
