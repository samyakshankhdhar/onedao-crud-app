const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.post('/create-user', userController.createUser);
router.get('/get-users', userController.getUsers);
router.put('/update-user:id', userController.updateUser);
router.delete('/delete-user:id', userController.deleteUser);

module.exports = router;