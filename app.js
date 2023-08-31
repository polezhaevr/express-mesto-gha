const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;
const app = express();


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


app.use((req, res, next) => {
  req.user = {
    _id: '64ee257f14a0210e54df1aff' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});


app.use('/', require('./routes/users'));
app.use('/', require('./routes/cards'));


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
})


