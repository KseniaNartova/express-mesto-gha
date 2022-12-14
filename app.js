const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { handlerError } = require('./middlewares/handlerError');
const routes = require('./routes/index');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});
app.use(express.json());
app.use(routes);
app.use(errors());
app.use(handlerError);

app.listen(PORT);
