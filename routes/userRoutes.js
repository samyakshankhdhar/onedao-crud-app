const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/create-user', verifyToken, userController.createUser);
router.get('/get-users', verifyToken, userController.getUsers);
router.put('/update-user/:id', verifyToken, userController.updateUser);
router.delete('/delete-user/:id', verifyToken, userController.deleteUser);
router.post('/signin-user', verifyToken, userController.signIn);

module.exports = router;