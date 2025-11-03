const { Router } = require("express");
const UsersService2 = require('./user.service');
const isAdminMiddleware = require("../middlewares/isAdmin.middleware");
const isValidMongoIdMiddleware = require("../middlewares/isValidMongoId.middleware");

const userRouter2 = Router()

userRouter2.get('/', UsersService2.getAllUsers2)
userRouter2.post('/', isAdminMiddleware, UsersService2.createUser2)
userRouter2.get('/:id', isValidMongoIdMiddleware, UsersService2.getUserById2)
userRouter2.delete('/:id', isValidMongoIdMiddleware, UsersService2.deleteUserById2)
userRouter2.patch('/:id', isValidMongoIdMiddleware, UsersService2.updateUserById2)

module.exports = userRouter2