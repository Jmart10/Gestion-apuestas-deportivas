const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController.js');
const verifyToken = require('../midlewares/midlewares.js');

router.post('/users', userController.createUser);
router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', verifyToken, userController.updateUser);
router.delete('/users/:id', userController.deleteUser);
router.post('/login', userController.loginUser);


module.exports = router;

