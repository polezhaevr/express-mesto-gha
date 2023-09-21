const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Error } = require('mongoose');
const User = require('../models/user');
const BadRequest = require('../errors/BadRequest');
const NotFound = require('../errors/NotFound');
const Conflict = require('../errors/Conflict');
const { SECRET_KEY } = require('../utils/constants');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(new NotFound('Пользователь по указанному `_id` не найден.'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err instanceof Error.CastError) {
        next(new BadRequest('Переданы некорректные данные при поиске пользователя.'));
        return;
      }
      next(err);
    });
};

module.exports.craeteUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  const createUser = (hash) => User.create({
    name,
    about,
    avatar,
    email,
    password: hash,
  });

  bcrypt
    .hash(password, 10)
    .then((hash) => createUser(hash))
    .then((user) => {
      res.status(201).send({
        email: user.email,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        _id: user._id,
      });
    })
    .catch((err) => {
      if (err instanceof Error.ValidationError) {
        next(new BadRequest('Переданы некорректные данные при создании пользователя.'));
        return;
      }
      if (err.code === 11000) {
        next(new Conflict('Пользователь с таким email уже зарегистрирован.'));
        return;
      }
      next(err);
    });
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(new NotFound('Пользователь по указанному `_id` не найден.'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err instanceof Error.ValidationError) {
        next(new BadRequest('Переданы некорректные данные при обновлении профиля.'));
        return;
      }
      next(err);
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(new Error('NotValidId'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err instanceof Error.ValidationError) {
        next(new BadRequest('Переданы некорректные данные при обновлении автара.'));
        return;
      }
      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, SECRET_KEY, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFound('Пользователь по указанному `_id` не найден.'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err instanceof Error.CastError) {
        next(new BadRequest('Переданы некорректные данные при поиске пользователя.'));
        return;
      }
      next(err);
    });
};
