const express = require('express');
const router = express.Router();
const betController = require('../controllers/betController');

router.get('/', betController.getAllBets);

router.post('/', betController.createBet);
router.put('/:id', betController.updateBet);
router.delete('/:id', betController.deleteBet);

module.exports = router;
