const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const verifyToken = require('../midlewares/midlewares');

router.get('/dashboard/performance/:userId', dashboardController.getPerformanceData);
router.get('/dashboard/:userId', verifyToken, dashboardController.getUserStats);



module.exports = router;