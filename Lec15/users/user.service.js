const { readFile } = require("../utils")

exports.getAllUsers2 = async (req, res) => {
    const query = req.qeuery
    const users = await readFile('users.json', true)
    res.json(users)
}


exports.createUser2 = async (req, res) => {
    if (!req.body) {
        res.status(400).json({ error: true, message: "body is required" })
        return
    }
    const { name, age, hobbies } = req.body
    if (!name || !age) {
        res.status(400).json({ error: true, message: "name and age is required" })
        return
    }

    const users = await readFile('users.json', true)
    const lastId = users[users.length - 1]?.id || 0

    const newUser = {
        id: lastId + 1,
        name,
        age,
        hobbies: hobbies || []
    }
    users.push(newUser)

    await writeFile('users.json', users)
    res.status(201).json({ success: true, message: "user created successfully" })
}


exports.getUserById2 = async (req, res) => {
    const id = Number(req.params.id)
    const users = await readFile('users.json', true)
    const user = users.find(u => u.id === id)

    if (!user) {
        res.status(404).json({ error: true, message: "user not found" })
        return
    }

    res.json(user)
}