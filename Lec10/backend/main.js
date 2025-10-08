const express = require('express')
const connectDB = require('./config/connectDB')
const app = express()
const productModel = require('./schemas/product.schema')
const { isValidObjectId } = require('mongoose')
const cors = require('cors')

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('hello world 123')
})

app.get('/products', async (req, res) => {
    const products = await productModel.find()
    res.json(products)
})

app.post('/products', async (req, res) => {
    if (!req.body) {
        res.status(400).json({ success: false, error: "body is required" })
        return
    }
    const { name, price, desc, brand, isAvailable } = req.body

    if (!name || !price || !desc || !brand || !typeof isAvailable === 'boolean') {
        res.status(400).json({ success: false, error: 'name, price, desc, brand and isAvailbae is requried' })
        return
    }

    const newProduct = await productModel.create({ name, price, desc, brand, isAvailable })
    res.status(201).json({ success: true, result: newProduct })
})

app.get('/products/:id', async (req, res) => {
    const { id } = req.params
    if (!isValidObjectId(id)) {
        res.status(400).json({ success: false, error: "invalid id provided" })
        return
    }
    const product = await productModel.findById(id)
    if (!product) {
        res.status(404).json({ success: false, error: "Product not found" })
        return
    }

    res.json(product)
})

app.delete('/products/:id', async (req, res) => {
    const { id } = req.params
    if (!isValidObjectId(id)) {
        res.status(400).json({ success: false, error: "invalid id provided" })
        return
    }

    const deletedProduct = await productModel.findByIdAndDelete(id)

    if (!deletedProduct) {
        res.status(404).json({ success: false, error: "Product not found" })
        return
    }

    res.json({ success: true, result: deletedProduct })
})


app.put('/products/:id', async (req, res) => {
    const { id } = req.params
    if (!isValidObjectId(id)) {
        res.status(400).json({ success: false, error: "invalid id provided" })
        return
    }

    const updatedProduct = await productModel.findByIdAndUpdate(id, req.body, { new: true })
    if (!updatedProduct) {
        res.status(404).json({ success: false, error: "Product not found" })
        return
    }

    res.json({ success: true, result: updatedProduct })
})

connectDB().then(res => {
    app.listen(3001, () => {
        console.log('server running on http://localhost:3001')
    })
})
