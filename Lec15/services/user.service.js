const { readFile, writeFile } = require("../utils")


exports.getAllUsers = async (query) => {
    const users = await readFile('users.json', true)
   
    return users
}

exports.createUser = async ({ name, age, hobbies }) => {
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
}

exports.getUserById = async ({ id }) => {
    const users = await readFile('users.json', true)
    const user = users.find(u => u.id === id)

    return user
}

exports.deleteUserById = async ({ id }) => {
    const users = await readFile('users.json', true)
    const index = users.findIndex(u => u.id === id)

    if (index === -1) {
        return null
    }

    const deletedUser = users.splice(index, 1)
    await writeFile('users.json', users)
    return deletedUser
}

exports.updateUserById = async ({id}) => {
    const users = await readFile('users.json', true)
    const index = users.findIndex(u => u.id === id)

    if (index === -1) {
        return null
    }

    const updateReq = {}

    if(req.body.name){
        updateReq.name = req.body.name
    }

    if(req.body.age){
        updateReq.age = req.body.age
    }

    if(req.body.hobbies){
        users[index].hobbies.push(...req.body.hobbies)
    }

    users[index] = {
        ...users[index],
        ...updateReq
    }
    await writeFile('users.json', users)

    return users[index]
}