const router = require('express').Router();

const {
  getUsers, getUserById, updateProfile, updateAvatar, getCurrentUser,
} = require('../controllers/users');
const { validateGetUserById, validatepdateUpdateProfile, validateUpdateAvatar } = require('../middlewares/validation');

router.get('/users', getUsers);
router.get('/users/me', getCurrentUser);
router.get('/users/:id', validateGetUserById, getUserById);
router.patch('/users/me', validatepdateUpdateProfile, updateProfile);
router.patch('/users/me/avatar', validateUpdateAvatar, updateAvatar);

module.exports = router;
