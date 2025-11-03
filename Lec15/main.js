
const express = require('express')
const userRouter = require('./router/user.router')
const userRouter2 = require('./users/user.controller')
const { logger } = require('./middlewares/logger.middleware')
const isAdminMiddleware = require('./middlewares/isAdmin.middleware')
const roleMiddleware = require('./middlewares/role.middleware')
const connectToDB = require('./config/db.config')
const app = express()


app.use(express.json())

app.use(logger)

app.get('/', (req, res) => {
    res.send('home')
})

app.get('/products', roleMiddleware(['admin', 'editor', 'viewer']), (req, res) => {
    res.send('getAllproductts')
})

app.post('/products', roleMiddleware(['admin', 'editor']), (req, res) => {
    res.send('create products')
})

app.patch('/products/:id', roleMiddleware(['admin', 'editor']), (req, res) => {
    res.send('update products')
})

app.delete('/products/:id', roleMiddleware(['admin']), (req, res) => {
    res.send('delete products')
})

//Layer Based
// app.use('/users', userRouter)

//Feature Based
app.use('/users', userRouter2)



connectToDB().then(() => {
    app.listen(3000, () => {
        console.log('server running on http://localhost:3000')
    })
})

