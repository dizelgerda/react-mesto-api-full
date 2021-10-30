const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  createCard,
  getCards,
  deleteCard,
  setLike,
  removeLike,
} = require('../controllers/cards');

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(/https*:\/\/[w{3}.]*[0-9a-zа-яё\-._~:/?#[\]@!$&'()*+,;=]#*/i),
  }),
}), createCard);
router.get('/', getCards);
router.delete('/:id', celebrate({
  params: Joi.object().keys({ id: Joi.string().required().min(24).max(24).hex() }),
}), deleteCard);
router.put('/:id/likes', celebrate({
  params: Joi.object().keys({ id: Joi.string().required().min(24).max(24).hex() }),
}), setLike);
router.delete('/:id/likes', celebrate({
  params: Joi.object().keys({ id: Joi.string().required().min(24).max(24).hex() }),
}), removeLike);

module.exports = router;
