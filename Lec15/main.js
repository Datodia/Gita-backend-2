
const express = require('express')
const { readFile, writeFile } = require('./utils')
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.json({ "message": "hello world" })
})

app.get('/chess', (req, res) => {
    console.log(req.headers, "headers")
    res.redirect('https://chess.com')
})

app.get('/secret', (req, res) => {
    const secret = req.headers['secret']
    if(secret === '123'){
        return res.json({info: "secret"})
    }
    res.json({info: "random"})
})


app.get('/users', async (req, res) => {
    console.log(req.query, "query")
    console.log(req.ip, "ip")
    const users = await readFile('users.json', true)
    res.json(users)
})

app.post('/users', async (req, res) => {
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
})

app.get('/users/:id', async (req, res) => {
    const id = Number(req.params.id)
    const users = await readFile('users.json', true)
    const user = users.find(u => u.id === id)

    if (!user) {
        res.status(404).json({ error: true, message: "user not found" })
        return
    }

    res.json(user)
})

app.delete('/users/:id', async (req, res) => {
    const role = req.headers['role']
    if(role !== 'ADMIN'){
        return res.status(403).json({error:true, message:'permition denied'})
    }

    const id = Number(req.params.id)

    const users = await readFile('users.json', true)
    const index = users.findIndex(u => u.id === id)

    if (index === -1) {
        res.status(404).json({ error: true, message: "User not found" })
        return
    }

    const deletedUser = users.splice(index, 1)
    await writeFile('users.json', users)

    res.json(deletedUser[0])
})

app.patch('/users/:id', async (req, res) => {
    const id = Number(req.params.id)

    const users = await readFile('users.json', true)
    const index = users.findIndex(u => u.id === id)

    if (index === -1) {
        res.status(404).json({ error: true, message: "User not found" })
        return
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
    
    res.json(users[index])
})

app.listen(3000, () => {
    console.log('server running on http://localhost:3000')
})

