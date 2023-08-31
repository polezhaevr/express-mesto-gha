const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      minLength: 2,
      maxLength: 30,
      default: 'Жак-Ив Кусто',
    },
    about: {
      type: String,
      minLength: 2,
      maxLength: 30,
      default: 'Исследователь',
    },
    avatar: {
      type: String,
      default:
        'https://images.uznayvse.ru/1600x1200/p/images/content/2023/6/16/in-the-photo-jacques-yves-cousteau_78.jpg',
    },
  },
  { versionKey: false });



module.exports = mongoose.model('user', userSchema);