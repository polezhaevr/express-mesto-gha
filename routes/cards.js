const router = require('express').Router();
const {
  getCards, craeteCard, getDeleteCardById, likeCard, dislikeCard,
} = require('../controllers/cards');
const { validateCreateCard, validateUpdateCard } = require('../middlewares/validation');

router.get('/cards', getCards);
router.post('/cards', validateCreateCard, craeteCard);
router.delete('/cards/:cardId', validateUpdateCard, getDeleteCardById);
router.put('/cards/:cardId/likes', validateUpdateCard, likeCard);
router.delete('/cards/:cardId/likes', validateUpdateCard, dislikeCard);

module.exports = router;
