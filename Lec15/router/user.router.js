

const { Router } = require('express')
const UserController = require('../controllers/user.controller')


const userRouter = Router()

// http://localhost:3000/users/top-5
userRouter.get('/', UserController.getAllUsers)

userRouter.post('/', UserController.createUser)

userRouter.get('/:id', UserController.getUserById)

userRouter.delete('/:id', UserController.deteleUserById)

userRouter.patch('/:id', UserController.updateUserById)


module.exports = userRouter