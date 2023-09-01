const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
        res.status(200).send({ data: users });
    })
    .catch(() => {
      res.status(500).send({ message: 'На сервере произошла ошибка' });
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
      } else if (req.params.id.length !== 24) {
        res.status(400).send({ message: 'Неверный _id' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
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
    .catch(() => {
      if (name.length < 2) {
        console.log("я тут")
        res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя в поле имя больше 30 или меньше 3 символов' });
        return;
      } else if (name.length > 30) {
        console.log(" и я тут")
        res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя в поле имя больше 30 или меньше 3 символов' });
      }else if(about.length < 2) {
        res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя в поле имя больше 30 или меньше 3 символов' });
      }else if (about.length > 30) {
        res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя в поле имя больше 30 или меньше 3 символов' });
      }else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    })
}

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about })
    .orFail(new Error('NotValidId'))
    .then((user) => {
      if (!name) {
        res.status(400).send({ message: 'Переданы некорректные данные при обновлении профиля.' });
        return;
      } else if (!about) {
        res.status(400).send({ message: 'Переданы некорректные данные при создании профиля' });
        return;
      } else {
        res.status(200).send({
          _id: user._id,
          avatar: user.avatar,
          name,
          about,
        })
      }
    })
    .catch((err) => {
      if (err.message === 'NotValidId') {
        res.status(404).send({ message: 'Пользователь с указанным _id не найден.' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    })
}


module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar })
    .orFail(new Error('NotValidId'))
    .then((user) => {
      if (!avatar) {
        res.status(400).send({ message: 'Переданы некорректные данные при обновлении профиля.' });
        return;
      } else {
        res.status(200).send({
          _id: user._id,
          avatar,
          name: user.name,
          about: user.about,
        })
      }
    })
    .catch((err) => {
      if (err.message === 'NotValidId') {
        res.status(404).send({ message: 'Пользователь с указанным _id не найден.' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    })
}





