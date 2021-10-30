const Card = require('../models/card');

function getCards(req, res, next) {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.status(200).send({ cards }))
    .catch(next);
}

function createCard(req, res, next) {
  const { name, link } = req.body;
  const owner = req.user;

  Card.create({ name, link, owner })
    .then((card) => res.status(200).send(card))
    .catch((e) => {
      if (e.name === 'ValidationError') {
        const err = new Error('Данные невалидны');
        err.statusCode = 400;
        next(err);
      } else next(e);
    });
}

function deleteCard(req, res, next) {
  const { id } = req.params;

  Card.findById(id)
    .then((card) => {
      if (!card) {
        const err = new Error('Карточка ненайдена');
        err.statusCode = 404;
        throw err;
      }

      if (card.owner.toString() === req.user) {
        Card.findByIdAndDelete(id)
          .then(() => res.status(200).send({ message: 'Карточка удалена' }))
          .catch(next);
      } else {
        const err = new Error('Нет прав для удаления');
        err.statusCode = 403;
        throw err;
      }
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        const err = new Error('ID карточки невалиден');
        err.statusCode = 400;
        next(err);
      } else next(e);
    });
}

function setLike(req, res, next) {
  const { id } = req.params;
  const userId = req.user;

  Card.findByIdAndUpdate(id, { $addToSet: { likes: userId } }, { new: true })
    .populate(['owner', 'likes'])
    .then((card) => {
      if (card) res.status(200).send(card);
      else {
        const err = new Error('Карточка ненайдена');
        err.statusCode = 404;
        throw err;
      }
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        const err = new Error('ID карточки невалиден');
        err.statusCode = 400;
        next(err);
      } else next(e);
    });
}

function removeLike(req, res, next) {
  const { id } = req.params;
  const userId = req.user;

  Card.findByIdAndUpdate(id, { $pull: { likes: userId } }, { new: true })
    .populate(['owner', 'likes'])
    .then((card) => {
      if (card) res.status(200).send(card);
      else {
        const err = new Error('Карточка ненайдена');
        err.statusCode = 404;
        throw err;
      }
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        const err = new Error('ID карточки невалиден');
        err.statusCode = 400;
        next(err);
      } else next(e);
    });
}

module.exports = {
  createCard,
  getCards,
  deleteCard,
  setLike,
  removeLike,
};
