const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { handlerError } = require('./middlewares/handlerError');
const routes = require('./routes/index');

// const { NOT_FOUND } = require('./utils/constants');
// const users = require('./routes/user');
// const cards = require('./routes/card');
// const { createUser, login } = require('./controller/user');
// require('dotenv').config();
// const express = require('express');
// const helmet = require('helmet');
// const rateLimit = require('express-rate-limit');
// const mongoose = require('mongoose');
// const cookieParser = require('cookie-parser');
// const { errors } = require('celebrate');
// const { errorHandler } = require('./middlewares/errorHandler');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});
app.use(routes);
app.use(errors());
app.use(handlerError);

app.listen(PORT);

// app.use((req, res, next) => {
//   req.user = {
//     _id: '6396010d515318094af6632c',
//   };
//   next();
// });

// app.use('/users', users);
// app.use('/cards', cards);
// app.post('/signin', login);
// app.post('/signup', createUser);

// app.all('*', (req, res) => {
//   res.status(NOT_FOUND).send({ message: 'Cтраницa не существует' });
// });
