const { default: mongoose, Schema } = require("mongoose");


const postSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        require: true
    }
})

module.exports = mongoose.model('post', postSchema)