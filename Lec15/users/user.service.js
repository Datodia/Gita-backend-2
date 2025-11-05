const userModel = require("./user.model")

exports.getAllUsers2 = async (req, res) => {
    const queryParams = req.query || {}
    const filter = {}

    if ('isSmoker' in queryParams) {
        filter['isSmoker'] = Number(queryParams.isSmoker) ? true : false
    }

    if ('email' in queryParams) {
        filter['email'] = {
            '$regex': `^${queryParams.email}`
        }
    }

    if ('ageFrom' in queryParams) {
        filter['age'] = {
            ...filter['age'],
            '$gte': Number(queryParams.ageFrom)
        }
    }

    if ('ageTo' in queryParams) {
        filter['age'] = {
            ...filter['age'],
            '$lte': Number(queryParams.ageTo)
        }
    }

    const users = await userModel.find(filter).populate('posts', 'title content')
    res.json(users)
}


exports.createUser2 = async (req, res) => {
    if (!req.body) {
        res.status(400).json({ error: true, message: "body is required" })
        return
    }
    const { name, age, email, isSmoker } = req.body
    if (!name || !email) {
        res.status(400).json({ error: true, message: "name and email is required" })
        return
    }

    const existUser = await userModel.findOne({ email })
    if (existUser) {
        return res.status(400).json({ error: true, message: "user already exists" })
    }
    const newUser = await userModel.create({
        name,
        age,
        isSmoker,
        email,
    })

    res.status(201).json({ success: true, data: newUser })
}


exports.getUserById2 = async (req, res) => {
    const id = req.params.id
    const user = await userModel.findById(id)
    if (!user) {
        return res.status(404).json({ message: "user not found" })
    }
    res.json(user)
}

exports.deleteUserById2 = async (req, res) => {
    const id = req.params.id
    const deletedUser = await userModel.findByIdAndDelete(id)
    if (!deletedUser) {
        return res.status(404).json({ message: "user not found" })
    }
    res.json(deletedUser)
}

exports.updateUserById2 = async (req, res) => {
    const id = req.params.id
    const updateReq = {
        name: req.body.name,
        email: req.body.email
    }
    const updatedUser = await userModel.findByIdAndUpdate(id, updateReq, { new: true })
    if (!updatedUser) {
        return res.status(404).json({ message: "user not found" })
    }
    res.json(updatedUser)
}