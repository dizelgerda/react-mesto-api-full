const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => {
        const reg = /\w+@\w+\.\w+/i;
        return reg.test(email);
      },
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (url) => {
        const reg = /https*:\/\/[w{3}.]*[0-9a-zа-яё\-._~:/?#[\]@!$&'()*+,;=]#*/i;
        return reg.test(url);
      },
    },
  },
}, { versionKey: false });

module.exports = mongoose.model('user', userSchema);
