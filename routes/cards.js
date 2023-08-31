const router = require('express').Router();

const { getCards, craeteCard , getDeleteCardById ,likeCard ,dislikeCard } = require('../controllers/cards');

router.get('/cards', getCards);
router.post('/cards', craeteCard);
router.delete('/cards/:cardId', getDeleteCardById);
router.put('/cards/:cardId/likes' , likeCard);
router.delete('/cards/:cardId/likes' ,dislikeCard);

module.exports = router;

