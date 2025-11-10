const express = require('express');
const { param } = require('../Lec15/router/user.router');
const app = express()

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));

const users = [
    {
        id: 1,
        name: "giorgi",
        age: 22
    },
    {
        id: 2,
        name: "nika",
        age: 23
    },
    {
        id: 3,
        name: "Kaxa",
        age: 25
    },
]

app.get('/', (req, res) => {
    res.render('pages/home.ejs', {users})
})

app.get('/create', (req, res) => {
    res.render('pages/create.ejs')
})

app.get('/users/:id', (req, res) => {
    const id = Number(req.params.id)
    const user = users.find(u => u.id === id)
    res.render('pages/details.ejs', {user})
})

app.get('/users/:id/details', (req, res) => {
    const id = Number(req.params.id)
    const user = users.find(u => u.id === id)
    res.render('pages/update.ejs', {user})
})



app.get('/api/users', (req, res) => {
    res.json(users)
})

app.post('/api/users', (req, res) => {
    const {name, age} = req.body
    const lastId = users[users.length - 1]?.id || 0
    const newUser = {
        id: lastId +1,
        name,
        age
    }
    users.push(newUser)

    res.redirect('/')
})

app.get('/api/users/:id/delete', (req, res) => {
    const id = Number(req.params.id)
    const index = users.findIndex(u => u.id === id)
    users.splice(index, 1)

    res.redirect('/')
})

app.post('/api/users/:id/update', (req, res) => {
    const id = Number(req.params.id)
    const index = users.findIndex(u => u.id === id)
    const {name, age} = req.body
    const updateReq = {}
    if(name) updateReq['name'] = name
    if(age) updateReq['age'] = age

    users[index] = {
        ...users[index],
        ...updateReq
    }

    res.redirect('/')
})

app.listen(3000, () => {
    console.log('server running on http://localhost:3000')
})