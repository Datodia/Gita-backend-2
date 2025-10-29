
const UsersService = require('../services/user.service')

exports.getAllUsers = async (req, res) => {
    // validation income request
    const query = req.qeuery
    const users = await UsersService.getAllUsers(query)
    res.json(users)
}

exports.createUser = async (req, res) => {
    if (!req.body) {
        res.status(400).json({ error: true, message: "body is required" })
        return
    }

    const { name, age, hobbies } = req.body
    if (!name || !age) {
        res.status(400).json({ error: true, message: "name and age is required" })
        return
    }

    await UsersService.createUser({ name, age, hobbies })
    res.status(201).json({ success: true, message: "user created successfully" })
}


exports.getUserById = async (req, res) => {
    const id = Number(req.params.id)
    const user = await UsersService.getUserById({ id })

    if (!user) {
        res.status(404).json({ error: true, message: "user not found" })
        return
    }

    res.json(user)
}

exports.deteleUserById = async (req, res) => {
    const role = req.headers['role']
    if (role !== 'ADMIN') {
        return res.status(403).json({ error: true, message: 'permition denied' })
    }
    const id = Number(req.params.id)

    const deletedUser = await UsersService.deleteUserById({ id })
    if (!deletedUser) {
       return res.status(404).json({ error: true, message: "User not found" })
    }

    res.json(deletedUser[0])
}


exports.updateUserById = async (req, res) => {
    const id = Number(req.params.id)

    const updatedUser = await UsersService.updateUserById({id})
    if(!updatedUser){
        return res.status(404).json({ error: true, message: "User not found" })
    }

    res.json(users[index])
}

