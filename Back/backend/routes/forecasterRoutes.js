const express = require('express');
const router = express.Router();
const forecasterController = require('../controllers/forecasterController');

router.get('/', forecasterController.getAll);
router.post('/', forecasterController.create);
router.put('/:id', forecasterController.update);
router.patch('/:id/toggle-status', forecasterController.toggleStatus);

module.exports = router;
