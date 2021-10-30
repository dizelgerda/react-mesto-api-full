require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { JWT_SECRET = 'dev-secret-key' } = process.env;

function login(req, res, next) {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        const err = new Error('Неверный логин или пароль');
        err.statusCode = 401;
        throw err;
      }
      bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            const err = new Error('Неверный логин или пароль');
            err.statusCode = 401;
            throw err;
          }
          const { _id } = user;
          const token = jwt.sign(
            { _id },
            JWT_SECRET,
            { expiresIn: '7d' },
          );
          res.status(200).send({ _id, token });
        })
        .catch(next);
    })
    .catch(next);
}

function getUsers(req, res, next) {
  User.find({})
    .then((users) => res.send({ ...users }))
    .catch(next);
}

function getUserById(req, res, next) {
  const { id } = req.params;

  User.findById(id)
    .then((user) => {
      if (user) res.status(200).send(user);
      else {
        const err = new Error('Пользователь ненайден');
        err.statusCode = 404;
        throw err;
      }
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        const err = new Error('ID пользователя невалиден');
        err.statusCode = 400;
        next(err);
      } else next(e);
    });
}

function getUser(req, res, next) {
  const id = req.user;

  User.findById(id)
    .then((user) => {
      if (user) res.status(200).send(user);
      else {
        const err = new Error('Пользователь ненайден');
        err.statusCode = 404;
        throw err;
      }
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        const err = new Error('ID пользователя невалиден');
        err.statusCode = 400;
        next(err);
      } else next(e);
    });
}

function createUser(req, res, next) {
  const {
    email,
    password,
    name = undefined,
    about = undefined,
    avatar = undefined,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        email,
        password: hash,
        name,
        about,
        avatar,
      })
        .then(({ _id }) => res.send({ _id }))
        .catch((e) => {
          if (e.name === 'ValidationError') {
            const err = new Error('Данные невалидны');
            err.statusCode = 400;
            next(err);
          } else if (e.name === 'MongoServerError' && e.code === 11000) {
            const err = new Error('Пользователь с таким email уже существует');
            err.statusCode = 409;
            next(err);
          } else next(e);
        });
    });
}

function updateInfo(req, res, next) {
  const { name, about } = req.body;
  const id = req.user;

  User.findByIdAndUpdate(id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (user) res.status(200).send(user);
      else {
        const err = new Error('Пользователь ненайден');
        err.statusCode = 404;
        throw err;
      }
    })
    .catch((e) => {
      if (e.name === 'ValidationError' || e.name === 'CastError') {
        const err = new Error('Данные невалидны');
        err.statusCode = 400;
        next(err);
      } else next(e);
    });
}

function updateAvatar(req, res, next) {
  const { avatar } = req.body;
  const id = req.user;

  User.findByIdAndUpdate(id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (user) res.status(200).send(user);
      else {
        const err = new Error('Пользователь ненайден');
        err.statusCode = 404;
        throw err;
      }
    })
    .catch((e) => {
      if (e.name === 'CastError' || e.name === 'ValidationError') {
        const err = new Error('Данные невалидны');
        err.statusCode = 400;
        next(err);
      } else next(e);
    });
}

module.exports = {
  getUsers,
  getUser,
  getUserById,
  createUser,
  updateInfo,
  updateAvatar,
  login,
};
