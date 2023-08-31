
const router = require('express').Router();

const { getUsers, getUserById , craeteUser} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', craeteUser);




module.exports = router;