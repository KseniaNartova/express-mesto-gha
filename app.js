const express = require('express');
const mongoose = require('mongoose');
const { NOT_FOUND } = require('./utils/constants');
const users = require('./routes/user');
const cards = require('./routes/card');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});
app.use(express.json());
app.use('/users', users);
app.use('/cards', cards);

app.use((req, res, next) => {
  req.user = {
    _id: '63955b2a82453e1f4f36760f' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };
  next();
});

app.all('*', (req, res) => {
  res.status(NOT_FOUND).send({ message: 'Cтраницa не существует' });
});

app.listen(PORT);
