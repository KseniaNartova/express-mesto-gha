// const Card = require('../models/card');
// const {
//   BAD_REQUEST, NOT_FOUND, SERVER_ERROR, CREATED,
// } = require('../utils/constants');

// module.exports.getCard = (req, res) => {
//   Card.find({})
//     .populate(['owner', 'likes'])
//     .then((cards) => res.send(cards))
//     .catch(() => {
//       res.status(SERVER_ERROR).send({ message: 'Сервер столкнулся с неожиданной ошибкой, которая помешала ему выполнить запрос' });
//     });
// };

// // module.exports.createCard = (req, res) => {
// //   const { name, link } = req.body;
// //   const owner = req.user._id;
// //   return Card.create({ name, link, owner })
// //     .then((card) => res.send(card))
// //     .catch((err) => {
// //       if (err.name === 'ValidationError') {
// //         res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
// //       } else {
// //         res.status(SERVER_ERROR).send({
// //  message: 'Сервер столкнулся с неожиданной ошибкой, которая помешала ему выполнить запрос' });
// //       }
// //     });
// // };

// module.exports.createCard = (req, res) => {
//   const { name, link } = req.body;
//   const owner = req.user._id;

//   Card.create({ name, link, owner })
//     .then((card) => res.status(CREATED).send(card))
//     .catch((err) => {
//       if (err.name === 'ValidationError') {
//         res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные
' });
//         return;
//       }
//       res.status(SERVER_ERROR).send({ message: 'Сервер столкнулся с неожиданной ошибкой, которая помешала ему выполнить запрос' });
//     });
// };

// module.exports.deleteCard = (req, res) => {
//   // const { cardId } = req.params.cardId;
//   Card.findByIdAndRemove(req.params.cardId)
//     .then((card) => {
//       if (!card) {
//         res.status(NOT_FOUND).send({ message: 'Карточка не найдена' });
//         return;
//       }
//       res.send({ data: card });
//     })
//     .catch((err) => {
//       if (err.name === 'CastError') {
//         res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
//       } else {
//         res.status(SERVER_ERROR).send({ message: 'Сервер столкнулся с неожиданной ошибкой, которая помешала ему выполнить запрос' });
//       }
//     });
// };

// module.exports.likeCard = (req, res) => {
//   Card.findByIdAndUpdate(
//     req.params.cardId,
//     { $addToSet: { likes: req.user._id } },
//     { new: true },
//   )
//     .populate(['owner', 'likes'])
//     .then((card) => {
//       if (!card) {
//         res.status(NOT_FOUND).send({ message: 'Карточка не найдена' });
//         return;
//       }
//       res.send({ data: card });
//     })
//     .catch((err) => {
//       if (err.name === 'CastError') {
//         res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
//       } else {
//         res.status(SERVER_ERROR).send({ message: 'Сервер столкнулся с неожиданной ошибкой, которая помешала ему выполнить запрос' });
//       }
//     });
// };

// module.exports.dislikeCard = (req, res) => {
//   Card.findByIdAndUpdate(
//     req.params.cardId,
//     { $pull: { likes: req.user._id } },
//     { new: true },
//   )
//     .populate(['owner', 'likes'])
//     .then((card) => {
//       if (!card) {
//         res.status(NOT_FOUND).send({ message: 'Карточка не найдена' });
//         return;
//       }
//       res.send({ data: card });
//     })
//     .catch((err) => {
//       if (err.name === 'CastError') {
//         res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
//       } else {
//         res.status(SERVER_ERROR).send({ message: 'Сервер столкнулся с неожиданной ошибкой, которая помешала ему выполнить запрос' });
//       }
//     });
// };

const Card = require('../models/card');
const {
  BAD_REQUEST,
  NOT_FOUND,
  SERVER_ERROR,
  CREATED,
} = require('../utils/constants');

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send({ data: cards }))
    .catch(() => {
      res.status(SERVER_ERROR).send({ message: 'Сервер столкнулся с неожиданной ошибкой, которая помешала ему выполнить запрос' });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(CREATED).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
        return;
      }
      res.status(SERVER_ERROR).send({ message: 'Сервер столкнулся с неожиданной ошибкой, которая помешала ему выполнить запрос' });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND).send({ message: 'Карточка не найдена' });
        return;
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
        return;
      }
      res.status(SERVER_ERROR).send({ message: 'Сервер столкнулся с неожиданной ошибкой, которая помешала ему выполнить запрос' });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND).send({ message: 'Карточка не найдена' });
        return;
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
        return;
      }
      res.status(SERVER_ERROR).send({ message: 'Сервер столкнулся с неожиданной ошибкой, которая помешала ему выполнить запрос' });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND).send({ message: 'Карточка не найдена' });
        return;
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
        return;
      }
      res.status(SERVER_ERROR).send({ message: 'Сервер столкнулся с неожиданной ошибкой, которая помешала ему выполнить запрос' });
    });
};
