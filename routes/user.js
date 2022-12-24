const router = require('express').Router();
const {
  getUsers,
  getUserId,
  updateUser,
  updateAvatar,
  getUserInfo,
} = require('../controller/user');
const {
  getUserIdValidator,
  updateUserValidator,
  updateAvatarValidator,
} = require('../middlewares/validation');

router.get('/', getUsers);
router.get('/:userId', getUserId);
router.get('/me', getUserIdValidator, getUserInfo);
router.patch('/me', updateUserValidator, updateUser);
router.patch('/me/avatar', updateAvatarValidator, updateAvatar);

module.exports = router;
