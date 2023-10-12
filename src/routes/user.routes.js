var express = require('express');
var userRouter = express.Router();
const userController = require('../controllers/user.controller.js')

userRouter.get('/api/users', userController.getAllUsers);
userRouter.post('/api/users/login', userController.userLogin);
userRouter.post('/api/users/register', userController.userRegister);

module.exports = userRouter;