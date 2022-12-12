const express = require('express');
const mongoose = require('mongoose');
const { NOT_FOUND } = require('./utils/constants');
const users = require('./routes/user');
const cards = require('./routes/card');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});
app.use((req, res, next) => {
  req.user = {
    _id: '6396010d515318094af6632c',
  };
  next();
});

app.use('/users', users);
app.use('/cards', cards);

app.all('*', (req, res) => {
  res.status(NOT_FOUND).send({ message: 'Cтраницa не существует' });
});

app.listen(PORT);
