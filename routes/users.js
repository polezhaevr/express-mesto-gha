
const router = require('express').Router();

const { getUsers, getUserById , craeteUser , updateProfile ,updateAvatar} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', craeteUser);
router.patch('/users/me', updateProfile);
router.patch('/users/me/avatar', updateAvatar);

module.exports = router;