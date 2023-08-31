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
    _id: '64f0bb1105ac7268d2ca7de6' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});


app.use('/', require('./routes/users'));
app.use('/', require('./routes/cards'));


const data = {
  "name": "s",
  "about": "Турист крутой",
  "avatar": "https://sun9-16.userapi.com/impf/c856120/v856120906/b41a2/gxB4g0YbI98.jpg?size=320x213&quality=96&sign=510ebe7807acaaa5f5857d873395bab6&c_uniq_tag=5Nv3vayipWO784KLoGsnTt3Zdmn3nYcj_CyDCCuArxA&type=album",
  "_id": "64f0ca270b7e1c1c72498b46"
}


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log(data.name.length);
})


