const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).send({data: users});
    })
    .catch(() => {
      res.status(500).send({ message: 'Произошла ошибка' });
    })
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.id)
    .orFail(new Error('NotValidId'))
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.message === 'NotValidId') {
        res.status(404).send({ message: 'Пользователь с указанным _id не найден.' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    })
};

module.exports.craeteUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      if (!name) {
        res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя' });
        return;
      } else if (!about) {
        res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя' });
        return;
      } else if (!avatar) {
        res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя' });
        return;
      } else {
        res.status(200).send({ data: user })
      }
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}


