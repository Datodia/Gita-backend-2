const { Router } = require("express");
const UsersService2 = require('./user.service');
const isAdminMiddleware = require("../middlewares/isAdmin.middleware");

const userRouter2 = Router()

userRouter2.get('/', UsersService2.getAllUsers2)
userRouter2.post('/', isAdminMiddleware, UsersService2.createUser2)
userRouter2.get('/:id', UsersService2.getUserById2)


module.exports = userRouter2