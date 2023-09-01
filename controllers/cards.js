const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  console.log(req.user._id);
  Card.find({})
    .then((cards) => {
      res.status(200).send({ data: cards });
    })
    .catch(() => {
      res.status(500).send({ message: 'Произошла ошибка' });
    })
}

module.exports.craeteCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link })
    .then((card) => {
      if (!name) {
        res.status(400).send({ message: 'Переданы некорректные данные при создании карточки.' });
        return;
      } else if (!link) {
        res.status(400).send({ message: 'Переданы некорректные данные при создании карточки.' });
        return;
      } else {
        res.status(200).send({ data: card })
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
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    })
};

module.exports.getDeleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(new Error('NotValidId'))
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.message === 'NotValidId') {
        res.status(404).send({ message: 'Пользователь с указанным _id не найден.' });
      } else if (req.params.cardId.length !== 24) {
        res.status(400).send({ message: 'Пользователь с указанным _id не найден' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    })
};


module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },)
    .orFail(new Error('NotValidId'))
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.message === 'NotValidId') {
        res.status(404).send({ message: 'Пользователь с указанным _id не найден.' });
      } else if (req.params.cardId.length !== 24) {
        res.status(400).send({ message: 'Неверный _id' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    })
};


module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },)
    .orFail(new Error('NotValidId'))
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.message === 'NotValidId') {
        res.status(404).send({ message: 'Пользователь с указанным _id не найден.' });
        console.log(req.user._id);
      } else if (req.params.cardId.length !== 24) {
        res.status(400).send({ message: 'Неверный _id' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    })
};







