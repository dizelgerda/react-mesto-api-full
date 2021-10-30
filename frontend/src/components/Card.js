import { CurrentUserContext } from '../contexts/CurrentUserContext';

import React from "react";

export default class Card extends React.Component {
  static contextType = CurrentUserContext;

  handleLikeClick() { this.props.onCardLike(this.props); }

  handleCardDelete() { this.props.onCardDelete(this.props); }

  render() {
    return (
      <li className="card">
        <img className="card__image" src={this.props.link} alt={this.props.name}
          onClick={() => this.props.onCardClick({
            name: this.props.name,
            link: this.props.link
          })}
        />
        {(this.props.owner._id === this.context._id || this.props.owner === this.context._id) ? <button className="card__button-delete" type="button" onClick={this.handleCardDelete.bind(this)}></button> : null}
        <h2 className="card__title">{this.props.name}</h2>
        <div className="card__like-container">
          <button
            className={`card__button-like ${this.props.likes.some(i => i._id === this.context._id) ? 'card__button-like_active' : ''}`}
            onClick={this.handleLikeClick.bind(this)}
            type="button"
          >
          </button>
          <p className="card__like-quantity">{this.props.likes.length}</p>
        </div>
      </li >
    );
  }
}
