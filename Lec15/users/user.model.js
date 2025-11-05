const { default: mongoose, Schema } = require("mongoose");


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: false
    },
    isSmoker: {
        type: Boolean,
        default: false
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        require: true
    },
    password: {
        type: String,
        require: true,
        select: false
    },
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'post',
            default: []
        }
    ]
}, { timestamps: true })

module.exports = mongoose.model('user', userSchema)