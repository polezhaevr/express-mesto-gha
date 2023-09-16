const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { craeteUser, login } = require('./controllers/users');
const { PORT = 3000 } = process.env;
const app = express();
const auth = require('./middlewares/auth');
const { validateLogin, validateCreateUser } = require('./middlewares/validation');
const { errors } = require('celebrate');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// подключаемся к серверу mongo
mongoose
  .set('strictQuery', false)
  .connect('mongodb://127.0.0.1:27017/mestodb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,

  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log(error))


app.use(express.json());
app.post('/signup', validateCreateUser, craeteUser);
app.post('/signin', validateLogin, login);

app.use(auth);

app.use('/', require('./routes/users'));
app.use('/', require('./routes/cards'));

app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message = 'На сервере произошла ошибка.' } = err;
  res.status(statusCode).send({ message });
  next();
});
app.use('*', (req, res, next) => next(new NotFound('Такая страница не существует.')));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
})


